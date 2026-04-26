## Объединить «Sign in / Sign up» в одну кнопку «Account» с выпадающим меню

В `src/components/site-header.tsx` заменить две отдельные кнопки на одну кнопку **Account** (с иконкой пользователя), которая открывает dropdown. Содержимое меню зависит от состояния авторизации.

### Поведение

**Не залогинен** — клик по «Account» открывает dropdown:
- `Sign in` → `/login`
- `Sign up` → `/signup` (выделен золотым акцентом)

**Залогинен** — та же кнопка «Account» (с email пользователя как подзаголовком в меню), dropdown содержит:
- `Dashboard` → `/dashboard`
- `Profile` → `/dashboard/profile`
- разделитель
- `Sign out` (вызывает `auth.signOut()`)

### Технические детали

- Используем существующий компонент `@/components/ui/dropdown-menu` (shadcn) — `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuLabel`, `DropdownMenuSeparator`.
- Триггер — `<Button variant="outline" size="sm">` с иконкой `User` из lucide-react и текстом «Account» + `ChevronDown`.
- Импорты: добавить `User` в lucide-react импорт, добавить импорт `DropdownMenu*`. Удалить теперь неиспользуемые импорты, если есть.
- На мобильной версии (бургер-меню) — оставляем текущую раскладку секций, но тоже сворачиваем под одну группу «Account» с теми же пунктами (collapsible, по аналогии с «Services»). Состояние раскрытия — новый `accountOpen` useState.
- `auth.user?.email` показываем как `DropdownMenuLabel` сверху меню, когда пользователь залогинен — даёт визуальное подтверждение, в какой аккаунт вошёл.
- Стили dropdown content: `align="end"`, `w-56`, чтобы выпадал ровно под кнопку справа.

### Файлы

- `src/components/site-header.tsx` — единственное изменение.
