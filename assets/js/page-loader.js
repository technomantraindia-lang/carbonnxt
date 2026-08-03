function initPageLoader() {
  const loader = Utils.$('#page-loader')
  if (!loader) return

  const isHome = Utils.getPageName() === 'index.html'
  const shown = sessionStorage.getItem('cnxt_loader_shown')

  if (!isHome || shown || Utils.prefersReducedMotion()) {
    loader.remove()
    document.body.classList.add('page-transition', 'is-ready')
    return
  }

  const duration = 600
  setTimeout(() => {
    loader.classList.add('is-hidden')
    document.body.classList.add('page-transition', 'is-ready')
    sessionStorage.setItem('cnxt_loader_shown', '1')
    setTimeout(() => loader.remove(), 400)
  }, duration)
}
