/**
 * Bootstraps layout partials and app scripts.
 * Must work even when fetch fails (e.g. file://) so content still appears.
 */
(function () {
  const path = window.location.pathname.replace(/\\/g, '/')
  const isSubfolder = path.includes('/solutions/') || path.includes('/projects/')
  const prefix = isSubfolder ? '../' : ''

  function adjustRelativePaths(container) {
    if (!isSubfolder || !container) return
    container.querySelectorAll('[href], [src]').forEach((el) => {
      ['href', 'src'].forEach((attr) => {
        const val = el.getAttribute(attr)
        if (val && !val.startsWith('http') && !val.startsWith('//') && !val.startsWith('#') && !val.startsWith('mailto:') && !val.startsWith('tel:') && !val.startsWith('../')) {
          el.setAttribute(attr, prefix + val)
        }
      })
    })
  }

  async function loadPartials() {
    const headerPh = document.getElementById('header-placeholder')
    const footerPh = document.getElementById('footer-placeholder')
    if (!headerPh && !footerPh) return

    try {
      if (window.location.protocol === 'file:') {
        throw new Error('Use a local server (not file://) for full navigation.')
      }
      const [h, f] = await Promise.all([
        fetch(`${prefix}assets/partials/header.html`).then((r) => {
          if (!r.ok) throw new Error('header')
          return r.text()
        }),
        fetch(`${prefix}assets/partials/footer.html`).then((r) => {
          if (!r.ok) throw new Error('footer')
          return r.text()
        }),
      ])
      if (headerPh) {
        headerPh.outerHTML = h
        const newHeader = document.getElementById('site-header')
        if (newHeader && newHeader.parentElement) adjustRelativePaths(newHeader.parentElement)
      }
      if (footerPh) {
        footerPh.outerHTML = f
        const newFooter = document.querySelector('.site-footer')
        if (newFooter && newFooter.parentElement) adjustRelativePaths(newFooter.parentElement)
      }
      const mn = document.getElementById('mobile-nav')
      if (mn) mn.removeAttribute('hidden')
      if (typeof initNavigation === 'function') initNavigation()
    } catch {
      if (headerPh) {
        // Full offline fallback (e.g. file://) — mirrors assets/partials/header.html
        headerPh.innerHTML = `
          <header class="site-header is-solid" id="site-header">
            <div class="container site-header__inner">
              <a href="${prefix}index.html" class="site-logo" aria-label="CarbonNxt Home">
                <img src="${prefix}logo.png" alt="CarbonNxt Logo" class="site-logo__img" style="height: 48px; width: auto; object-fit: contain; display: block;">
              </a>
              <nav class="site-nav" aria-label="Main navigation">
                <ul class="site-nav__list">
                  <li><a href="${prefix}index.html" class="site-nav__link">Home</a></li>
                  <li><a href="${prefix}about.html" class="site-nav__link">About</a></li>
                  <li class="nav-dropdown">
                    <a href="${prefix}solutions.html" class="site-nav__link nav-dropdown__toggle">
                      <span>Solutions</span>
                    </a>
                    <div class="nav-dropdown__menu">
                      <div class="nav-dropdown__group">
                        <span class="nav-dropdown__label">CORE SOLUTIONS</span>
                        <a href="${prefix}solutions/digital-mrv-monitoring.html" class="nav-dropdown__item">Digital MRV & Monitoring</a>
                        <a href="${prefix}solutions/carbon-asset-digitisation.html" class="nav-dropdown__item">Carbon Asset Digitisation</a>
                        <a href="${prefix}solutions/carbon-market-advisory.html" class="nav-dropdown__item">Carbon Market Advisory</a>
                        <a href="${prefix}solutions/knowledge-capacity-building.html" class="nav-dropdown__item">Knowledge & Capacity Building</a>
                        <a href="${prefix}solutions/field-data-iot-integration.html" class="nav-dropdown__item">Field Data & IoT Integration</a>
                      </div>
                      <div class="nav-dropdown__group">
                        <span class="nav-dropdown__label">PROJECT TYPES</span>
                        <a href="${prefix}projects/electric-mobility.html" class="nav-dropdown__item">Electric Mobility</a>
                        <a href="${prefix}projects/solar-energy.html" class="nav-dropdown__item">Solar Energy</a>
                        <a href="${prefix}projects/artisanal-biochar.html" class="nav-dropdown__item">Artisanal Biochar</a>
                        <a href="${prefix}projects/industrial-biochar.html" class="nav-dropdown__item">Industrial Biochar</a>
                        <a href="${prefix}projects/methane-reduction-cattle.html" class="nav-dropdown__item">Methane Reduction – Cattle</a>
                        <a href="${prefix}projects/compressed-biogas-cbg.html" class="nav-dropdown__item">Compressed Biogas (CBG)</a>
                        <a href="${prefix}projects/clean-cooking-cookstoves.html" class="nav-dropdown__item">Clean Cooking & Cookstoves</a>
                      </div>
                    </div>
                  </li>
                  <li><a href="${prefix}buyer.html" class="site-nav__link">Buyer</a></li>
                  <li><a href="${prefix}seller.html" class="site-nav__link">Seller</a></li>
                  <li><a href="${prefix}insights.html" class="site-nav__link">Insights</a></li>
                  <li><a href="${prefix}contact.html" class="site-nav__link">Contact</a></li>
                </ul>
                <div class="site-nav__actions">
                  <a href="${prefix}contact.html" class="btn btn-primary">Inquiry</a>
                </div>
              </nav>
              <button class="nav-toggle" id="nav-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav">
                <span class="nav-toggle__bar"></span>
              </button>
            </div>
          </header>
          <nav class="mobile-nav" id="mobile-nav" aria-label="Mobile navigation">
            <a href="${prefix}index.html" class="mobile-nav__link">Home</a>
            <a href="${prefix}about.html" class="mobile-nav__link">About</a>
            <a href="${prefix}solutions.html" class="mobile-nav__link">Solutions Overview</a>
            <a href="${prefix}buyer.html" class="mobile-nav__link">Buyer</a>
            <a href="${prefix}seller.html" class="mobile-nav__link">Seller</a>
            <a href="${prefix}insights.html" class="mobile-nav__link">Insights</a>
            <a href="${prefix}contact.html" class="mobile-nav__link">Contact</a>
            <div class="mobile-nav__actions">
              <a href="${prefix}contact.html" class="btn btn-primary">Inquiry</a>
            </div>
          </nav>
        `
        if (typeof initNavigation === 'function') initNavigation()
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
        await loadScript(prefix + src)
      } catch {
        /* optional page scripts */
      }
    }

    try {
      await loadScript(prefix + 'assets/js/main.js')
    } catch {
      dismissLoader()
    }
    document.documentElement.classList.add('js')
    Utils.$$('[data-reveal]').forEach((el) => el.classList.add('is-visible'))
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot)
  } else {
    boot()
  }
})()
