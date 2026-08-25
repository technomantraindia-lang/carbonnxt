/**
 * Dynamic Project Detail Page Renderer for CarbonNxt
 * Content source: CarbonNxt_All_Project_Inner_Pages.json
 */
(function () {
  async function initProjectDetail() {
    const container = document.getElementById('project-detail-app');
    if (!container) return;

    // Detect slug from URL query (?slug=...) or path
    const urlParams = new URLSearchParams(window.location.search);
    let slug = urlParams.get('slug');

    if (!slug) {
      const pathSegments = window.location.pathname.split('/').filter(Boolean);
      const lastSeg = pathSegments.pop() || '';
      slug = lastSeg.replace('.html', '').replace('project-', '');
    }

    if (!slug || slug === 'detail') {
      slug = 'electric-mobility'; // Default fallback
    }

    try {
      const possiblePaths = [
        'CarbonNxt_All_Project_Inner_Pages.json',
        './CarbonNxt_All_Project_Inner_Pages.json',
        '../CarbonNxt_All_Project_Inner_Pages.json',
        '/CarbonNxt_All_Project_Inner_Pages.json'
      ];
      let data = null;

      for (const path of possiblePaths) {
        try {
          const res = await fetch(path);
          if (res.ok) {
            data = await res.json();
            break;
          }
        } catch (e) {}
      }

      if (!data || !data.projects) {
        if (typeof FALLBACK_PROJECTS_DATA !== 'undefined') {
          data = FALLBACK_PROJECTS_DATA;
        } else {
          throw new Error('Failed to load projects data');
        }
      }

      const project = data.projects.find(
        (p) => p.slug === slug || p.id === slug
      ) || data.projects[0];

      renderProjectPage(container, project);
    } catch (err) {
      console.error('Error rendering project page:', err);
      container.innerHTML = `
        <div style="padding: 160px 20px; text-align: center; color: #0f211a;">
          <h2 style="font-size: 2rem; margin-bottom: 1rem;">Project Page</h2>
          <p style="margin-bottom: 2rem;">Loading project details...</p>
          <a href="${window.location.pathname.includes('/projects/') ? '../solutions.html' : 'solutions.html'}" class="btn btn-primary">Return to Solutions & Projects</a>
        </div>
      `;
    }
  }

  function renderProjectPage(container, item) {
    document.title = `${item.name} | CarbonNxt Projects`;

    // Map high quality authentic project type visuals
    const imageMap = {
      'electric-mobility': 'assets/images/ui/buyer_journey.jpg',
      'solar-energy': 'assets/images/ui/section-forest.jpg',
      'artisanal-biochar': 'assets/images/ui/seller_journey.jpg',
      'industrial-biochar': 'assets/images/ui/about-mission.jpg',
      'methane-reduction-cattle': 'assets/images/ui/why-trust.jpg',
      'compressed-biogas-cbg': 'assets/images/ui/platform-side.jpg',
      'clean-cooking-cookstoves': 'assets/images/ui/cta-forest-network.jpg'
    };

    const heroImage = imageMap[item.slug] || 'assets/images/ui/section-forest.jpg';

    const html = `
      <!-- 1. PROJECT HERO -->
      <section class="prj-detail-hero">
        <div class="container">
          <div class="prj-detail-hero__grid">
            <div class="prj-detail-hero__content">
              <div class="eyebrow-pill" style="border-color: rgba(57, 228, 154, 0.3); background: rgba(57, 228, 154, 0.1); color: #39e49a; margin-bottom: 1.25rem;">
                <span class="eyebrow-pill__dot" style="background: #39e49a;"></span>
                <span>${item.hero.eyebrow}</span>
              </div>
              <h1 class="prj-detail-hero__title">${item.hero.title}</h1>
              
              <!-- Impact Categories -->
              ${item.impact_category ? `
                <div class="prj-cat-badges">
                  ${item.impact_category.map(cat => `<span class="prj-cat-badge">${cat}</span>`).join('')}
                </div>
              ` : ''}

              <p class="prj-detail-hero__tagline">${item.hero.tagline}</p>
              <p class="prj-detail-hero__desc">${item.hero.description}</p>
              
              <div class="prj-detail-hero__actions">
                <a href="seller.html" class="btn btn-primary">
                  <span>${item.hero.primary_cta}</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </a>
                <a href="contact.html" class="btn btn-outline" style="border-color: rgba(255,255,255,0.3); color: #ffffff;">
                  <span>${item.hero.secondary_cta}</span>
                </a>
              </div>
            </div>
            <div class="prj-detail-hero__visual">
              <img src="${heroImage}" alt="${item.name} Project Type Visual" loading="eager">
            </div>
          </div>
        </div>
      </section>

      <!-- 2. OVERVIEW -->
      <section class="prj-overview-section">
        <div class="container">
          <div class="prj-overview__grid">
            <div>
              <span class="section-label" style="color: #029a62; font-weight: 700;">PROJECT OVERVIEW</span>
              <h2 class="prj-overview__title">${item.overview.title}</h2>
            </div>
            <div class="prj-overview__paragraphs">
              ${item.overview.paragraphs.map(p => `<p>${p}</p>`).join('')}
            </div>
          </div>
        </div>
      </section>

      <!-- 3. HOW THE PROJECT WORKS -->
      <section style="padding-block: clamp(80px, 10vw, 120px); background: #f4f8f6;">
        <div class="container">
          <header class="text-center" style="margin-bottom: 3.5rem;">
            <span class="section-label" style="color: #029a62; font-weight: 700;">METHODOLOGY & IMPLEMENTATION</span>
            <h2 class="section-heading" style="color: #0f211a;">How the Project Works</h2>
          </header>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.75rem;">
            ${item.how_it_works.map(step => `
              <div class="prj-step-card">
                <div class="prj-step-num">0${step.step}</div>
                <h3 style="font-size: 1.25rem; font-weight: 700; color: #0f211a; margin-bottom: 0.75rem;">${step.title}</h3>
                <p style="font-size: 0.98rem; line-height: 1.6; color: #334e42; margin: 0;">${step.description}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- 4. TYPICAL PROJECT ACTIVITIES -->
      <section style="padding-block: clamp(80px, 10vw, 120px); background: #ffffff;">
        <div class="container">
          <header class="text-center" style="margin-bottom: 3.5rem;">
            <span class="section-label" style="color: #029a62; font-weight: 700;">SCOPE & ELIGIBILITY</span>
            <h2 class="section-heading" style="color: #0f211a;">Typical Project Activities</h2>
          </header>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
            ${item.project_activities.map(act => `
              <div style="background: #f4f8f6; padding: 1.75rem 2rem; border-radius: 18px; border: 1px solid rgba(2, 154, 98, 0.15); display: flex; align-items: center; gap: 1.25rem;">
                <div style="width: 40px; height: 40px; border-radius: 12px; background: rgba(2, 154, 98, 0.12); color: #029a62; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <span style="font-size: 1.05rem; font-weight: 600; color: #0f211a;">${act}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- 5. CLIMATE VALUE -->
      <section style="padding-block: clamp(80px, 10vw, 120px); background: linear-gradient(165deg, #021a12 0%, #04101d 100%); color: #ffffff;">
        <div class="container">
          <header class="text-center" style="margin-bottom: 3.5rem;">
            <span class="section-label" style="color: #39e49a;">ENVIRONMENTAL BENEFIT</span>
            <h2 class="section-heading" style="color: #ffffff;">${item.climate_value.title}</h2>
          </header>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.75rem;">
            ${item.climate_value.points.map(pt => `
              <div style="background: rgba(255, 255, 255, 0.05); padding: 2rem; border-radius: 20px; border: 1px solid rgba(57, 228, 154, 0.25);">
                <div style="width: 36px; height: 36px; border-radius: 50%; background: rgba(57, 228, 154, 0.15); color: #39e49a; display: flex; align-items: center; justify-content: center; margin-bottom: 1.25rem;">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <p style="font-size: 1.05rem; font-weight: 600; color: rgba(255, 255, 255, 0.95); margin: 0; line-height: 1.5;">${pt}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- 6. MRV & PROJECT DATA -->
      <section class="prj-mrv-section">
        <div class="container">
          <header class="text-center">
            <span class="section-label" style="color: #39e49a;">DATA INTEGRITY</span>
            <h2 class="section-heading" style="color: #ffffff;">${item.mrv_and_data.title}</h2>
            <p style="max-width: 680px; margin: 1rem auto 0; font-size: 1.08rem; color: rgba(255, 255, 255, 0.8); line-height: 1.65;">
              ${item.mrv_and_data.description}
            </p>
          </header>
          <div class="prj-mrv-grid">
            ${item.mrv_and_data.data_points.map(dp => `
              <div class="prj-mrv-card">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                <span>${dp}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- 7. CERTIFICATION READINESS -->
      <section style="padding-block: clamp(80px, 10vw, 120px); background: #ffffff;">
        <div class="container">
          <div style="max-width: 860px; margin: 0 auto;">
            <span class="section-label" style="color: #029a62; font-weight: 700;">STANDARDS & ALIGNMENT</span>
            <h2 class="section-heading" style="color: #0f211a; margin-bottom: 1rem;">${item.certification_readiness.title}</h2>
            <p style="font-size: 1.1rem; line-height: 1.7; color: #334e42; margin-bottom: 2.5rem;">
              ${item.certification_readiness.description}
            </p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem;">
              ${item.certification_readiness.key_elements.map(el => `
                <div style="background: #f4f8f6; padding: 1.5rem 1.75rem; border-radius: 16px; border-left: 4px solid #029a62; font-size: 1rem; font-weight: 600; color: #0f211a;">
                  ${el}
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </section>

      <!-- 8 & 9. BUYER & DEVELOPER RELEVANCE -->
      <section style="padding-block: clamp(80px, 10vw, 120px); background: #f4f8f6;">
        <div class="container">
          <div class="relevance-split">
            <!-- Buyer Relevance -->
            <div class="relevance-card relevance-card--buyer">
              <span class="section-label" style="color: #029a62; font-weight: 700;">FOR CREDIT BUYERS</span>
              <h2 style="font-size: 1.8rem; font-weight: 800; color: #0f211a; margin-top: 0.5rem;">${item.buyer_relevance.title}</h2>
              <ul class="relevance-list">
                ${item.buyer_relevance.points.map(pt => `
                  <li>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#029a62" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    <span>${pt}</span>
                  </li>
                `).join('')}
              </ul>
            </div>

            <!-- Developer Relevance -->
            <div class="relevance-card relevance-card--developer">
              <span class="section-label" style="color: #39e49a; font-weight: 700;">FOR PROJECT DEVELOPERS</span>
              <h2 style="font-size: 1.8rem; font-weight: 800; color: #ffffff; margin-top: 0.5rem;">${item.developer_relevance.title}</h2>
              <ul class="relevance-list">
                ${item.developer_relevance.points.map(pt => `
                  <li>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#39e49a" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    <span>${pt}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 10. CARBONNXT SUPPORT JOURNEY -->
      <section style="padding-block: clamp(80px, 10vw, 120px); background: #ffffff;">
        <div class="container">
          <header class="text-center">
            <span class="section-label" style="color: #029a62; font-weight: 700;">END-TO-END SUPPORT</span>
            <h2 class="section-heading" style="color: #0f211a;">CarbonNxt Support Journey</h2>
          </header>
          <div class="support-journey-grid">
            ${item.carbonnxt_support.map(sup => `
              <div class="support-journey-card">
                <h3>${sup.stage}</h3>
                <p>${sup.details}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- 11. FAQ ACCORDION -->
      <section class="sol-faq-section" style="background: #f4f8f6;">
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

      <!-- 12. FINAL DYNAMIC CTA -->
      <section style="padding-block: clamp(80px, 10vw, 120px); background: #04101d; color: #ffffff; text-align: center;">
        <div class="container" style="max-width: 800px;">
          <h2 style="font-size: clamp(2.2rem, 4vw, 3.2rem); font-weight: 800; line-height: 1.2; margin-bottom: 1.25rem; color: #ffffff;">
            ${item.cta.title}
          </h2>
          <p style="font-size: 1.15rem; line-height: 1.65; color: rgba(255, 255, 255, 0.8); margin-bottom: 2.5rem;">
            ${item.cta.description}
          </p>
          <div style="display: flex; justify-content: center; gap: 1.25rem; flex-wrap: wrap;">
            <a href="seller.html" class="btn btn-primary" style="padding: 1rem 2.25rem; font-size: 1rem;">
              <span>${item.cta.primary_button}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
            <a href="contact.html" class="btn btn-outline" style="border-color: rgba(255,255,255,0.3); color: #ffffff; padding: 1rem 2.25rem; font-size: 1rem;">
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
    document.addEventListener('DOMContentLoaded', initProjectDetail);
  } else {
    initProjectDetail();
  }
})();
