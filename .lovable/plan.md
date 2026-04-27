## Цель

Перенести **все статьи** блога 4schoolers.com на наш сайт как **внутренние страницы** — со всем оригинальным текстом и фотографиями, скачанными в наш репозиторий. Никаких ссылок наружу.

## Почему сейчас "не хватает" статей

`https://4schoolers.com/blog/` показывает только 7 постов (6 на стр.1 + 1 на стр.2: MIT). Но на сайте есть ещё 3 поста, скрытых из общего листинга, но доступных по прямой ссылке:

- *An English Class in Cape Cod* (Aug 2024)
- *Success is palpable — Summer Camp Journal* (Jul 2024)
- *Students from Kazakhstan at 4Schoolers' Competition Camp* (Aug 2024)

Итого — **10 статей**, и все они станут внутренними страницами на нашем сайте.

## Что будет сделано

### 1. Скачать все изображения в репозиторий

В `src/assets/articles/<slug>/` для каждой статьи: `cover.jpg` + все inline-фото из тела поста. Скачивание `curl` с `4schoolers.com/wp-content/uploads/...`. После этого никакие изображения больше не запрашиваются с 4schoolers.com.

### 2. Содержимое каждой статьи (data-driven)

Создать `src/content/articles.ts` — массив объектов с полным текстом каждой статьи:

```ts
type Article = {
  slug: string;             // например "kazakhstan-camp"
  tag: string;              // "Student Stories", "Strategy", ...
  title: string;
  description: string;      // 1-2 предложения для карточки и og:description
  date: string;             // "August 2024"
  readTime: string;         // "5 min read"
  cover: string;            // импорт из src/assets/articles/<slug>/cover.jpg
  blocks: Block[];          // упорядоченные блоки контента
};

type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "img"; src: string; alt: string; caption?: string }
  | { type: "quote"; text: string; cite?: string };
```

Тексты переношу **дословно**, с сохранением абзацев и порядка фотографий, ровно как на 4schoolers.com.

10 slug'ов:
1. `emotional-intelligence`
2. `why-must-students-learn-so-much`
3. `why-apply-to-columbia`
4. `sheldon-glashow-interview`
5. `picking-a-high-school`
6. `why-middle-schoolers-need-counselor`
7. `why-apply-to-mit`
8. `english-class-cape-cod`
9. `summer-camp-journal`
10. `kazakhstan-camp`

### 3. Динамический маршрут статьи

Файл `src/routes/resources.$slug.tsx` (TanStack flat-routing) → URL `/resources/<slug>`.

- `loader` находит статью по slug в `articles.ts`. Если нет — `notFound()`.
- `head()` со своим title / description / og:image (используется `cover`) для каждой статьи. Это даёт корректные превью при шаринге в WhatsApp/Slack/iMessage.
- Компонент рендерит редакторский layout: Eyebrow (tag), serif H1, дата + read time, hero `cover.jpg`, затем `blocks.map()` с типами `p` / `h2` / `img` / `quote`. Стиль соответствует уже существующим страницам (`Section`, `FadeIn`, `Eyebrow`, `font-serif`, `text-muted-foreground`).
- В конце — мягкий блок "Related reading" с 2-3 другими статьями (внутренние `<Link>`) и CTA `<Link to="/contact">Talk to our team</Link>`.
- `errorComponent` и `notFoundComponent` обязательно (требование TanStack).

### 4. Обновить `/resources` (список)

`src/routes/resources.tsx`:

- Импортировать `articles` из `src/content/articles.ts`.
- Удалить старый локальный массив с внешними href.
- Карточки → `<Link to="/resources/$slug" params={{ slug: a.slug }}>` (внутренняя навигация, никаких `<a target="_blank">`, никаких `ArrowUpRight` со стрелкой "наружу" — заменю на обычную стрелку вправо).
- Cover берётся из локального `a.cover` — все картинки гарантированно работают.

### 5. Связать с остальным сайтом

- **`CountriesStrip`** на главной: флаг Казахстана становится `<Link to="/resources/$slug" params={{ slug: "kazakhstan-camp" }}>` с aria-label *"See our Kazakhstan cohort"*. Остальные флаги — без изменений.
- (Опционально, в этом же подходе) если на главной есть блок с превью статей — он тоже использует внутренние ссылки. Если такого блока нет, ничего лишнего не добавляю.

## Технические детали

- **Новые файлы:**
  - `src/assets/articles/<slug>/*.jpg` (~15-20 изображений суммарно)
  - `src/content/articles.ts` (~600-900 строк, в основном текст)
  - `src/routes/resources.$slug.tsx`
- **Изменяемые файлы:**
  - `src/routes/resources.tsx` — переключить на внутренние ссылки и общий источник данных
  - `src/components/countries-strip.tsx` — кликабельный флаг KZ
- **Не трогаем:** `src/integrations/supabase/*`, `routeTree.gen.ts` (генерится автоматически), Lovable Cloud / БД — статьи статичные, БД для них не нужна.
- **SEO:** каждая страница получает свой `<title>`, `<meta description>`, `og:title`, `og:description`, `og:image`. Это даёт 10 индексируемых страниц вместо одной.
- **Производительность:** изображения импортируются как Vite-ассеты → хешированные имена, кэш, lazy-load. На странице статьи — `loading="lazy"` для всех, кроме hero.

## Что НЕ делаем

- Не строим CMS / админку. Если позже захотите редактировать статьи без кода — это отдельная задача (Lovable Cloud + таблица `articles`).
- Не добавляем комментарии, лайки, social share-кнопки (на оригинале они есть, но в нашем редакторском тоне они лишние; могу добавить позже по просьбе).
- Не сохраняем оригинальный URL-формат `/2024/08/...` — у нас все статьи живут под `/resources/<slug>`, что лучше для SEO и понятнее структурно.

## Объём работы

Это довольно крупная единоразовая операция: ~10 статей × (текст + 1-3 фото + метаданные). После одобрения сделаю всё за один проход.
