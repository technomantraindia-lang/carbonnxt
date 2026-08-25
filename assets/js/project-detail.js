/**
 * Project Detail Page — CarbonNxt
 * Reads: CarbonNxt_All_Project_Inner_Pages.json
 */
(function () {
  'use strict';

  // ── Get slug from URL ──
  function getSlug() {
    const params = new URLSearchParams(window.location.search);
    return params.get('slug') || 'electric-mobility';
  }

  // ── Fetch JSON ──
  async function loadJSON() {
    const res = await fetch('CarbonNxt_All_Project_Inner_Pages.json');
    if (!res.ok) throw new Error('Could not load JSON');
    return res.json();
  }

  // ── Render ──
  function render(container, item) {
    document.title = item.name + ' | CarbonNxt Projects';

    const heroImg = {
      'electric-mobility': 'assets/images/ui/buyer_journey.jpg',
      'solar-energy': 'assets/images/ui/section-forest.jpg',
      'artisanal-biochar': 'assets/images/ui/seller_journey.jpg',
      'industrial-biochar': 'assets/images/ui/about-mission.jpg',
      'methane-reduction-cattle': 'assets/images/ui/why-trust.jpg',
      'compressed-biogas': 'assets/images/ui/platform-side.jpg',
      'clean-cooking-cookstoves': 'assets/images/ui/cta-forest-network.jpg'
    };
    const img = heroImg[item.slug] || 'assets/images/ui/section-forest.jpg';

    container.innerHTML = `
      <!-- 1. HERO -->
      <section class="prj-detail-hero">
        <div class="container">
          <!-- Breadcrumbs -->
          <nav style="margin-bottom:1.75rem;padding-top:0.5rem;" aria-label="Breadcrumb">
            <ol style="list-style:none;padding:0;margin:0;display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap;">
              <li><a href="index.html" style="color:rgba(255,255,255,0.55);font-size:0.88rem;font-weight:600;text-decoration:none;transition:color 0.2s;" onmouseover="this.style.color='#39e49a'" onmouseout="this.style.color='rgba(255,255,255,0.55)'">Home</a></li>
              <li style="color:rgba(255,255,255,0.3);font-size:0.75rem;display:flex;align-items:center;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></li>
              <li><a href="solutions.html" style="color:rgba(255,255,255,0.55);font-size:0.88rem;font-weight:600;text-decoration:none;transition:color 0.2s;" onmouseover="this.style.color='#39e49a'" onmouseout="this.style.color='rgba(255,255,255,0.55)'">Projects</a></li>
              <li style="color:rgba(255,255,255,0.3);font-size:0.75rem;display:flex;align-items:center;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></li>
              <li style="color:#39e49a;font-size:0.88rem;font-weight:700;">${item.name}</li>
            </ol>
          </nav>
          <div class="prj-detail-hero__grid">
            <div class="prj-detail-hero__content">
              <div class="eyebrow-pill" style="border-color: rgba(57,228,154,0.3); background: rgba(57,228,154,0.1); color: #39e49a; margin-bottom: 1.25rem;">
                <span class="eyebrow-pill__dot" style="background:#39e49a;"></span>
                <span>${item.hero.eyebrow}</span>
              </div>
              <h1 class="prj-detail-hero__title">${item.hero.title}</h1>
              ${item.impact_category ? '<div class="prj-cat-badges">' + item.impact_category.map(c => '<span class="prj-cat-badge">' + c + '</span>').join('') + '</div>' : ''}
              <p class="prj-detail-hero__tagline">${item.hero.tagline}</p>
              <p class="prj-detail-hero__desc">${item.hero.description}</p>
              <div class="prj-detail-hero__actions">
                <a href="seller.html" class="btn btn-primary"><span>${item.hero.primary_cta}</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </a>
                <a href="contact.html" class="btn btn-outline" style="border-color:rgba(255,255,255,0.3);color:#fff;"><span>${item.hero.secondary_cta}</span></a>
              </div>
            </div>
            <div class="prj-detail-hero__visual"><img src="${img}" alt="${item.name}" loading="eager"></div>
          </div>
        </div>
      </section>

      <!-- 2. OVERVIEW -->
      <section class="prj-overview-section">
        <div class="container">
          <div class="prj-overview__grid">
            <div>
              <span class="section-label" style="color:#029a62;font-weight:700;letter-spacing:0.08em;">PROJECT OVERVIEW</span>
              <h2 class="prj-overview__title">${item.overview.title}</h2>
              <div class="prj-overview__paragraphs">${item.overview.paragraphs.map(p => '<p>' + p + '</p>').join('')}</div>
            </div>
            <div style="border-radius:24px;overflow:hidden;border:1px solid rgba(2,154,98,0.2);box-shadow:0 20px 50px rgba(0,0,0,0.06);">
              <img src="assets/images/ui/about-mission.jpg" alt="${item.name} Overview" style="width:100%;height:100%;object-fit:cover;display:block;">
            </div>
          </div>
        </div>
      </section>

      <!-- 3. HOW IT WORKS -->
      <section style="padding-block:clamp(80px,10vw,120px);background:#04101d;color:#fff;">
        <div class="container">
          <header class="text-center"><span class="section-label" style="color:#39e49a;">PROCESS FLOW</span><h2 class="section-heading" style="color:#fff;">How It Works</h2></header>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1.75rem;margin-top:3rem;">
            ${item.how_it_works.map(s => `
              <div class="prj-step-card" style="background:rgba(255,255,255,0.04);border-color:rgba(57,228,154,0.2);">
                <div class="prj-step-num">0${s.step}</div>
                <h3 style="color:#fff;font-size:1.15rem;font-weight:700;margin-bottom:0.65rem;">${s.title}</h3>
                <p style="color:rgba(255,255,255,0.75);font-size:0.95rem;line-height:1.6;margin:0;">${s.description}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- 4. PROJECT ACTIVITIES -->
      <section style="padding-block:clamp(70px,9vw,100px);background:#f4f8f6;">
        <div class="container">
          <header class="text-center"><span class="section-label" style="color:#029a62;font-weight:700;">PROJECT SCOPE</span><h2 class="section-heading" style="color:#0f211a;">Project Activities</h2></header>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1.25rem;margin-top:2.5rem;">
            ${item.project_activities.map(a => `
              <div style="background:#fff;padding:1.5rem;border-radius:16px;border:1px solid rgba(2,154,98,0.12);display:flex;align-items:center;gap:1rem;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#029a62" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                <span style="font-size:1rem;font-weight:600;color:#0f211a;">${a}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- 5. CLIMATE VALUE -->
      <section style="padding-block:clamp(70px,9vw,100px);background:#fff;">
        <div class="container">
          <header class="text-center"><span class="section-label" style="color:#029a62;font-weight:700;">IMPACT</span><h2 class="section-heading" style="color:#0f211a;">${item.climate_value.title}</h2></header>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1.5rem;margin-top:2.5rem;">
            ${item.climate_value.points.map(p => `
              <div style="background:#f4f8f6;padding:1.75rem;border-radius:16px;border-left:4px solid #029a62;display:flex;align-items:flex-start;gap:1rem;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#029a62" stroke-width="2.5" style="flex-shrink:0;margin-top:2px;"><polyline points="20 6 9 17 4 12"/></svg>
                <span style="font-size:1rem;font-weight:600;color:#0f211a;">${p}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- 6. MRV & DATA -->
      <section class="prj-mrv-section">
        <div class="container">
          <header class="text-center"><span class="section-label" style="color:#39e49a;">DATA & EVIDENCE</span><h2 class="section-heading" style="color:#fff;">${item.mrv_and_data.title}</h2></header>
          <p style="text-align:center;max-width:700px;margin:1rem auto 0;color:rgba(255,255,255,0.75);font-size:1.05rem;line-height:1.65;">${item.mrv_and_data.description}</p>
          <div class="prj-mrv-grid">
            ${item.mrv_and_data.data_points.map(d => `
              <div class="prj-mrv-card">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                <span>${d}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- 7. CERTIFICATION READINESS -->
      <section style="padding-block:clamp(70px,9vw,100px);background:#f4f8f6;">
        <div class="container" style="max-width:800px;text-align:center;">
          <span class="section-label" style="color:#029a62;font-weight:700;">CERTIFICATION</span>
          <h2 class="section-heading" style="color:#0f211a;">${item.certification_readiness.title}</h2>
          <p style="font-size:1.1rem;line-height:1.7;color:#334e42;margin-top:1.5rem;">${item.certification_readiness.description}</p>
        </div>
      </section>

      <!-- 8 & 9. BUYER & DEVELOPER RELEVANCE -->
      <section style="padding-block:clamp(80px,10vw,120px);background:#fff;">
        <div class="container">
          <div class="relevance-split">
            <div class="relevance-card relevance-card--buyer">
              <span class="section-label" style="color:#029a62;font-weight:700;">FOR BUYERS</span>
              <h2 style="font-size:1.6rem;font-weight:800;color:#0f211a;margin-top:0.5rem;">${item.buyer_relevance.title}</h2>
              <ul class="relevance-list">
                ${item.buyer_relevance.points.map(p => '<li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#029a62" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg><span>' + p + '</span></li>').join('')}
              </ul>
            </div>
            <div class="relevance-card relevance-card--developer">
              <span class="section-label" style="color:#39e49a;">FOR DEVELOPERS</span>
              <h2 style="font-size:1.6rem;font-weight:800;color:#fff;margin-top:0.5rem;">${item.developer_relevance.title}</h2>
              <p style="font-size:1.05rem;line-height:1.7;color:rgba(255,255,255,0.8);margin-top:1.5rem;">${item.developer_relevance.description}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 10. CARBONNXT SUPPORT -->
      <section style="padding-block:clamp(80px,10vw,120px);background:#f4f8f6;">
        <div class="container">
          <header class="text-center" style="margin-bottom:3rem;"><span class="section-label" style="color:#029a62;font-weight:700;">END-TO-END SUPPORT</span><h2 class="section-heading" style="color:#0f211a;">CarbonNxt Support Journey</h2></header>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1.5rem;">
            ${item.carbonnxt_support.map(function(sup, i) {
              var title = typeof sup === 'string' ? sup : (sup.title || sup.stage || 'Step');
              return '<div style="background:#fff;padding:1.75rem;border-radius:16px;border:1px solid rgba(2,154,98,0.15);border-left:4px solid #029a62;"><span style="font-size:0.75rem;font-weight:800;color:#029a62;letter-spacing:0.1em;">STEP 0' + (i+1) + '</span><h3 style="font-size:1.15rem;color:#0f211a;margin-top:0.35rem;margin-bottom:0;font-weight:700;">' + title + '</h3></div>';
            }).join('')}
          </div>
        </div>
      </section>

      <!-- 11. FAQ -->
      <section style="padding-block:clamp(80px,10vw,120px);background:#fff;">
        <div class="container">
          <header class="text-center" style="margin-bottom:clamp(2.5rem,4vw,3.5rem);"><span class="section-label" style="color:#029a62;font-weight:700;">GOT QUESTIONS?</span><h2 class="section-heading" style="color:#0f211a;">Frequently Asked Questions</h2></header>
          <div style="max-width:840px;margin:0 auto;display:flex;flex-direction:column;gap:1.25rem;" id="prj-faq-list">
            ${item.faq.map(function(q, i) {
              var isOpen = i === 0;
              return '<div class="prj-faq-item" style="border:1px solid ' + (isOpen ? '#029a62' : 'rgba(2,154,98,0.16)') + ';border-radius:18px;overflow:hidden;background:#ffffff;box-shadow:' + (isOpen ? '0 10px 30px rgba(2,154,98,0.08)' : '0 4px 18px rgba(0,0,0,0.02)') + ';transition:all 0.3s ease;">' +
                '<button class="prj-faq-btn" style="width:100%;display:flex;align-items:center;justify-content:space-between;padding:1.5rem 1.75rem;background:transparent;border:none;font-family:inherit;font-size:1.1rem;font-weight:700;color:#0f211a;text-align:left;cursor:pointer;">' +
                  '<span>' + q.question + '</span>' +
                  '<div style="width:28px;height:28px;border-radius:50%;background:' + (isOpen ? '#029a62' : 'rgba(2,154,98,0.1)') + ';color:' + (isOpen ? '#ffffff' : '#029a62') + ';display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all 0.3s ease;transform:rotate(' + (isOpen ? '180deg' : '0deg') + ');">' +
                    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>' +
                  '</div>' +
                '</button>' +
                '<div style="padding:0 1.75rem ' + (isOpen ? '1.5rem' : '0') + ' 1.75rem;font-size:1rem;line-height:1.7;color:#4e6057;display:' + (isOpen ? 'block' : 'none') + ';"><p style="margin:0;">' + q.answer + '</p></div>' +
              '</div>';
            }).join('')}
          </div>
        </div>
      </section>

      <!-- 12. CTA -->
      <section style="padding-block:clamp(80px,10vw,120px);background:#04101d;color:#fff;text-align:center;">
        <div class="container" style="max-width:800px;">
          <h2 style="font-size:clamp(2.2rem,4vw,3.2rem);font-weight:800;line-height:1.2;margin-bottom:1.25rem;color:#fff;">${item.cta.title}</h2>
          <p style="font-size:1.15rem;line-height:1.65;color:rgba(255,255,255,0.8);margin-bottom:2.5rem;">${item.cta.description}</p>
          <div style="display:flex;justify-content:center;gap:1.25rem;flex-wrap:wrap;">
            <a href="seller.html" class="btn btn-primary" style="padding:1rem 2.25rem;font-size:1rem;"><span>${item.cta.primary_button}</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>
            <a href="contact.html" class="btn btn-outline" style="border-color:rgba(255,255,255,0.3);color:#fff;padding:1rem 2.25rem;font-size:1rem;"><span>${item.cta.secondary_button}</span></a>
          </div>
        </div>
      </section>
    `;

    // FAQ accordion
    container.querySelectorAll('.prj-faq-item').forEach(function (el) {
      el.querySelector('.prj-faq-btn').addEventListener('click', function () {
        var content = el.querySelector('.prj-faq-btn').nextElementSibling;
        var icon = el.querySelector('.prj-faq-btn div');
        var isOpen = content.style.display === 'block';

        // Close all
        container.querySelectorAll('.prj-faq-item').forEach(function (item) {
          var c = item.querySelector('.prj-faq-btn').nextElementSibling;
          var ic = item.querySelector('.prj-faq-btn div');
          c.style.display = 'none';
          c.style.paddingBottom = '0';
          item.style.borderColor = 'rgba(2,154,98,0.16)';
          item.style.boxShadow = '0 4px 18px rgba(0,0,0,0.02)';
          ic.style.background = 'rgba(2,154,98,0.1)';
          ic.style.color = '#029a62';
          ic.style.transform = 'rotate(0deg)';
        });

        // Toggle clicked
        if (!isOpen) {
          content.style.display = 'block';
          content.style.paddingBottom = '1.5rem';
          el.style.borderColor = '#029a62';
          el.style.boxShadow = '0 10px 30px rgba(2,154,98,0.08)';
          icon.style.background = '#029a62';
          icon.style.color = '#ffffff';
          icon.style.transform = 'rotate(180deg)';
        }
      });
    });
  }

  // ── Init ──
  async function init() {
    var container = document.getElementById('project-detail-app');
    if (!container) return;

    var slug = getSlug();

    try {
      var data = await loadJSON();
      var project = data.projects.find(function (p) { return p.slug === slug || p.id === slug; }) || data.projects[0];
      render(container, project);
    } catch (err) {
      console.error('project-detail.js error:', err);
      container.innerHTML = '<div style="padding:180px 20px;text-align:center;"><h2 style="color:#0f211a;">Could not load project</h2><p style="color:#4e6057;">Error: ' + err.message + '</p><a href="solutions.html" class="btn btn-primary" style="margin-top:1.5rem;">Back to Solutions</a></div>';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
