function initInsights() {
  const grid = Utils.$('#insights-grid')
  const featured = Utils.$('#insights-featured')
  if (!grid) return

  const render = (articles) => {
    const feat = articles.find((a) => a.featured) || articles[0]
    const rest = articles.filter((a) => a.id !== feat?.id)

    if (featured && feat) {
      featured.innerHTML = `<article class="insight-card glass-panel" style="display:grid;grid-template-columns:1fr 1fr;gap:0;overflow:hidden">
        <div class="insight-card__image" style="aspect-ratio:auto;min-height:280px"><img src="${feat.image}" alt=""></div>
        <div class="insight-card__body" style="padding:2rem">
          <span class="demo-badge">${feat.status}</span>
          <span class="section-label">${Utils.escapeHtml(feat.category)}</span>
          <h2 style="margin:1rem 0">${Utils.escapeHtml(feat.title)}</h2>
          <p>${Utils.escapeHtml(feat.summary)}</p>
          <a href="insight-detail.html?id=${feat.id}" class="btn btn-primary" style="margin-top:1.5rem">Read Article</a>
        </div>
      </article>`
    }

    grid.innerHTML = rest.map((a) => `
      <article class="insight-card">
        <a href="insight-detail.html?id=${a.id}">
          <div class="insight-card__image"><img src="${a.image}" alt="" loading="lazy"></div>
          <div class="insight-card__body">
            <span class="demo-badge">${a.status}</span>
            <span class="section-label">${Utils.escapeHtml(a.category)}</span>
            <h3>${Utils.escapeHtml(a.title)}</h3>
            <p>${Utils.escapeHtml(a.summary)}</p>
            <span class="text-muted">${a.readingTime}</span>
          </div>
        </a>
      </article>`).join('')
  }

  render(INSIGHTS_ARTICLES)

  const search = Utils.$('#insight-search')
  const category = Utils.$('#insight-category')

  const filter = () => {
    let results = [...INSIGHTS_ARTICLES]
    const q = search?.value.toLowerCase().trim()
    const cat = category?.value
    if (q) results = results.filter((a) => [a.title, a.summary, a.category].some((f) => f.toLowerCase().includes(q)))
    if (cat) results = results.filter((a) => a.category === cat)
    render(results)
  }

  search?.addEventListener('input', Utils.debounce(filter, 200))
  category?.addEventListener('change', filter)
}
