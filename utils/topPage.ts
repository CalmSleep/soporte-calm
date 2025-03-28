export function topPage() {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  window.scrollTo(0, 0);
  history.scrollRestoration = 'manual';
  window.addEventListener('popstate', scrollToTop);
  return () => {
    window.removeEventListener('popstate', scrollToTop);
  };
}
