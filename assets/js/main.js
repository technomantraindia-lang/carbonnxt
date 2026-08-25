function initMain() {
  document.documentElement.classList.add('js')
  if (typeof initPageLoader === 'function') initPageLoader()
  if (typeof initNavigation === 'function') initNavigation()
  if (typeof initForms === 'function') initForms()
  if (typeof initAuthUI === 'function') initAuthUI()
  if (typeof Utils !== 'undefined' && Utils.observeReveal) Utils.observeReveal()
  if (typeof Utils !== 'undefined' && Utils.initBackToTop) Utils.initBackToTop()
  if (typeof Utils !== 'undefined' && Utils.updateYear) Utils.updateYear()

  const page = typeof Utils !== 'undefined' ? Utils.getPageName() : 'index.html'

  if (page === 'index.html' || page === '' || page === '/') {
    if (typeof initHomeAnimations === 'function') initHomeAnimations()
    if (typeof initEcosystemTabs === 'function') initEcosystemTabs()
    if (typeof initAudienceTabs === 'function') initAudienceTabs()
    if (typeof initCapabilityEcosystem === 'function') initCapabilityEcosystem()
    if (typeof initOnboardingTabs === 'function') initOnboardingTabs()
    if (typeof initCommandCentre === 'function') initCommandCentre()
    if (typeof initSectorsCoverflow === 'function') initSectorsCoverflow()
    if (typeof initHomeInsights === 'function') initHomeInsights()
  }
  if (page === 'marketplace.html' && typeof initMarketplace === 'function') initMarketplace()
  if (page === 'project-detail.html' && typeof initProjectDetail === 'function') initProjectDetail()
  if (page === 'insights.html' && typeof initInsights === 'function') initInsights()
  if (page === 'insight-detail.html' && typeof initInsightDetail === 'function') initInsightDetail()
  if (page === 'faq.html' && typeof initFAQ === 'function') initFAQ()
}

function initCommandCentre() {
  const railBtns   = document.querySelectorAll('.cc-rail-item')
  const floatCards = document.querySelectorAll('.cc-float-card')
  const ccPanel    = document.getElementById('command-center-panel')
  const ccGlow     = document.getElementById('cc-cursor-glow')

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const hasHover      = window.matchMedia('(hover: hover)').matches

  function activateRail(key) {
    railBtns.forEach(btn => {
      const isTarget = btn.getAttribute('data-rail') === key
      btn.classList.toggle('is-active', isTarget)
      btn.setAttribute('aria-selected', isTarget ? 'true' : 'false')
    })

    floatCards.forEach(card => {
      const isTarget = card.getAttribute('data-card') === key
      card.classList.toggle('is-active', isTarget)
      card.classList.toggle('is-dimmed', !isTarget)
    })

    // Auto-clear dim after 2s so cards return to neutral state
    clearTimeout(window._ccDimTimer)
    window._ccDimTimer = setTimeout(() => {
      floatCards.forEach(c => c.classList.remove('is-active', 'is-dimmed'))
    }, 2000)
  }

  // Rail button interaction
  railBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => activateRail(btn.getAttribute('data-rail')))

    btn.addEventListener('keydown', e => {
      let nextIdx = null
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextIdx = (idx + 1) % railBtns.length
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   nextIdx = (idx - 1 + railBtns.length) % railBtns.length
      if (nextIdx !== null) {
        e.preventDefault()
        railBtns[nextIdx].focus()
        railBtns[nextIdx].click()
      }
    })
  })

  // Floating card click mirrors rail
  floatCards.forEach(card => {
    card.addEventListener('click', () => activateRail(card.getAttribute('data-card')))
  })

  // Cursor glow — desktop only
  if (ccPanel && ccGlow && !reducedMotion && hasHover) {
    ccPanel.addEventListener('mousemove', e => {
      const rect = ccPanel.getBoundingClientRect()
      ccGlow.style.left = (e.clientX - rect.left) + 'px'
      ccGlow.style.top  = (e.clientY - rect.top)  + 'px'
    })
    ccPanel.addEventListener('mouseenter', () => { ccGlow.style.opacity = '1' })
    ccPanel.addEventListener('mouseleave', () => { ccGlow.style.opacity = '0' })
  }
}

function initOnboardingTabs() {
  const toggleBtns = document.querySelectorAll('.onboarding-toggle-btn')
  const panels = document.querySelectorAll('.onboarding-pathway-panel')

  if (!toggleBtns.length || !panels.length) return

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetPathway = btn.getAttribute('data-pathway')

      toggleBtns.forEach(b => {
        const isTarget = b === btn
        b.classList.toggle('is-active', isTarget)
        b.setAttribute('aria-selected', isTarget ? 'true' : 'false')
      })

      panels.forEach(p => {
        const isTarget = p.id === `pathway-panel-${targetPathway}`
        p.classList.toggle('is-active', isTarget)
      })
    })
  })
}

function initCapabilityEcosystem() {
  const capTiles = document.querySelectorAll('.capability-tile--interactive')
  const capPanelImg = document.getElementById('featured-capability-img')
  const capPanelContent = document.getElementById('featured-capability-content')
  const capPanelNum = document.getElementById('featured-capability-num')
  const capPanelTitle = document.getElementById('featured-capability-title')
  const capPanelDesc = document.getElementById('featured-capability-desc')

  if (!capTiles.length || !capPanelImg) return

  capTiles.forEach(tile => {
    tile.addEventListener('click', () => {
      const num = tile.getAttribute('data-capability')
      const title = tile.getAttribute('data-title')
      const desc = tile.getAttribute('data-desc')
      const img = tile.getAttribute('data-img')

      if (!title || !desc) return

      capTiles.forEach(t => t.classList.remove('is-active'))
      tile.classList.add('is-active')

      capPanelImg.style.opacity = '0.3'
      capPanelContent.style.opacity = '0.3'

      setTimeout(() => {
        if (img) capPanelImg.src = img
        if (capPanelNum) capPanelNum.textContent = num
        if (capPanelTitle) capPanelTitle.textContent = title
        if (capPanelDesc) capPanelDesc.textContent = desc

        capPanelImg.style.opacity = '1'
        capPanelContent.style.opacity = '1'
      }, 180)
    })
  })
}

function initAudienceTabs() {
  const audienceData = {
    businesses: {
      label: 'CORPORATES & BUSINESSES',
      progress: '01 / 04',
      heading: 'Corporates & Businesses',
      desc: 'Meet ESG and net-zero commitments with verified, audit-ready carbon credits — sourced and vetted by our team, not self-served from a raw listing.',
      img: 'assets/images/ui/audience-buyers.jpg',
      imgAlt: 'Corporates & Businesses',
      benefits: [
        'Meet ESG and net-zero commitments',
        'Verified, audit-ready carbon credits',
        'Sourced and vetted by our expert team',
        'Full transaction traceability and support'
      ],
      ctaText: 'Explore Buyer Solutions',
      ctaLink: 'buyer.html'
    },
    developers: {
      label: 'PROJECT DEVELOPERS',
      progress: '02 / 04',
      heading: 'Project Developers',
      desc: 'Get your carbon project certified and connected to genuine buyer demand. We manage documentation, standard alignment, and market access on your behalf.',
      img: 'assets/images/ui/audience-developers.jpg',
      imgAlt: 'Project Developers',
      benefits: [
        'Get your carbon project certified',
        'Connect to genuine buyer demand',
        'Professional documentation management',
        'Standard alignment and market access'
      ],
      ctaText: 'List Your Project',
      ctaLink: 'seller.html'
    },
    brokers: {
      label: 'BROKERS & INTERMEDIARIES',
      progress: '03 / 04',
      heading: 'Brokers & Intermediaries',
      desc: 'Plug into our network and inventory to close deals faster, with transaction support and settlement handled end-to-end.',
      img: 'assets/images/ui/audience-brokers.jpg',
      imgAlt: 'Brokers & Intermediaries',
      benefits: [
        'Plug into our network and inventory',
        'Close transactions faster',
        'Complete transaction support',
        'End-to-end settlement handling'
      ],
      ctaText: 'Partner With Us',
      ctaLink: 'contact.html'
    },
    investors: {
      label: 'INVESTORS & CLIMATE FINANCE',
      progress: '04 / 04',
      heading: 'Investors & Climate Finance',
      desc: 'Get market intelligence and portfolio visibility on carbon assets before you commit capital.',
      img: 'assets/images/ui/audience-investors.jpg',
      imgAlt: 'Investors & Climate Finance',
      benefits: [
        'Access carbon market intelligence',
        'Portfolio visibility on carbon assets',
        'High-fidelity market analytics',
        'Vetted carbon asset data'
      ],
      ctaText: 'Explore Market Data',
      ctaLink: 'contact.html'
    }
  }

  const tabBtns = document.querySelectorAll('.audience-tab-btn')
  const panelImg = document.getElementById('audience-panel-img')
  const panelContent = document.getElementById('audience-panel-content')
  const panelLabel = document.getElementById('audience-panel-label')
  const panelProgress = document.getElementById('audience-panel-progress')
  const panelHeading = document.getElementById('audience-panel-heading')
  const panelDesc = document.getElementById('audience-panel-desc')
  const panelBenefits = document.getElementById('audience-panel-benefits')
  const panelCta = document.getElementById('audience-panel-cta')

  if (!tabBtns.length || !panelImg) return

  function switchAudience(targetKey) {
    const data = audienceData[targetKey]
    if (!data) return

    tabBtns.forEach(btn => {
      const isTarget = btn.getAttribute('data-audience') === targetKey
      btn.classList.toggle('is-active', isTarget)
      btn.setAttribute('aria-selected', isTarget ? 'true' : 'false')
    })

    panelImg.style.opacity = '0.3'
    panelContent.style.opacity = '0.3'
    panelContent.style.transform = 'translateY(6px)'

    setTimeout(() => {
      panelImg.src = data.img
      panelImg.alt = data.imgAlt
      if (panelLabel) panelLabel.textContent = data.label
      if (panelProgress) panelProgress.textContent = data.progress
      if (panelHeading) panelHeading.textContent = data.heading
      if (panelDesc) panelDesc.textContent = data.desc

      if (panelBenefits) {
        panelBenefits.innerHTML = data.benefits.map(b => `
          <div class="audience-panel__benefit-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            <span>${b}</span>
          </div>
        `).join('')
      }

      if (panelCta) {
        panelCta.href = data.ctaLink
        const span = panelCta.querySelector('span')
        if (span) span.textContent = data.ctaText
      }

      panelImg.style.opacity = '1'
      panelContent.style.opacity = '1'
      panelContent.style.transform = 'translateY(0)'
    }, 200)
  }

  tabBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const audienceKey = btn.getAttribute('data-audience')
      switchAudience(audienceKey)
    })

    btn.addEventListener('keydown', (e) => {
      let nextIndex = null
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        nextIndex = (index + 1) % tabBtns.length
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        nextIndex = (index - 1 + tabBtns.length) % tabBtns.length
      }

      if (nextIndex !== null) {
        e.preventDefault()
        tabBtns[nextIndex].focus()
        tabBtns[nextIndex].click()
      }
    })
  })
}

function initEcosystemTabs() {
  const nodes = Utils.$$('.ecosystem__node')
  const panel = Utils.$('#ecosystem-panel')
  if (!nodes.length || !panel) return

  const content = {
    buyers: {
      title: 'Businesses & Buyers',
      body: 'Businesses and corporates can discover verified carbon credits, evaluate project information, and manage procurement through a transparent digital workflow.',
      href: 'marketplace.html',
      link: 'Explore the marketplace',
      image: 'assets/images/ui/audience-buyers.jpg',
    },
    developers: {
      title: 'Project Developers',
      body: 'Project developers can bring eligible carbon projects to market with structured listings, documentation, and buyer enquiry management.',
      href: 'list-carbon-credits.html',
      link: 'List your project',
      image: 'assets/images/ui/audience-developers.jpg',
    },
    brokers: {
      title: 'Brokers & Investors',
      body: 'Brokers connect market participants through a platform supported by project records, transaction tracking, and compliance tools.',
      href: 'corporates-investors.html',
      link: 'For corporates & investors',
      image: 'assets/images/ui/audience-investors.jpg',
    },
    registries: {
      title: 'Standards & Registries',
      body: 'CarbonNxt features integration-ready architecture designed to support recognized standards and registry systems, subject to platform availability.',
      href: 'standards-registries.html',
      link: 'Standards & registries',
      image: 'assets/images/ui/platform-side.jpg',
    },
  }

  const activate = (key) => {
    const item = content[key]
    if (!item) return
    nodes.forEach((n) => n.classList.toggle('is-active', n.dataset.node === key))
    panel.innerHTML = `
      <div class="ecosystem__detail-media">
        <img src="${item.image}" alt="" width="720" height="420" loading="lazy">
      </div>
      <p class="ecosystem__detail-eyebrow">Participant focus</p>
      <h3 class="ecosystem__detail-title">${item.title}</h3>
      <p class="ecosystem__detail-body">${item.body}</p>
      <a class="ecosystem__detail-link" href="${item.href}">${item.link}</a>
    `
  }

  nodes.forEach((node) => {
    const handler = () => activate(node.dataset.node)
    node.addEventListener('click', handler)
    node.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handler() }
    })
  })
  activate('buyers')
}

function initMarketplacePreview() {
  const container = Utils.$('#home-projects')
  if (!container || typeof MARKETPLACE_PROJECTS === 'undefined') return

  const projects = MARKETPLACE_PROJECTS.slice(0, 3)
  container.innerHTML = projects.map((p, i) => renderHomeProjectCard(p, i === 0)).join('')
}

function renderHomeProjectCard(p, isFeatured) {
  return `<article class="project-card project-card--home${isFeatured ? ' is-featured' : ''}">
    <a href="project-detail.html?id=${encodeURIComponent(p.id)}">
      <div class="project-card__image">
        <img src="${p.image}" alt="" width="640" height="400" loading="lazy">
        ${isFeatured ? '<span class="project-card__flag">Featured</span>' : ''}
      </div>
      <div class="project-card__body">
        <div class="project-card__top">
          <span class="demo-badge">${SITE_CONFIG.demoLabel}</span>
          <span class="verification-badge">${Utils.escapeHtml(p.verificationStatus)}</span>
        </div>
        <h3 class="project-card__title">${Utils.escapeHtml(p.title)}</h3>
        <p class="project-card__summary">${Utils.escapeHtml(p.summary)}</p>
        <div class="project-card__meta">
          <span>${Utils.escapeHtml(p.category)}</span>
          <span>${Utils.escapeHtml(p.country)}</span>
          <span>Vintage ${Utils.escapeHtml(p.vintage)}</span>
        </div>
        <div class="project-card__footer">
          <span class="project-card__price">${Utils.escapeHtml(p.pricing)}</span>
          <span class="project-card__action">View project →</span>
        </div>
      </div>
    </a>
  </article>`
}

function renderProjectCard(p, isFeatured) {
  const cls = isFeatured ? 'marketplace-preview__featured' : ''
  return `<article class="project-card ${cls}" data-reveal>
    <a href="project-detail.html?id=${p.id}">
      <div class="project-card__image"><img src="${p.image}" alt="" width="400" height="250" loading="lazy"></div>
      <div class="project-card__body">
        <span class="demo-badge">${SITE_CONFIG.demoLabel}</span>
        <h3 class="project-card__title">${Utils.escapeHtml(p.title)}</h3>
        <div class="project-card__meta">
          <span>${Utils.escapeHtml(p.category)}</span>
          <span>${Utils.escapeHtml(p.country)}</span>
        </div>
        <div class="project-card__meta">
          <span>Vintage: ${Utils.escapeHtml(p.vintage)}</span>
          <span>${Utils.escapeHtml(p.pricing)}</span>
        </div>
        <span class="verification-badge">${Utils.escapeHtml(p.verificationStatus)}</span>
      </div>
    </a>
  </article>`
}

function initHomeInsights() {
  const container = Utils.$('#home-insights')
  if (!container || typeof INSIGHTS_ARTICLES === 'undefined') return
  const featured = INSIGHTS_ARTICLES.find((a) => a.featured) || INSIGHTS_ARTICLES[0]
  const others = INSIGHTS_ARTICLES.filter((a) => a.id !== featured.id).slice(0, 2)

  container.innerHTML = `
    <article class="insight-card insight-card--home">
      <a href="insight-detail.html?id=${encodeURIComponent(featured.id)}">
        <div class="insight-card__image"><img src="${featured.image}" alt="" loading="lazy"></div>
        <div class="insight-card__body">
          <span class="demo-badge">${Utils.escapeHtml(featured.status)}</span>
          <span class="section-label">${Utils.escapeHtml(featured.category)}</span>
          <h3>${Utils.escapeHtml(featured.title)}</h3>
          <p>${Utils.escapeHtml(featured.summary)}</p>
          <span class="text-muted">${Utils.escapeHtml(featured.readingTime)}</span>
        </div>
      </a>
    </article>
    <div class="insights-preview__side">
      ${others.map((a) => `
        <article class="insight-card insight-card--home">
          <a href="insight-detail.html?id=${encodeURIComponent(a.id)}">
            <div class="insight-card__image"><img src="${a.image}" alt="" loading="lazy"></div>
            <div class="insight-card__body">
              <span class="demo-badge">${Utils.escapeHtml(a.status)}</span>
              <h3>${Utils.escapeHtml(a.title)}</h3>
              <span class="text-muted">${Utils.escapeHtml(a.readingTime)}</span>
            </div>
          </a>
        </article>`).join('')}
    </div>`
}

function initSectorsCoverflow() {
  const stage = document.getElementById('sectors-coverflow-stage')
  const track = document.getElementById('sectors-coverflow-track')
  const prevBtn = document.getElementById('sectors-prev-btn')
  const nextBtn = document.getElementById('sectors-next-btn')
  const dotsWrap = document.getElementById('sectors-dots-wrap')
  const filterBtns = document.querySelectorAll('.sector-filter-btn')

  if (!stage || !track) return

  let cards = Array.from(track.querySelectorAll('.sector-cover-card'))
  if (!cards.length) return

  let activeIndex = 0

  function renderDots() {
    if (!dotsWrap) return
    dotsWrap.innerHTML = cards.map((_, i) => `
      <span class="coverflow-dot ${i === activeIndex ? 'is-active' : ''}" data-index="${i}"></span>
    `).join('')

    dotsWrap.querySelectorAll('.coverflow-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        activeIndex = parseInt(dot.getAttribute('data-index'), 10)
        updateCoverflow()
      })
    })
  }

  function updateCoverflow() {
    const isMobile = window.innerWidth < 768
    const spacing = isMobile ? 140 : 250
    const depth = isMobile ? -50 : -80

    cards.forEach((card, i) => {
      const diff = i - activeIndex
      const absDiff = Math.abs(diff)

      if (diff === 0) {
        // Active Center Card
        card.style.transform = `translate3d(0, 0, 100px) rotateY(0deg) scale(1.05)`
        card.style.zIndex = '30'
        card.style.opacity = '1'
        card.style.filter = 'none'
        card.style.pointerEvents = 'auto'
        card.classList.add('is-active')
      } else {
        card.classList.remove('is-active')
        const direction = diff > 0 ? 1 : -1
        const translateX = diff * spacing
        const rotateY = direction * (isMobile ? -14 : -22)
        const scale = Math.max(0.65, 1 - absDiff * 0.15)
        const opacity = Math.max(0, 1 - absDiff * 0.3)
        const zIndex = 30 - absDiff * 5
        const blur = absDiff > 1 ? '1.5px' : '0px'

        card.style.transform = `translate3d(${translateX}px, 0, ${diff * depth}px) rotateY(${rotateY}deg) scale(${scale})`
        card.style.zIndex = zIndex.toString()
        card.style.opacity = opacity.toString()
        card.style.filter = blur !== '0px' ? `blur(${blur})` : 'none'
        card.style.pointerEvents = absDiff === 1 ? 'auto' : 'none'
      }
    })

    // Update dots
    if (dotsWrap) {
      const dots = dotsWrap.querySelectorAll('.coverflow-dot')
      dots.forEach((dot, i) => {
        dot.classList.toggle('is-active', i === activeIndex)
      })
    }
  }

  // Click card to make center
  cards.forEach((card, i) => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.sector-cover-card__cta')) return
      if (i !== activeIndex) {
        activeIndex = i
        updateCoverflow()
      }
    })
  })

  // Nav buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      activeIndex = (activeIndex - 1 + cards.length) % cards.length
      updateCoverflow()
    })
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      activeIndex = (activeIndex + 1) % cards.length
      updateCoverflow()
    })
  }

  // Filter pills
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter')

      filterBtns.forEach(b => b.classList.toggle('is-active', b === btn))

      if (filter === 'all') {
        cards.forEach(c => c.style.display = 'flex')
        activeIndex = 0
      } else {
        const matchingIndex = cards.findIndex(c => c.getAttribute('data-category') === filter)
        if (matchingIndex !== -1) {
          activeIndex = matchingIndex
        }
      }
      updateCoverflow()
    })
  })

  // Touch Swipe
  let startX = 0
  stage.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX
  }, { passive: true })

  stage.addEventListener('touchend', (e) => {
    const diffX = e.changedTouches[0].clientX - startX
    if (Math.abs(diffX) > 40) {
      if (diffX < 0) {
        activeIndex = (activeIndex + 1) % cards.length
      } else {
        activeIndex = (activeIndex - 1 + cards.length) % cards.length
      }
      updateCoverflow()
    }
  }, { passive: true })

  window.addEventListener('resize', typeof Utils !== 'undefined' && Utils.debounce ? Utils.debounce(updateCoverflow, 150) : updateCoverflow)

  renderDots()
  updateCoverflow()
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMain, { once: true })
} else {
  initMain()
}
