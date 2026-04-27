## Goal
Make all migrated articles open correctly from the Resources page and the Kazakhstan flag link.

## What’s broken
The article detail route exists at `/resources/$slug`, but `src/routes/resources.tsx` is currently acting as the parent route for that path and does not render an `<Outlet />`.

In TanStack file routing, that means the child article route cannot render properly under `/resources/*`.

## Plan
1. Convert `src/routes/resources.tsx` into a layout route for the Resources section.
   - Keep the route path `/resources`
   - Replace the page-only component with a layout component that renders `<Outlet />`
   - Keep section-level SEO metadata only if it makes sense for the parent layout

2. Move the article listing page into a dedicated index route.
   - Create `src/routes/resources.index.tsx`
   - Move the current Resources grid UI there unchanged
   - Keep the existing article cards and internal `<Link to="/resources/$slug" params={{ slug }}>`

3. Keep `src/routes/resources.$slug.tsx` as the detail route.
   - Reuse the existing loader, article rendering, and related reading UI
   - Confirm it now renders as the child route under the Resources layout

4. Verify route behavior after the restructure.
   - `/resources` shows the article grid
   - `/resources/kazakhstan-camp` shows the full article page
   - Other article slugs open correctly from the grid and from the homepage Kazakhstan flag

5. Do a small cleanup pass if needed.
   - Ensure the Resources parent/layout is not accidentally duplicating page chrome
   - Confirm route metadata still resolves correctly for both the list page and detail pages

## Technical details
Recommended route structure:

```text
src/routes/
  resources.tsx         -> layout route with <Outlet />
  resources.index.tsx   -> /resources article listing
  resources.$slug.tsx   -> /resources/:slug article detail
```

Reason:
- `resources.$slug.tsx` is a child of `resources.tsx`
- Parent routes with child pages should render `<Outlet />`
- The listing page belongs in `resources.index.tsx`, not directly in the parent layout file

## Expected result
After this change, clicking any article card should open the corresponding internal article page instead of appearing to do nothing.