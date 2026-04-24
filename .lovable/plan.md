

# Личный кабинет студента (Вариант B) — Email + Password

## Что получит пользователь

**Авторизация (email + пароль):**
- Регистрация с подтверждением email
- Вход по email/паролю
- Восстановление пароля ("Забыли пароль?")
- Выход из аккаунта
- Кнопка "Войти / Кабинет" в шапке (десктоп + мобильное меню)

**Кабинет студента (`/dashboard`):**
- Главная панель с приветствием и сводкой прогресса
- Профиль: имя, email, телефон, текущий класс, год выпуска, средний балл
- Целевые университеты: добавить/удалить из списка мечты
- История квизов: результаты пройденных тестов на лендинге
- Заявки на стратегические сессии: список со статусами (новая / запланирована / завершена)
- Прогресс подготовки: timeline по этапам (тесты, эссе, рекомендации, подача)

## Структура страниц

```text
/login                    — вход
/signup                   — регистрация
/forgot-password          — запрос ссылки на сброс
/reset-password           — установка нового пароля (по ссылке из письма)

/dashboard                — главная кабинета (сводка)
/dashboard/profile        — профиль студента
/dashboard/universities   — целевые университеты
/dashboard/quizzes        — история квизов
/dashboard/sessions       — заявки на стратегические сессии
/dashboard/progress       — прогресс подготовки
```

Все маршруты `/dashboard/*` защищены layout-роутом `_authenticated.tsx` через `beforeLoad` + `redirect` на `/login` (с возвратом на исходный URL после входа).

## Backend (Lovable Cloud)

**Включить Lovable Cloud** (Supabase Auth + Postgres).

**Auth настройки:**
- Email + Password провайдер
- Email confirmations включены
- Auto-redirect URLs: `/dashboard`, `/reset-password`
- Password HIBP check включён (защита от утёкших паролей)

**Таблицы (все с RLS — пользователь видит только свои строки):**

1. `profiles` — id (FK auth.users), full_name, phone, current_grade, graduation_year, gpa, avatar_url, created_at, updated_at. Триггер автосоздания при регистрации.
2. `target_universities` — id, user_id, university_name, priority (reach/target/safety), notes, created_at.
3. `quiz_results` — id, user_id, quiz_type, score, answers (jsonb), recommended_track, created_at.
4. `consultation_requests` — id, user_id, requested_at, scheduled_at, status (new/scheduled/completed/cancelled), notes.
5. `progress_steps` — id, user_id, step_key (testing/essays/recommendations/applications/...), status (not_started/in_progress/completed), completed_at, notes.

Роли — отдельная таблица `user_roles` + enum `app_role` + security-definer функция `has_role()` (на будущее, для админ-панели; в этой итерации не используется в UI).

## Frontend изменения

**Новые файлы:**
- `src/integrations/supabase/client.ts` — авто-генерируется при включении Cloud
- `src/hooks/use-auth.tsx` — хук + AuthProvider с `onAuthStateChange`
- `src/routes/login.tsx`, `signup.tsx`, `forgot-password.tsx`, `reset-password.tsx`
- `src/routes/_authenticated.tsx` — layout-guard
- `src/routes/_authenticated/dashboard.tsx` — layout кабинета (сайдбар + Outlet)
- `src/routes/_authenticated/dashboard.index.tsx` — сводка
- `src/routes/_authenticated/dashboard.profile.tsx`
- `src/routes/_authenticated/dashboard.universities.tsx`
- `src/routes/_authenticated/dashboard.quizzes.tsx`
- `src/routes/_authenticated/dashboard.sessions.tsx`
- `src/routes/_authenticated/dashboard.progress.tsx`
- `src/components/dashboard-sidebar.tsx`

**Изменяемые файлы:**
- `src/router.tsx` — добавить `context: { auth: undefined! }` через `createRootRouteWithContext`
- `src/routes/__root.tsx` — обернуть в `AuthProvider`, прокинуть auth в контекст роутера
- `src/components/site-header.tsx` — для гостей "Войти" + "Регистрация", для авторизованных "Кабинет" + "Выйти"
- `src/components/mobile-sticky-cta.tsx` — скрывать на `/dashboard/*` маршрутах

## Технические детали

- Все формы валидируются через `zod` + `react-hook-form` (длины, email-формат, минимум 8 символов на пароль).
- `signUp({ options: { emailRedirectTo: window.location.origin + '/dashboard' } })` — после клика на письмо пользователь попадает в кабинет.
- `resetPasswordForEmail(email, { redirectTo: window.location.origin + '/reset-password' })` — `/reset-password` публичный, читает `type=recovery` из hash и вызывает `updateUser({ password })`.
- `onAuthStateChange` подписка ставится ДО `getSession()` — иначе теряются события.
- Все запросы к таблицам идут через клиентский Supabase — RLS гарантирует изоляцию по `user_id = auth.uid()`.
- Стилистика — те же shadcn/ui компоненты (Card, Button, Input, Tabs, Badge), та же цветовая схема (gold accent, primary).
- Сайдбар кабинета — компонент `Sidebar` из shadcn, с навигацией по разделам.

