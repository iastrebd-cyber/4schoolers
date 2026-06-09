-- ============================================================
-- Dual-sided accounts: Student/Parent + Provider portal
-- Additive migration. Does NOT modify the original schema migration.
-- ============================================================

-- Enum для типа аккаунта (студент/родитель vs провайдер/тьютор)
create type public.account_type as enum ('student', 'provider');

-- Enum для статуса обращения студента к провайдеру
create type public.inquiry_status as enum ('new', 'read', 'replied', 'closed');

-- ============ profiles: тип аккаунта ============
-- NOT NULL с default — безопасно для существующих строк
alter table public.profiles
  add column account_type public.account_type not null default 'student';

-- ============ provider_profiles (1:1 с auth.users) ============
create table public.provider_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  headline text,
  bio text,
  specialties text[] not null default '{}',
  hourly_rate numeric(8,2),
  currency text not null default 'USD',
  location text,
  years_experience integer,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.provider_profiles enable row level security;

-- Публичный просмотр опубликованных провайдеров (каталог)
create policy "Public can view published providers"
  on public.provider_profiles for select
  to anon, authenticated
  using (is_published = true);

-- Владелец всегда видит свою анкету (даже если не опубликована)
create policy "Provider can view own profile"
  on public.provider_profiles for select
  to authenticated
  using (auth.uid() = id);

create policy "Provider can insert own profile"
  on public.provider_profiles for insert
  to authenticated
  with check (auth.uid() = id);

create policy "Provider can update own profile"
  on public.provider_profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- ============ provider_services ============
create table public.provider_services (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  price numeric(8,2),
  duration_minutes integer,
  created_at timestamptz not null default now()
);

alter table public.provider_services enable row level security;

create policy "Public can view services of published providers"
  on public.provider_services for select
  to anon, authenticated
  using (
    exists (
      select 1 from public.provider_profiles p
      where p.id = provider_id and p.is_published = true
    )
  );

create policy "Provider can view own services"
  on public.provider_services for select
  to authenticated
  using (auth.uid() = provider_id);

create policy "Provider can insert own services"
  on public.provider_services for insert
  to authenticated
  with check (auth.uid() = provider_id);

create policy "Provider can update own services"
  on public.provider_services for update
  to authenticated
  using (auth.uid() = provider_id)
  with check (auth.uid() = provider_id);

create policy "Provider can delete own services"
  on public.provider_services for delete
  to authenticated
  using (auth.uid() = provider_id);

-- ============ provider_availability (еженедельные слоты) ============
create table public.provider_availability (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references auth.users(id) on delete cascade,
  day_of_week smallint not null check (day_of_week between 0 and 6),
  start_time time not null,
  end_time time not null,
  created_at timestamptz not null default now(),
  check (end_time > start_time)
);

alter table public.provider_availability enable row level security;

create policy "Public can view availability of published providers"
  on public.provider_availability for select
  to anon, authenticated
  using (
    exists (
      select 1 from public.provider_profiles p
      where p.id = provider_id and p.is_published = true
    )
  );

create policy "Provider can view own availability"
  on public.provider_availability for select
  to authenticated
  using (auth.uid() = provider_id);

create policy "Provider can insert own availability"
  on public.provider_availability for insert
  to authenticated
  with check (auth.uid() = provider_id);

create policy "Provider can update own availability"
  on public.provider_availability for update
  to authenticated
  using (auth.uid() = provider_id)
  with check (auth.uid() = provider_id);

create policy "Provider can delete own availability"
  on public.provider_availability for delete
  to authenticated
  using (auth.uid() = provider_id);

-- ============ inquiries (студент -> провайдер) ============
create table public.inquiries (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references auth.users(id) on delete cascade,
  provider_id uuid not null references auth.users(id) on delete cascade,
  -- denormalized so the provider can identify the sender
  -- (profiles RLS only exposes a user's own row)
  student_name text,
  student_email text,
  subject text,
  message text not null,
  status public.inquiry_status not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.inquiries enable row level security;

-- Видна обеим сторонам
create policy "Inquiry visible to student or provider"
  on public.inquiries for select
  to authenticated
  using (auth.uid() = student_id or auth.uid() = provider_id);

-- Создаёт только сам студент, и только к опубликованному провайдеру
create policy "Student can create inquiry"
  on public.inquiries for insert
  to authenticated
  with check (
    auth.uid() = student_id
    and exists (
      select 1 from public.provider_profiles p
      where p.id = provider_id and p.is_published = true
    )
  );

-- Провайдер обновляет статус полученных обращений
create policy "Provider can update received inquiry"
  on public.inquiries for update
  to authenticated
  using (auth.uid() = provider_id)
  with check (auth.uid() = provider_id);

-- Студент может обновлять/закрывать своё обращение
create policy "Student can update own inquiry"
  on public.inquiries for update
  to authenticated
  using (auth.uid() = student_id)
  with check (auth.uid() = student_id);

-- ============ updated_at триггеры (переиспользуем set_updated_at) ============
create trigger provider_profiles_set_updated_at
  before update on public.provider_profiles
  for each row execute function public.set_updated_at();

create trigger inquiries_set_updated_at
  before update on public.inquiries
  for each row execute function public.set_updated_at();

-- ============ обновлённый триггер создания аккаунта ============
-- Читает account_type из метаданных; для провайдера создаёт provider_profiles.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_account_type public.account_type;
begin
  v_account_type := coalesce(
    (new.raw_user_meta_data->>'account_type')::public.account_type,
    'student'
  );

  insert into public.profiles (id, full_name, account_type)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    v_account_type
  );

  insert into public.user_roles (user_id, role)
  values (new.id, 'user');

  if v_account_type = 'provider' then
    insert into public.provider_profiles (id, display_name, is_published)
    values (new.id, nullif(new.raw_user_meta_data->>'full_name', ''), true);
  end if;

  return new;
end;
$$;
