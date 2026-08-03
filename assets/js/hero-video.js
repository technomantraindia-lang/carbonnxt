function initHeroVideo() {
  const wrap = Utils.$('#hero-video')
  const fallback = Utils.$('#hero-fallback')
  const video = wrap?.querySelector('.hero__video')
  if (!wrap || !video) return

  function showFallback() {
    wrap.hidden = true
    if (fallback) fallback.hidden = false
  }

  function markReady() {
    wrap.classList.add('is-ready')
  }

  if (Utils.prefersReducedMotion()) {
    showFallback()
    return
  }

  video.muted = true
  video.playsInline = true
  video.setAttribute('muted', '')
  video.setAttribute('playsinline', '')

  video.addEventListener('loadeddata', markReady)
  video.addEventListener('canplay', markReady)
  video.addEventListener('playing', markReady)
  video.addEventListener('error', showFallback, true)

  function tryPlay() {
    const promise = video.play()
    if (promise && typeof promise.then === 'function') {
      promise.then(markReady).catch(() => {
        // Retry once after a short delay (common on first load)
        setTimeout(() => {
          video.play().then(markReady).catch(showFallback)
        }, 400)
      })
    }
  }

  if (video.readyState >= 2) {
    markReady()
    tryPlay()
  } else {
    video.addEventListener('loadeddata', tryPlay, { once: true })
    video.load()
    tryPlay()
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      video.pause()
    } else if (!Utils.prefersReducedMotion()) {
      video.play().then(markReady).catch(() => {})
    }
  })
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeroVideo)
} else {
  initHeroVideo()
}
