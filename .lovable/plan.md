# Обновление страницы /resources реальным контентом блога 4Schoolers

Заменим placeholder-карточки реальными статьями из блога https://4schoolers.com/blog/, с настоящими ссылками, обложками и описаниями.

## Реальные статьи из блога (7 шт.)

| # | Категория | Заголовок | URL | Обложка |
|---|-----------|-----------|-----|---------|
| 1 | EMOTIONAL INTELLIGENCE | Emotional Intelligence: why do we care so much about it | `/2024/07/emotional-intelligence-why-do-we-care-so-much-about-it/` | istockphoto-1319802389 |
| 2 | PEDAGOGY | Why Must Students Learn So Much | `/2024/06/why-must-students-learn-so-much/` | Image_20240618142326 |
| 3 | UNIVERSITIES | Why You Should Apply to Columbia University | `/2024/06/why-you-should-apply-to-columbia-university/` | gs-student-leadership-awards-2024 |
| 4 | STUDENT STORIES | 4Schoolers Student Interviews Nobel Prize Winning Physicist Sheldon Glashow | `/2024/04/sheldon-glashow/` | (нет обложки в фиде) |
| 5 | STRATEGY | Picking a High School for College Admissions Success | `/2024/03/picking-a-high-school-for-college-admissions-success/` | (нет обложки в фиде) |
| 6 | EARLY PREP | Why Middle Schoolers Should Work with a College Counselor | `/2024/03/why-middle-schoolers-should-work-with-a-college-counselor/` | qtq80-OEUDrQ |
| 7 | UNIVERSITIES | Why You Should Apply to MIT | `/2024/02/applying-to-mit/` | (нет обложки в фиде) |

## Что меняем в `src/routes/resources.tsx`

1. **Расширить тип `articles`** — добавить поля `description`, `href` (внешняя ссылка на 4schoolers.com), `image` (URL обложки или `null`), `date`. Сохранить `tag`, `title`, `time`.

2. **Вписать реальные данные** — для каждой статьи:
   - Описание — 1–2 предложения из реального intro-текста статьи (из RSS-фида блога), переведённые в редакторский тон.
   - Время чтения — оценка по длине превью (6–15 min).
   - Дата публикации — отображаем мелким шрифтом рядом с временем чтения.

3. **Карточки → внешние ссылки.** Заменить `<Link to="/resources">` на `<a href={article.href} target="_blank" rel="noopener noreferrer">` — статьи живут на основном сайте, а не внутри приложения. Иконку `ArrowUpRight` оставляем (теперь она семантически верна — внешний переход).

4. **Обложки.** Если у статьи есть `image` — рендерим `<img>` с `loading="lazy"` и `object-cover` в той же `aspect-[4/3]` рамке. Если нет — оставляем градиентный fallback (текущий gradient-block).

5. **Подзаголовок страницы** — обновить с *"Free guides written by our senior consultants…"* на:
   *"Field notes and essays from our senior consultants — on character, craft, and the long arc of preparation."*

6. **Meta-теги в `head()`** — обновить description под актуальный список тем:
   *"Essays on emotional intelligence, school choice, Ivy League admissions, and the pedagogy behind 4Schoolers' approach."*

7. **Сохраняем без изменений**: grid-раскладку (1/2/3 колонки), `FadeIn` анимации, gold hover, `Eyebrow` "Resources", H1 "Insights from inside the admissions office.", шрифты и spacing.

## Технические детали

- Обложки тянем напрямую с `https://4schoolers.com/wp-content/uploads/...` — это публичные URL WordPress media library. Указываем полные размеры (не `-320x213` thumbnail), браузер сам отмасштабирует.
- `target="_blank"` + `rel="noopener noreferrer"` обязательно (security + perf).
- `aria-label` на каждой карточке: `"Read article: {title} on 4schoolers.com"` для скринридеров.
- Тип articles становится: `{ tag: string; title: string; description: string; time: string; date: string; href: string; image: string | null }`.
- Описание ограничиваем `line-clamp-3` (Tailwind plugin уже включён через shadcn config) для визуального выравнивания карточек разной длины.

## Что НЕ делаем

- Не меняем дизайн/цвета/типографику.
- Не создаём внутренние страницы статей (`/resources/$slug`) — все ссылки наружу.
- Не трогаем другие компоненты страницы или header/footer.
