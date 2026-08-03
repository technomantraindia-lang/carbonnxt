function initMain() {
  document.documentElement.classList.add('js')
  initPageLoader()
  initNavigation()
  initForms()
  initAuthUI()
  Utils.observeReveal()
  Utils.initBackToTop()
  Utils.updateYear()

  const page = Utils.getPageName()

  if (page === 'index.html' || page === '' || page === '/') {
    initHomeAnimations()
    initEcosystemTabs()
    initAudienceTabs()
    initCapabilityEcosystem()
    initOnboardingTabs()
    initCommandCentre()
    initHomeInsights()
  }
  if (page === 'marketplace.html') initMarketplace()
  if (page === 'project-detail.html') initProjectDetail()
  if (page === 'insights.html') initInsights()
  if (page === 'insight-detail.html') initInsightDetail()
  if (page === 'faq.html') initFAQ()
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
      label: 'BUSINESSES & CORPORATES',
      progress: '01 / 04',
      heading: 'Businesses & Corporates',
      desc: 'Discover verified carbon credits, support sustainability and ESG commitments, and maintain transparent records for internal climate-action reporting.',
      img: 'assets/images/ui/audience-buyers.jpg',
      imgAlt: 'Businesses & Corporates',
      benefits: [
        'Discover verified carbon credits',
        'Support sustainability & ESG commitments',
        'Maintain transparent transaction records',
        'Internal climate-action reporting'
      ],
      ctaText: 'Explore Buyer Solutions',
      ctaLink: 'contact.html'
    },
    developers: {
      label: 'PROJECT DEVELOPERS',
      progress: '02 / 04',
      heading: 'Project Developers',
      desc: 'Present eligible carbon projects, manage project and credit information, and connect with organizations seeking credible environmental assets.',
      img: 'assets/images/ui/audience-developers.jpg',
      imgAlt: 'Project Developers',
      benefits: [
        'Present eligible carbon projects',
        'Manage project & credit information',
        'Connect with corporate buyers',
        'Showcase credible environmental assets'
      ],
      ctaText: 'List Your Project',
      ctaLink: 'contact.html'
    },
    brokers: {
      label: 'BROKERS & INTERMEDIARIES',
      progress: '03 / 04',
      heading: 'Brokers & Market Intermediaries',
      desc: 'Access structured project information, support buyer and seller transactions, and maintain clear transaction and portfolio records.',
      img: 'assets/images/ui/audience-brokers.jpg',
      imgAlt: 'Brokers & Market Intermediaries',
      benefits: [
        'Access structured project information',
        'Support buyer & seller transactions',
        'Maintain clear transaction records',
        'Centralized portfolio visibility'
      ],
      ctaText: 'Explore Broker Capabilities',
      ctaLink: 'contact.html'
    },
    investors: {
      label: 'INVESTORS & CLIMATE-FINANCE',
      progress: '04 / 04',
      heading: 'Investors & Climate-Finance Participants',
      desc: 'Explore environmental assets, review market intelligence and monitor carbon-market opportunities through centralized portfolio tools.',
      img: 'assets/images/ui/audience-investors.jpg',
      imgAlt: 'Investors & Climate-Finance Participants',
      benefits: [
        'Explore environmental assets',
        'Review carbon market intelligence',
        'Monitor carbon-market opportunities',
        'Centralized portfolio tools'
      ],
      ctaText: 'Discover Market Opportunities',
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

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMain, { once: true })
} else {
  initMain()
}
