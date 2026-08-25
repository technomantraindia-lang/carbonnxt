/**
 * Dynamic Solution Detail Page Renderer for CarbonNxt
 * Content source: CarbonNxt_Solution_Inner_Pages.json
 */
(function () {
  async function initSolutionDetail() {
    const container = document.getElementById('solution-detail-app');
    if (!container) return;

    // Detect slug from URL query (?slug=...) or path
    const urlParams = new URLSearchParams(window.location.search);
    let slug = urlParams.get('slug');

    if (!slug) {
      const pathSegments = window.location.pathname.split('/').filter(Boolean);
      const lastSeg = pathSegments.pop() || '';
      slug = lastSeg.replace('.html', '').replace('solution-', '');
    }

    if (!slug || slug === 'detail') {
      slug = 'digital-mrv-monitoring'; // Default fallback
    }

    try {
      // Determine correct relative path to JSON file based on location
      const jsonPath = window.location.pathname.includes('/solutions/') 
        ? '../CarbonNxt_Solution_Inner_Pages.json' 
        : 'CarbonNxt_Solution_Inner_Pages.json';

      const response = await fetch(jsonPath);
      if (!response.ok) throw new Error('Failed to load solutions data');
      const data = await response.json();

      const solution = data.solutions.find(
        (s) => s.slug === slug || s.id === slug
      ) || data.solutions[0];

      renderSolutionPage(container, solution);
    } catch (err) {
      console.error('Error rendering solution page:', err);
      container.innerHTML = `
        <div style="padding: 160px 20px; text-align: center; color: #0f211a;">
          <h2 style="font-size: 2rem; margin-bottom: 1rem;">Solution Page Not Found</h2>
          <p style="margin-bottom: 2rem;">We could not load the requested solution details.</p>
          <a href="${window.location.pathname.includes('/solutions/') ? '../solutions.html' : 'solutions.html'}" class="btn btn-primary">Return to Solutions</a>
        </div>
      `;
    }
  }

  function renderSolutionPage(container, item) {
    document.title = `${item.name} | CarbonNxt Solutions`;

    // Map visuals
    const heroImage = 'assets/images/ui/platform-side.jpg';
    const overviewImage = 'assets/images/ui/about-mission.jpg';

    // HTML Assembly
    const html = `
      <!-- 1. HERO -->
      <section class="sol-detail-hero">
        <div class="container">
          <div class="sol-detail-hero__grid">
            <div class="sol-detail-hero__content">
              <div class="eyebrow-pill" style="border-color: rgba(57, 228, 154, 0.3); background: rgba(57, 228, 154, 0.1); color: #39e49a; margin-bottom: 1.5rem;">
                <span class="eyebrow-pill__dot" style="background: #39e49a;"></span>
                <span>${item.hero.eyebrow}</span>
              </div>
              <h1 class="sol-detail-hero__title">${item.hero.title}</h1>
              <p class="sol-detail-hero__tagline">${item.hero.tagline}</p>
              <p class="sol-detail-hero__desc">${item.hero.description}</p>
              <div class="sol-detail-hero__actions">
                <a href="${item.hero.primary_cta === 'Talk to a Carbon Expert' ? 'contact.html' : 'seller.html'}" class="btn btn-primary">
                  <span>${item.hero.primary_cta}</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </a>
                <a href="${item.hero.secondary_cta === 'Submit Your Project' ? 'seller.html' : 'contact.html'}" class="btn btn-outline" style="border-color: rgba(255,255,255,0.3); color: #ffffff;">
                  <span>${item.hero.secondary_cta}</span>
                </a>
              </div>
            </div>
            <div class="sol-detail-hero__visual">
              <img src="${heroImage}" alt="${item.name} Solution Visual" loading="eager">
            </div>
          </div>
        </div>
      </section>

      <!-- 2. OVERVIEW -->
      <section class="sol-overview-section">
        <div class="container">
          <div class="sol-overview__grid">
            <div class="sol-overview__content">
              <span class="section-label" style="color: #029a62; font-weight: 700; letter-spacing: 0.08em;">SOLUTION OVERVIEW</span>
              <h2 class="sol-overview__title">${item.overview.title}</h2>
              <div class="sol-overview__paragraphs">
                ${item.overview.paragraphs.map(p => `<p>${p}</p>`).join('')}
              </div>
            </div>
            <div class="sol-overview__visual-card">
              <img src="${overviewImage}" alt="${item.name} Overview Visual">
            </div>
          </div>
        </div>
      </section>

      <!-- 3. KEY CAPABILITIES -->
      <section class="sol-caps-section">
        <div class="container">
          <header class="text-center">
            <span class="section-label" style="color: #029a62; font-weight: 700;">CAPABILITIES</span>
            <h2 class="section-heading" style="color: #0f211a;">Key Capabilities & Features</h2>
          </header>
          <div class="sol-caps__grid">
            ${item.key_capabilities.map(cap => `
              <div class="sol-cap-card">
                <div class="sol-cap-card__icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <p>${cap}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- 4. HOW IT WORKS -->
      <section class="sol-flow-section">
        <div class="container">
          <header class="text-center">
            <span class="section-label" style="color: #39e49a;">PROCESS FLOW</span>
            <h2 class="section-heading" style="color: #ffffff;">How It Works</h2>
          </header>
          <div class="sol-flow__grid">
            ${item.how_it_works.map(step => `
              <div class="sol-flow-card">
                <div class="sol-flow-card__step">0${step.step}</div>
                <h3>${step.title}</h3>
                <p>${step.description}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- 5 & 6. WHO IT IS FOR & USE CASES -->
      <section style="padding-block: clamp(80px, 10vw, 120px); background: #ffffff;">
        <div class="container">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: clamp(2.5rem, 5vw, 4.5rem);">
            <div>
              <span class="section-label" style="color: #029a62; font-weight: 700;">TARGET AUDIENCE</span>
              <h2 class="section-heading" style="color: #0f211a; font-size: 2rem; margin-bottom: 1rem;">Who It Is For</h2>
              <div class="sol-pills-grid">
                ${item.who_it_is_for.map(aud => `
                  <div class="sol-pill-tag">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    <span>${aud}</span>
                  </div>
                `).join('')}
              </div>
            </div>
            <div>
              <span class="section-label" style="color: #029a62; font-weight: 700;">APPLICATIONS</span>
              <h2 class="section-heading" style="color: #0f211a; font-size: 2rem; margin-bottom: 1rem;">Use Cases</h2>
              <div class="sol-pills-grid">
                ${item.use_cases.map(uc => `
                  <div class="sol-pill-tag" style="background: #f4f8f6; border-color: rgba(2, 154, 98, 0.15);">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    <span>${uc}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 7. BENEFITS -->
      <section style="padding-block: clamp(70px, 8vw, 100px); background: #f4f8f6;">
        <div class="container">
          <header class="text-center" style="margin-bottom: 3rem;">
            <span class="section-label" style="color: #029a62; font-weight: 700;">VALUE DELIVERED</span>
            <h2 class="section-heading" style="color: #0f211a;">Key Benefits</h2>
          </header>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem;">
            ${item.benefits.map(b => `
              <div style="background: #ffffff; padding: 1.75rem; border-radius: 18px; border: 1px solid rgba(2, 154, 98, 0.15); display: flex; align-items: flex-start; gap: 1rem;">
                <div style="width: 32px; height: 32px; border-radius: 50%; background: rgba(2, 154, 98, 0.1); color: #029a62; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <p style="font-size: 1rem; font-weight: 600; color: #0f211a; margin: 0; line-height: 1.45;">${b}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- 8. CARBONNXT SUPPORT -->
      <section class="sol-support-section">
        <div class="container">
          <header class="text-center">
            <span class="section-label" style="color: #39e49a;">HOW CARBONNXT HELPS</span>
            <h2 class="section-heading" style="color: #ffffff;">CarbonNxt Support</h2>
          </header>
          <div class="sol-support__grid">
            ${item.carbonnxt_support.map(sup => `
              <div class="sol-support-card">
                <h3>${sup.title}</h3>
                <p>${sup.description}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- 9. FAQ ACCORDION -->
      <section class="sol-faq-section">
        <div class="container">
          <header class="text-center">
            <span class="section-label" style="color: #029a62; font-weight: 700;">GOT QUESTIONS?</span>
            <h2 class="section-heading" style="color: #0f211a;">Frequently Asked Questions</h2>
          </header>
          <div class="faq-accordion">
            ${item.faq.map((q, idx) => `
              <div class="faq-item ${idx === 0 ? 'is-open' : ''}">
                <button class="faq-toggle" aria-expanded="${idx === 0 ? 'true' : 'false'}">
                  <span>${q.question}</span>
                  <div class="faq-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                </button>
                <div class="faq-content">
                  <p>${q.answer}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- 10. FINAL CTA -->
      <section style="padding-block: clamp(80px, 10vw, 120px); background: #04101d; color: #ffffff; text-align: center;">
        <div class="container" style="max-width: 800px;">
          <h2 style="font-size: clamp(2.2rem, 4vw, 3.2rem); font-weight: 800; line-height: 1.2; margin-bottom: 1.25rem; color: #ffffff;">
            ${item.cta.title}
          </h2>
          <p style="font-size: 1.15rem; line-height: 1.65; color: rgba(255, 255, 255, 0.8); margin-bottom: 2.5rem;">
            ${item.cta.description}
          </p>
          <div style="display: flex; justify-content: center; gap: 1.25rem; flex-wrap: wrap;">
            <a href="contact.html" class="btn btn-primary" style="padding: 1rem 2.25rem; font-size: 1rem;">
              <span>${item.cta.primary_button}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
            <a href="seller.html" class="btn btn-outline" style="border-color: rgba(255,255,255,0.3); color: #ffffff; padding: 1rem 2.25rem; font-size: 1rem;">
              <span>${item.cta.secondary_button}</span>
            </a>
          </div>
        </div>
      </section>
    `;

    container.innerHTML = html;
    bindFaqAccordion();
  }

  function bindFaqAccordion() {
    const items = document.querySelectorAll('.faq-item');
    items.forEach((item) => {
      const toggle = item.querySelector('.faq-toggle');
      if (!toggle) return;
      toggle.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');
        items.forEach((i) => {
          i.classList.remove('is-open');
          const t = i.querySelector('.faq-toggle');
          if (t) t.setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('is-open');
          toggle.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSolutionDetail);
  } else {
    initSolutionDetail();
  }
})();
