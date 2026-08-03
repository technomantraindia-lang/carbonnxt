const COMPARE_KEY = 'cnxt_compare'

function initMarketplace() {
  const grid = Utils.$('#projects-grid')
  if (!grid) return

  renderProjects(MARKETPLACE_PROJECTS)
  initFilters()
  initCompare()
}

function renderProjects(projects) {
  const grid = Utils.$('#projects-grid')
  const empty = Utils.$('#empty-state')
  if (!grid) return

  if (!projects.length) {
    grid.innerHTML = ''
    if (empty) empty.hidden = false
    return
  }
  if (empty) empty.hidden = true

  grid.innerHTML = projects.map((p) => `
    <article class="project-card" data-id="${p.id}">
      <div class="project-card__image"><img src="${p.image}" alt="" loading="lazy"></div>
      <div class="project-card__body">
        <span class="demo-badge">${SITE_CONFIG.demoLabel}</span>
        <h3 class="project-card__title">${Utils.escapeHtml(p.title)}</h3>
        <div class="project-card__meta">
          <span>${Utils.escapeHtml(p.category)}</span>
          <span>${Utils.escapeHtml(p.country)}</span>
        </div>
        <div class="project-card__meta">
          <span>${Utils.escapeHtml(p.vintage)}</span>
          <span>${Utils.escapeHtml(p.pricing)}</span>
        </div>
        <div style="display:flex;gap:0.5rem;margin-top:1rem;flex-wrap:wrap">
          <a href="project-detail.html?id=${p.id}" class="btn btn-primary btn-sm">View Project</a>
          <button class="btn btn-secondary btn-sm compare-btn" data-id="${p.id}">Compare</button>
        </div>
      </div>
    </article>`).join('')

  Utils.$$('.compare-btn', grid).forEach((btn) => {
    btn.addEventListener('click', () => toggleCompare(btn.dataset.id))
  })
}

function initFilters() {
  const search = Utils.$('#search-input')
  const sort = Utils.$('#sort-select')
  const filters = Utils.$$('#filter-category, #filter-country, #filter-vintage, #filter-market, #filter-verification, #filter-availability')
  const reset = Utils.$('#reset-filters')

  const apply = () => {
    let results = [...MARKETPLACE_PROJECTS]
    const q = search?.value.toLowerCase().trim()

    if (q) {
      results = results.filter((p) =>
        [p.title, p.category, p.country, p.region, p.summary].some((f) => f.toLowerCase().includes(q))
      )
    }

    const cat = Utils.$('#filter-category')?.value
    const country = Utils.$('#filter-country')?.value
    const vintage = Utils.$('#filter-vintage')?.value
    const market = Utils.$('#filter-market')?.value
    const ver = Utils.$('#filter-verification')?.value

    if (cat) results = results.filter((p) => p.category === cat)
    if (country) results = results.filter((p) => p.country === country)
    if (vintage) results = results.filter((p) => p.vintage === vintage)
    if (market) results = results.filter((p) => p.marketType === market)
    if (ver) results = results.filter((p) => p.verificationStatus === ver)

    const sortVal = sort?.value || 'recommended'
    if (sortVal === 'name') results.sort((a, b) => a.title.localeCompare(b.title))
    else if (sortVal === 'category') results.sort((a, b) => a.category.localeCompare(b.category))

    renderProjects(results)
  }

  search?.addEventListener('input', Utils.debounce(apply, 200))
  sort?.addEventListener('change', apply)
  filters.forEach((f) => f?.addEventListener('change', apply))
  reset?.addEventListener('click', () => {
    if (search) search.value = ''
    filters.forEach((f) => { if (f) f.value = '' })
    if (sort) sort.value = 'recommended'
    apply()
  })
}

function getCompareList() {
  return Utils.storage.get(COMPARE_KEY, [])
}

function toggleCompare(id) {
  let list = getCompareList()
  if (list.includes(id)) list = list.filter((i) => i !== id)
  else if (list.length >= 3) return
  else list.push(id)
  Utils.storage.set(COMPARE_KEY, list)
  updateCompareDrawer()
}

function initCompare() {
  updateCompareDrawer()
  Utils.$('#compare-close')?.addEventListener('click', () => {
    Utils.storage.set(COMPARE_KEY, [])
    updateCompareDrawer()
  })
}

function updateCompareDrawer() {
  const drawer = Utils.$('#compare-drawer')
  const content = Utils.$('#compare-content')
  if (!drawer || !content) return
  const list = getCompareList()
  drawer.classList.toggle('is-open', list.length > 0)
  if (!list.length) return

  const projects = list.map(getProjectById).filter(Boolean)
  content.innerHTML = `<table style="width:100%;font-size:0.85rem;border-collapse:collapse">
    <tr><th style="text-align:left;padding:0.5rem">Field</th>${projects.map((p) => `<th style="text-align:left;padding:0.5rem">${Utils.escapeHtml(p.title)}</th>`).join('')}</tr>
    ${['category', 'country', 'vintage', 'verificationStatus', 'availability', 'pricing', 'marketType'].map((field) => `
      <tr><td style="padding:0.5rem;color:var(--color-text-muted)">${field}</td>${projects.map((p) => `<td style="padding:0.5rem">${Utils.escapeHtml(p[field])}</td>`).join('')}</tr>
    `).join('')}
  </table>`
}
