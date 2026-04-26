## Заменить emoji-флаги на изображения с flagcdn.com

В `src/components/countries-strip.tsx` заменить массив emoji на массив объектов `{ code, name }` (ISO 3166-1 alpha-2) и рендерить `<img>` из flagcdn.com вместо `<span>` с emoji. Анимация marquee, размеры контейнера и подзаголовок остаются без изменений.

### Изменения в `src/components/countries-strip.tsx`

- Массив стран:
  ```ts
  const countries = [
    { code: "kz", name: "Kazakhstan" }, { code: "kr", name: "South Korea" },
    { code: "jp", name: "Japan" },      { code: "cn", name: "China" },
    { code: "de", name: "Germany" },    { code: "ch", name: "Switzerland" },
    { code: "gb", name: "United Kingdom" }, { code: "ca", name: "Canada" },
    { code: "in", name: "India" },      { code: "pk", name: "Pakistan" },
    { code: "ua", name: "Ukraine" },    { code: "by", name: "Belarus" },
    { code: "dk", name: "Denmark" },    { code: "mx", name: "Mexico" },
    { code: "co", name: "Colombia" },   { code: "br", name: "Brazil" },
    { code: "il", name: "Israel" },     { code: "kw", name: "Kuwait" },
    { code: "uz", name: "Uzbekistan" }, { code: "ph", name: "Philippines" },
    { code: "at", name: "Austria" },    { code: "az", name: "Azerbaijan" },
    { code: "ru", name: "Russia" },     { code: "la", name: "Laos" },
  ];
  ```

- Рендер каждого флага (вместо `<span>`):
  ```tsx
  <img
    src={`https://flagcdn.com/w160/${c.code}.png`}
    srcSet={`https://flagcdn.com/w160/${c.code}.png 1x,
             https://flagcdn.com/w320/${c.code}.png 2x`}
    width={60} height={40}
    alt={c.name}
    loading="lazy" decoding="async" draggable={false}
    className="h-10 w-[60px] shrink-0 select-none object-cover"
  />
  ```

- Сохраняется: дублирование массива (`[...countries, ...countries]`) для бесшовной петли, `gap-8`, fade-маска по краям, подпись "24+ countries. One mission: your child's success.", класс `animate-flag-marquee`.

### Технические детали

- **flagcdn.com** — бесплатный CDN, без ключей, поддерживает все 24 кода. Используем `w160` для 1x и `w320` для 2x (Retina).
- Размер 60×40px (соотношение 3:2, стандарт большинства флагов). `object-cover` корректно обрежет нестандартные пропорции (Швейцария 1:1, Непал и т.п. — в нашем списке только Швейцария 1:1, обрезка минимальна).
- `loading="lazy"` + `decoding="async"` — не блокируют LCP.
- Никаких рамок/боксов, прозрачный фон, мобильная адаптивность сохранена.
- CSS-анимация в `src/styles.css` (`@keyframes flag-marquee`) уже есть — менять её не нужно.
