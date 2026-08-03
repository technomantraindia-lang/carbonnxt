function initProjectDetail() {
  const id = Utils.getParam('id')
  const main = Utils.$('#project-detail-main')
  const missing = Utils.$('#project-missing')
  if (!main) return

  const project = id ? getProjectById(id) : null
  if (!project) {
    main.hidden = true
    if (missing) missing.hidden = false
    return
  }

  document.title = `${project.title} | CarbonNxt`
  Utils.$('#project-title').textContent = project.title
  Utils.$('#project-summary').textContent = project.summary
  Utils.$('#project-hero-img').src = project.image
  Utils.setText(Utils.$('#project-category'), project.category)
  Utils.setText(Utils.$('#project-region'), project.region)
  Utils.setText(Utils.$('#project-country'), project.country)
  Utils.setText(Utils.$('#project-vintage'), project.vintage)
  Utils.setText(Utils.$('#project-market'), project.marketType)
  Utils.setText(Utils.$('#project-availability'), project.availability)
  Utils.setText(Utils.$('#project-pricing'), project.pricing)
  Utils.setText(Utils.$('#project-verification'), project.verificationStatus)
  Utils.setText(Utils.$('#project-methodology'), project.methodology)
  Utils.setText(Utils.$('#project-impact'), project.impact)
  Utils.setText(Utils.$('#project-sdg'), project.sdg)
  Utils.setText(Utils.$('#project-developer'), project.developer)

  const docs = Utils.$('#project-documents')
  if (docs && project.documents) {
    docs.innerHTML = project.documents.map((d) =>
      `<li class="glass-panel" style="padding:1rem;margin-bottom:0.5rem">
        <strong>${Utils.escapeHtml(d.name)}</strong>
        <span class="text-muted"> — ${Utils.escapeHtml(d.status)}</span>
      </li>`
    ).join('')
  }

  const related = Utils.$('#related-projects')
  if (related) {
    related.innerHTML = getRelatedProjects(project.id).map((p) => renderProjectCard(p, false)).join('')
  }

  Utils.$('#add-compare')?.addEventListener('click', () => toggleCompare(project.id))
}
