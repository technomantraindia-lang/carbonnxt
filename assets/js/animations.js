function initHomeAnimations() {
  if (Utils.prefersReducedMotion()) {
    Utils.$$('.chart-line').forEach((chart) => chart.classList.add('is-animated'))
    Utils.$$('.journey-step, .integrity-step, .final-cta__content').forEach((el) => el.classList.add('is-visible'))
    return
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        if (entry.target.classList.contains('chart-line')) {
          entry.target.classList.add('is-animated')
        }
        obs.unobserve(entry.target)
      }
    })
  }, { threshold: 0.1 })

  Utils.$$('.journey-step, .integrity-step, .chart-line, .final-cta__content').forEach((el) => {
    observer.observe(el)
  })
}
