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
        // Full offline fallback (e.g. file://) — mirrors assets/partials/header.html
        // so navigation still works without a local server.
        const NAV_LINKS = [
          ['index.html', 'Home'],
          ['about.html', 'About'],
          ['solutions.html', 'Solutions'],
          ['buyer.html', 'Buyer'],
          ['seller.html', 'Seller'],
          ['marketplace.html', 'Marketplace'],
          ['technology.html', 'Technology'],
          ['insights.html', 'Insights'],
          ['contact.html', 'Contact'],
        ]
        const desktopLinks = NAV_LINKS.map(
          ([href, label]) => `<li><a href="${href}" class="site-nav__link">${label}</a></li>`
        ).join('')
        const mobileLinks = NAV_LINKS.map(
          ([href, label]) => `<a href="${href}" class="mobile-nav__link">${label}</a>`
        ).join('')
        headerPh.innerHTML =
          '<header class="site-header is-solid" id="site-header">' +
            '<div class="container site-header__inner">' +
              '<a href="index.html" class="site-logo" aria-label="CarbonNxt Home">' +
                '<img src="logo.png" alt="CarbonNxt Logo" class="site-logo__img" style="height: 55px; width: auto; object-fit: contain; display: block;">' +
              '</a>' +
              '<nav class="site-nav" aria-label="Main navigation">' +
                `<ul class="site-nav__list">${desktopLinks}</ul>` +
                '<div class="site-nav__actions">' +
                  '<a href="contact.html" class="btn btn-primary">Inquiry</a>' +
                '</div>' +
              '</nav>' +
              '<button class="nav-toggle" id="nav-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav">' +
                '<span class="nav-toggle__bar"></span>' +
              '</button>' +
            '</div>' +
          '</header>' +
          '<nav class="mobile-nav" id="mobile-nav" aria-label="Mobile navigation">' +
            `${mobileLinks}` +
            '<div class="mobile-nav__actions">' +
              '<a href="contact.html" class="btn btn-primary">Inquiry</a>' +
            '</div>' +
          '</nav>'
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

  function populateConfigData() {
    if (typeof SITE_CONFIG === 'undefined') return

    // Populate text content
    document.querySelectorAll('[data-config-text]').forEach((el) => {
      const key = el.getAttribute('data-config-text')
      const val = SITE_CONFIG[key]
      if (val) el.textContent = val
    })

    // Populate href attributes
    document.querySelectorAll('[data-config-href]').forEach((el) => {
      const key = el.getAttribute('data-config-href')
      const type = el.getAttribute('data-config-type')
      let val = SITE_CONFIG[key]
      if (val) {
        if (type === 'mailto' && !val.startsWith('mailto:')) {
          val = `mailto:${val}`
        }
        el.setAttribute('href', val)
      }
    })
  }

  function pageExtras() {
    const page = (window.location.pathname.split('/').pop() || 'index.html').split('?')[0]
    const map = {
      'index.html': ['assets/js/animations.js', 'assets/js/hero-video.js'],
      'marketplace.html': ['assets/js/marketplace-data.js', 'assets/js/marketplace.js'],
      'project-detail.html': ['assets/js/marketplace-data.js', 'assets/js/marketplace.js', 'assets/js/project-detail.js'],
      'technology.html': ['assets/js/animations.js'],
      'about.html': ['assets/js/animations.js'],
      'contact.html': ['assets/js/animations.js'],
      'buyer.html': ['assets/js/animations.js'],
      'seller.html': ['assets/js/animations.js'],
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
    populateConfigData()

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
