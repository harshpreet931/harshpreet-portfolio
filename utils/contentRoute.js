// Pages people read rather than look at. The background dims on these so the
// text stays legible; the home page keeps the full mesh.
export function isContentRoute(pathname) {
  return pathname === '/work' || pathname === '/blog' || pathname.startsWith('/blog/');
}
