-- Enum для ролей
create type public.app_role as enum ('admin', 'moderator', 'user');

-- Enum для приоритета университета
create type public.university_priority as enum ('reach', 'target', 'safety');

-- Enum для статуса консультации
create type public.consultation_status as enum ('new', 'scheduled', 'completed', 'cancelled');

-- Enum для статуса этапа прогресса
create type public.progress_status as enum ('not_started', 'in_progress', 'completed');

-- ============ profiles ============
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  current_grade text,
  graduation_year integer,
  gpa numeric(3,2),
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  to authenticated
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  to authenticated
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id);

-- ============ user_roles ============
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

create policy "Users can view own roles"
  on public.user_roles for select
  to authenticated
  using (auth.uid() = user_id);

-- ============ target_universities ============
create table public.target_universities (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  university_name text not null,
  priority university_priority not null default 'target',
  notes text,
  created_at timestamptz not null default now()
);

alter table public.target_universities enable row level security;

create policy "Users manage own universities select"
  on public.target_universities for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users manage own universities insert"
  on public.target_universities for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users manage own universities update"
  on public.target_universities for update
  to authenticated
  using (auth.uid() = user_id);

create policy "Users manage own universities delete"
  on public.target_universities for delete
  to authenticated
  using (auth.uid() = user_id);

-- ============ quiz_results ============
create table public.quiz_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  quiz_type text not null,
  score numeric,
  answers jsonb,
  recommended_track text,
  created_at timestamptz not null default now()
);

alter table public.quiz_results enable row level security;

create policy "Users view own quiz results"
  on public.quiz_results for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users insert own quiz results"
  on public.quiz_results for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users delete own quiz results"
  on public.quiz_results for delete
  to authenticated
  using (auth.uid() = user_id);

-- ============ consultation_requests ============
create table public.consultation_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  requested_at timestamptz not null default now(),
  scheduled_at timestamptz,
  status consultation_status not null default 'new',
  notes text,
  created_at timestamptz not null default now()
);

alter table public.consultation_requests enable row level security;

create policy "Users view own consultations"
  on public.consultation_requests for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users insert own consultations"
  on public.consultation_requests for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users update own consultations"
  on public.consultation_requests for update
  to authenticated
  using (auth.uid() = user_id);

create policy "Users delete own consultations"
  on public.consultation_requests for delete
  to authenticated
  using (auth.uid() = user_id);

-- ============ progress_steps ============
create table public.progress_steps (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  step_key text not null,
  status progress_status not null default 'not_started',
  completed_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, step_key)
);

alter table public.progress_steps enable row level security;

create policy "Users view own progress"
  on public.progress_steps for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users insert own progress"
  on public.progress_steps for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users update own progress"
  on public.progress_steps for update
  to authenticated
  using (auth.uid() = user_id);

create policy "Users delete own progress"
  on public.progress_steps for delete
  to authenticated
  using (auth.uid() = user_id);

-- ============ updated_at trigger ============
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

create trigger progress_steps_set_updated_at
  before update on public.progress_steps
  for each row execute function public.set_updated_at();

-- ============ auto-create profile on signup ============
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''));
  insert into public.user_roles (user_id, role)
  values (new.id, 'user');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();