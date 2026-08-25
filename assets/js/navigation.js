function initNavigation() {
  const header = Utils.$('#site-header')
  if (!header) return

  const page = Utils.getPageName()
  const isHome = page === 'index.html'

  header.classList.add(isHome ? 'is-transparent' : 'is-solid')

  const allNavLinks = document.querySelectorAll('.site-nav__link, .nav-dropdown__menu a, .mobile-nav a, .mobile-nav__link')
  allNavLinks.forEach((link) => {
    const href = link.getAttribute('href')
    if (!href) return
    const linkPage = href.split('/').pop().split('?')[0].split('#')[0]
    if (linkPage === page || (page === 'index.html' && (linkPage === 'index.html' || linkPage === ''))) {
      link.classList.add('is-active', 'active')
      link.setAttribute('aria-current', 'page')
    } else {
      link.classList.remove('is-active', 'active')
      link.removeAttribute('aria-current')
    }
  })

  const onScroll = Utils.debounce(() => {
    const scrolled = window.scrollY > 60
    header.classList.toggle('is-scrolled', scrolled)
    if (isHome) header.classList.toggle('is-solid', scrolled)
  }, 16)
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()

  initDropdowns()
  initMobileNav()
}

function initDropdowns() {
  const dropdowns = Utils.$$('.nav-dropdown')
  let openDropdown = null

  function closeAll() {
    dropdowns.forEach((d) => {
      d.classList.remove('is-open')
      const btn = Utils.$('.nav-dropdown__toggle', d)
      if (btn) btn.setAttribute('aria-expanded', 'false')
    })
    openDropdown = null
  }

  dropdowns.forEach((dropdown) => {
    const toggle = Utils.$('.nav-dropdown__toggle', dropdown)
    const menu = Utils.$('.nav-dropdown__menu', dropdown)
    if (!toggle || !menu) return

    toggle.setAttribute('aria-haspopup', 'true')
    toggle.setAttribute('aria-expanded', 'false')

    toggle.addEventListener('click', (e) => {
      e.preventDefault()
      const isOpen = dropdown.classList.contains('is-open')
      closeAll()
      if (!isOpen) {
        dropdown.classList.add('is-open')
        toggle.setAttribute('aria-expanded', 'true')
        openDropdown = dropdown
      }
    })

    toggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        toggle.click()
      }
      if (e.key === 'ArrowDown' && dropdown.classList.contains('is-open')) {
        e.preventDefault()
        const first = Utils.$('a', menu)
        if (first) first.focus()
      }
    })
  })

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-dropdown')) closeAll()
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAll()
  })
}

function initMobileNav() {
  const toggle = Utils.$('#nav-toggle')
  const mobileNav = Utils.$('#mobile-nav')
  if (!toggle || !mobileNav) return

  const close = () => {
    toggle.classList.remove('is-active')
    mobileNav.classList.remove('is-open')
    toggle.setAttribute('aria-expanded', 'false')
    document.body.classList.remove('nav-open')
  }

  const open = () => {
    toggle.classList.add('is-active')
    mobileNav.classList.add('is-open')
    toggle.setAttribute('aria-expanded', 'true')
    document.body.classList.add('nav-open')
  }

  toggle.addEventListener('click', () => {
    mobileNav.classList.contains('is-open') ? close() : open()
  })

  Utils.$$('a', mobileNav).forEach((link) => link.addEventListener('click', close))
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) close()
  })

  Utils.$$('.mobile-nav__accordion-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const panel = btn.nextElementSibling
      const expanded = btn.getAttribute('aria-expanded') === 'true'
      btn.setAttribute('aria-expanded', String(!expanded))
      if (panel) panel.hidden = expanded
    })
  })
}
