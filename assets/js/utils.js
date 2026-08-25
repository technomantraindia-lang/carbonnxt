const Utils = {
  $(sel, ctx = document) { return ctx.querySelector(sel) },
  $$(sel, ctx = document) { return [...ctx.querySelectorAll(sel)] },

  prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  },

  isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0
  },

  debounce(fn, wait = 200) {
    let t
    return (...args) => {
      clearTimeout(t)
      t = setTimeout(() => fn(...args), wait)
    }
  },

  getPageName() {
    const raw = (window.location.pathname.split('/').pop() || 'index.html').split('?')[0].split('#')[0].toLowerCase()
    let clean = raw
    if (clean.endsWith('.html')) clean = clean.slice(0, -5)
    return (!clean || clean === '' || clean === 'index') ? 'index.html' : clean + '.html'
  },

  getParam(name) {
    return new URLSearchParams(window.location.search).get(name)
  },

  escapeHtml(str) {
    const d = document.createElement('div')
    d.textContent = str
    return d.innerHTML
  },

  setText(el, text) {
    if (el) el.textContent = text
  },

  storage: {
    get(key, fallback = null) {
      try {
        const v = localStorage.getItem(key)
        return v ? JSON.parse(v) : fallback
      } catch { return fallback }
    },
    set(key, val) {
      try { localStorage.setItem(key, JSON.stringify(val)) } catch {}
    },
  },

  observeReveal() {
    const reveal = () => {
      Utils.$$('[data-reveal]').forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.92) {
          el.classList.add('is-visible')
        }
      })
    }

    reveal()

    if (Utils.prefersReducedMotion()) {
      Utils.$$('[data-reveal]').forEach((el) => el.classList.add('is-visible'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -5% 0px' }
    )
    Utils.$$('[data-reveal]').forEach((el) => {
      if (!el.classList.contains('is-visible')) io.observe(el)
    })

    window.addEventListener('scroll', Utils.debounce(reveal, 100), { passive: true })
    setTimeout(() => Utils.$$('[data-reveal]').forEach((el) => el.classList.add('is-visible')), 2500)
  },

  initBackToTop() {
    const btn = Utils.$('#back-to-top')
    if (!btn) return
    const toggle = () => btn.classList.toggle('is-visible', window.scrollY > 500)
    window.addEventListener('scroll', toggle, { passive: true })
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: Utils.prefersReducedMotion() ? 'auto' : 'smooth' }))
  },

  updateYear() {
    Utils.$$('[data-year]').forEach((el) => {
      el.textContent = new Date().getFullYear()
    })
  },
}
