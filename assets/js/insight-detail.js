function initInsightDetail() {
  const id = Utils.getParam('id')
  const main = Utils.$('#insight-detail-main')
  const missing = Utils.$('#insight-missing')
  if (!main) return

  const article = id ? getArticleById(id) : null
  if (!article) {
    main.hidden = true
    if (missing) missing.hidden = false
    return
  }

  document.title = `${article.title} | CarbonNxt Insights`
  Utils.setText(Utils.$('#article-category'), article.category)
  Utils.setText(Utils.$('#article-title'), article.title)
  Utils.setText(Utils.$('#article-summary'), article.summary)
  Utils.setText(Utils.$('#article-reading'), article.readingTime)
  const img = Utils.$('#article-image')
  if (img) { img.src = article.image; img.alt = '' }

  const content = Utils.$('#article-content')
  if (content) {
    content.innerHTML = article.sections.map((s) => `
      <div class="content-section" data-reveal>
        <h2>${Utils.escapeHtml(s.heading)}</h2>
        <p>${Utils.escapeHtml(s.content)}</p>
      </div>`).join('')
  }

  const takeaways = Utils.$('#article-takeaways')
  if (takeaways) {
    takeaways.innerHTML = article.takeaways.map((t) => `<li>${Utils.escapeHtml(t)}</li>`).join('')
  }

  const related = Utils.$('#related-insights')
  if (related && article.relatedIds) {
    related.innerHTML = getRelatedArticles(article.relatedIds).map((a) => `
      <article class="insight-card">
        <a href="insight-detail.html?id=${a.id}">
          <div class="insight-card__body">
            <span class="demo-badge">${a.status}</span>
            <h3>${Utils.escapeHtml(a.title)}</h3>
            <span class="text-muted">${a.readingTime}</span>
          </div>
        </a>
      </article>`).join('')
  }
}
