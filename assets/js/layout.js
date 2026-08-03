/**
 * Bootstraps layout partials and app scripts.
 * Must work even when fetch fails (e.g. file://) so content still appears.
 */
(function () {
  async function loadPartials() {
    const headerPh = document.getElementById('header-placeholder')
    const footerPh = document.getElementById('footer-placeholder')
    if (!headerPh && !footerPh) return

    try {
      if (window.location.protocol === 'file:') {
        throw new Error('Use a local server (not file://) for full navigation.')
      }
      const [h, f] = await Promise.all([
        fetch('assets/partials/header.html').then((r) => {
          if (!r.ok) throw new Error('header')
          return r.text()
        }),
        fetch('assets/partials/footer.html').then((r) => {
          if (!r.ok) throw new Error('footer')
          return r.text()
        }),
      ])
      if (headerPh) headerPh.outerHTML = h
      if (footerPh) footerPh.outerHTML = f
      const mn = document.getElementById('mobile-nav')
      if (mn) mn.removeAttribute('hidden')
    } catch {
      if (headerPh) {
        headerPh.innerHTML =
          '<header class="site-header is-solid" id="site-header"><div class="container site-header__inner"><a href="index.html" class="site-logo"><span class="site-logo__carbon">CARBON</span><span class="site-logo__nxt">NXT</span></a></div></header>'
      }
    }
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve()
        return
      }
      const s = document.createElement('script')
      s.src = src
      s.defer = true
      s.onload = () => resolve()
      s.onerror = () => reject(new Error(src))
      document.body.appendChild(s)
    })
  }

  function dismissLoader() {
    const loader = document.getElementById('page-loader')
    if (loader) {
      loader.classList.add('is-hidden')
      setTimeout(() => loader.remove(), 600)
    }
    document.body.classList.add('page-transition', 'is-ready')
  }

  function pageExtras() {
    const page = (window.location.pathname.split('/').pop() || 'index.html').split('?')[0]
    const map = {
      'index.html': ['assets/js/animations.js', 'assets/js/hero-video.js'],
      'marketplace.html': ['assets/js/marketplace-data.js', 'assets/js/marketplace.js'],
      'project-detail.html': ['assets/js/marketplace-data.js', 'assets/js/marketplace.js', 'assets/js/project-detail.js'],
      'insights.html': ['assets/js/insights-data.js', 'assets/js/insights.js'],
      'insight-detail.html': ['assets/js/insights-data.js', 'assets/js/insight-detail.js'],
      'faq.html': ['assets/js/faq.js'],
      'login.html': ['assets/js/auth-ui.js'],
      'register.html': ['assets/js/auth-ui.js'],
    }
    return map[page] || []
  }

  async function boot() {
    setTimeout(dismissLoader, 3000)

    await loadPartials()

    for (const src of pageExtras()) {
      try {
        await loadScript(src)
      } catch {
        /* optional page scripts */
      }
    }

    try {
      await loadScript('assets/js/main.js')
    } catch {
      dismissLoader()
      document.documentElement.classList.add('js')
      Utils.$$('[data-reveal]').forEach((el) => el.classList.add('is-visible'))
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot)
  } else {
    boot()
  }
})()
