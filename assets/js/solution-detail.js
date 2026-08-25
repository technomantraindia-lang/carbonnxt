/**
 * Solution Detail Page — CarbonNxt
 * Reads: CarbonNxt_Solution_Inner_Pages.json
 */
(function () {
  'use strict';

  // ── Get slug from URL ──
  function getSlug() {
    var params = new URLSearchParams(window.location.search);
    return params.get('slug') || 'digital-mrv-monitoring';
  }

  // ── Fetch JSON ──
  async function loadJSON() {
    var res = await fetch('CarbonNxt_Solution_Inner_Pages.json');
    if (!res.ok) throw new Error('Could not load JSON');
    return res.json();
  }

  // ── Render ──
  function render(container, item) {
    document.title = item.name + ' | CarbonNxt Solutions';

    var heroImage = 'assets/images/ui/platform-side.jpg';
    var overviewImage = 'assets/images/ui/about-mission.jpg';

    container.innerHTML = `
      <!-- 1. HERO -->
      <section class="sol-detail-hero">
        <div class="container">
          <!-- Breadcrumbs -->
          <nav style="margin-bottom:1.75rem;padding-top:0.5rem;" aria-label="Breadcrumb">
            <ol style="list-style:none;padding:0;margin:0;display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap;">
              <li><a href="index.html" style="color:rgba(255,255,255,0.55);font-size:0.88rem;font-weight:600;text-decoration:none;transition:color 0.2s;" onmouseover="this.style.color='#39e49a'" onmouseout="this.style.color='rgba(255,255,255,0.55)'">Home</a></li>
              <li style="color:rgba(255,255,255,0.3);font-size:0.75rem;display:flex;align-items:center;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></li>
              <li><a href="solutions.html" style="color:rgba(255,255,255,0.55);font-size:0.88rem;font-weight:600;text-decoration:none;transition:color 0.2s;" onmouseover="this.style.color='#39e49a'" onmouseout="this.style.color='rgba(255,255,255,0.55)'">Solutions</a></li>
              <li style="color:rgba(255,255,255,0.3);font-size:0.75rem;display:flex;align-items:center;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></li>
              <li style="color:#39e49a;font-size:0.88rem;font-weight:700;">${item.name}</li>
            </ol>
          </nav>
          <div class="sol-detail-hero__grid">
            <div class="sol-detail-hero__content">
              <div class="eyebrow-pill" style="border-color:rgba(57,228,154,0.3);background:rgba(57,228,154,0.1);color:#39e49a;margin-bottom:1.5rem;">
                <span class="eyebrow-pill__dot" style="background:#39e49a;"></span>
                <span>${item.hero.eyebrow}</span>
              </div>
              <h1 class="sol-detail-hero__title">${item.hero.title}</h1>
              <p class="sol-detail-hero__tagline">${item.hero.tagline}</p>
              <p class="sol-detail-hero__desc">${item.hero.description}</p>
              <div class="sol-detail-hero__actions">
                <a href="contact.html" class="btn btn-primary"><span>${item.hero.primary_cta}</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </a>
                <a href="seller.html" class="btn btn-outline" style="border-color:rgba(255,255,255,0.3);color:#fff;"><span>${item.hero.secondary_cta}</span></a>
              </div>
            </div>
            <div class="sol-detail-hero__visual"><img src="${heroImage}" alt="${item.name}" loading="eager"></div>
          </div>
        </div>
      </section>

      <!-- 2. OVERVIEW -->
      <section class="sol-overview-section">
        <div class="container">
          <div class="sol-overview__grid">
            <div class="sol-overview__content">
              <span class="section-label" style="color:#029a62;font-weight:700;letter-spacing:0.08em;">SOLUTION OVERVIEW</span>
              <h2 class="sol-overview__title">${item.overview.title}</h2>
              <div class="sol-overview__paragraphs">${item.overview.paragraphs.map(function(p) { return '<p>' + p + '</p>'; }).join('')}</div>
            </div>
            <div class="sol-overview__visual-card"><img src="${overviewImage}" alt="${item.name} Overview"></div>
          </div>
        </div>
      </section>

      <!-- 3. KEY CAPABILITIES -->
      <section class="sol-caps-section">
        <div class="container">
          <header class="text-center"><span class="section-label" style="color:#029a62;font-weight:700;">CAPABILITIES</span><h2 class="section-heading" style="color:#0f211a;">Key Capabilities & Features</h2></header>
          <div class="sol-caps__grid">
            ${item.key_capabilities.map(function(cap) {
              return '<div class="sol-cap-card"><div class="sol-cap-card__icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg></div><p>' + cap + '</p></div>';
            }).join('')}
          </div>
        </div>
      </section>

      <!-- 4. HOW IT WORKS -->
      <section class="sol-flow-section">
        <div class="container">
          <header class="text-center"><span class="section-label" style="color:#39e49a;">PROCESS FLOW</span><h2 class="section-heading" style="color:#fff;">How It Works</h2></header>
          <div class="sol-flow__grid">
            ${item.how_it_works.map(function(step) {
              return '<div class="sol-flow-card"><div class="sol-flow-card__step">0' + step.step + '</div><h3>' + step.title + '</h3><p>' + step.description + '</p></div>';
            }).join('')}
          </div>
        </div>
      </section>

      <!-- 5 & 6. WHO IT IS FOR & USE CASES — Premium Redesign -->
      <section style="padding-block:clamp(90px,12vw,140px);background:linear-gradient(180deg,#ffffff 0%,#f0f7f4 100%);">
        <div class="container">
          <header class="text-center" style="margin-bottom:clamp(3rem,5vw,4.5rem);">
            <span class="section-label" style="color:#029a62;font-weight:700;letter-spacing:0.12em;">BUILT FOR YOUR ROLE</span>
            <h2 class="section-heading" style="color:#0f211a;font-size:clamp(2rem,3.5vw,2.8rem);">Who It Serves & How It Applies</h2>
          </header>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:clamp(1.5rem,3vw,2.5rem);">

            <!-- Target Audience Card -->
            <div style="background:linear-gradient(165deg,#04101d 0%,#071e15 100%);border-radius:28px;padding:clamp(2rem,4vw,3.5rem);border:1px solid rgba(57,228,154,0.2);position:relative;overflow:hidden;">
              <div style="position:absolute;top:-60px;right:-60px;width:200px;height:200px;background:radial-gradient(circle,rgba(57,228,154,0.08),transparent 70%);pointer-events:none;"></div>
              <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1.75rem;">
                <div style="width:44px;height:44px;border-radius:14px;background:rgba(57,228,154,0.12);display:flex;align-items:center;justify-content:center;">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#39e49a" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <div>
                  <span style="font-size:0.7rem;font-weight:800;color:#39e49a;letter-spacing:0.12em;text-transform:uppercase;">Target Audience</span>
                  <h3 style="font-size:1.5rem;font-weight:800;color:#ffffff;margin:0;line-height:1.2;">Who It Is For</h3>
                </div>
              </div>
              <div style="display:flex;flex-direction:column;gap:0.85rem;">
                ${item.who_it_is_for.map(function(aud, i) {
                  return '<div style="display:flex;align-items:center;gap:1rem;padding:1rem 1.25rem;background:rgba(255,255,255,0.04);border:1px solid rgba(57,228,154,0.12);border-radius:14px;transition:all 0.3s ease;" onmouseover="this.style.background=\'rgba(57,228,154,0.08)\';this.style.borderColor=\'rgba(57,228,154,0.3)\'" onmouseout="this.style.background=\'rgba(255,255,255,0.04)\';this.style.borderColor=\'rgba(57,228,154,0.12)\'"><div style="width:32px;height:32px;border-radius:10px;background:rgba(57,228,154,0.1);color:#39e49a;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:0.8rem;font-weight:800;">0' + (i+1) + '</div><span style="font-size:1rem;font-weight:600;color:rgba(255,255,255,0.92);line-height:1.3;">' + aud + '</span></div>';
                }).join('')}
              </div>
            </div>

            <!-- Use Cases Card -->
            <div style="background:#ffffff;border-radius:28px;padding:clamp(2rem,4vw,3.5rem);border:1px solid rgba(2,154,98,0.12);box-shadow:0 20px 60px rgba(0,0,0,0.04);position:relative;overflow:hidden;">
              <div style="position:absolute;bottom:-80px;left:-80px;width:220px;height:220px;background:radial-gradient(circle,rgba(2,154,98,0.06),transparent 70%);pointer-events:none;"></div>
              <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1.75rem;">
                <div style="width:44px;height:44px;border-radius:14px;background:rgba(2,154,98,0.08);display:flex;align-items:center;justify-content:center;">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#029a62" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                </div>
                <div>
                  <span style="font-size:0.7rem;font-weight:800;color:#029a62;letter-spacing:0.12em;text-transform:uppercase;">Applications</span>
                  <h3 style="font-size:1.5rem;font-weight:800;color:#0f211a;margin:0;line-height:1.2;">Use Cases</h3>
                </div>
              </div>
              <div style="display:flex;flex-direction:column;gap:0.85rem;">
                ${item.use_cases.map(function(uc) {
                  return '<div style="display:flex;align-items:flex-start;gap:1rem;padding:1rem 1.25rem;background:#f8fbf9;border:1px solid rgba(2,154,98,0.1);border-left:3px solid #029a62;border-radius:12px;transition:all 0.3s ease;" onmouseover="this.style.background=\'rgba(2,154,98,0.04)\';this.style.boxShadow=\'0 4px 16px rgba(2,154,98,0.08)\'" onmouseout="this.style.background=\'#f8fbf9\';this.style.boxShadow=\'none\'"><div style="width:28px;height:28px;border-radius:50%;background:rgba(2,154,98,0.1);color:#029a62;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div><span style="font-size:0.975rem;font-weight:600;color:#1a3328;line-height:1.45;">' + uc + '</span></div>';
                }).join('')}
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- 7. BENEFITS — Premium Redesign -->
      <section style="padding-block:clamp(90px,12vw,140px);background:#ffffff;position:relative;">
        <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:radial-gradient(ellipse at 70% 0%,rgba(2,154,98,0.04),transparent 55%),radial-gradient(ellipse at 30% 100%,rgba(57,228,154,0.03),transparent 50%);pointer-events:none;"></div>
        <div class="container" style="position:relative;z-index:1;">
          <header class="text-center" style="margin-bottom:clamp(3rem,5vw,4.5rem);">
            <span class="section-label" style="color:#029a62;font-weight:700;letter-spacing:0.12em;">VALUE DELIVERED</span>
            <h2 class="section-heading" style="color:#0f211a;font-size:clamp(2rem,3.5vw,2.8rem);">Key Benefits</h2>
            <p style="color:#4e6057;font-size:1.05rem;max-width:560px;margin:0.75rem auto 0;line-height:1.6;">Tangible outcomes that drive measurable impact across your carbon journey.</p>
          </header>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;">
            ${item.benefits.map(function(b, i) {
              var icons = [
                '<polyline points="20 6 9 17 4 12"/>',
                '<circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>',
                '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>',
                '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
                '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/>',
                '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
                '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
                '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'
              ];
              var iconPath = icons[i % icons.length];
              return '<div style="background:#ffffff;border:1px solid rgba(2,154,98,0.1);border-radius:22px;padding:clamp(1.75rem,3vw,2.5rem);position:relative;overflow:hidden;transition:all 0.4s cubic-bezier(0.25,0.46,0.45,0.94);cursor:default;" onmouseover="this.style.transform=\'translateY(-5px)\';this.style.boxShadow=\'0 20px 50px rgba(2,154,98,0.1)\';this.style.borderColor=\'rgba(2,154,98,0.25)\'" onmouseout="this.style.transform=\'translateY(0)\';this.style.boxShadow=\'none\';this.style.borderColor=\'rgba(2,154,98,0.1)\'">' +
                '<div style="position:absolute;top:-30px;right:-30px;width:100px;height:100px;background:radial-gradient(circle,rgba(2,154,98,0.05),transparent 70%);pointer-events:none;"></div>' +
                '<div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.25rem;">' +
                  '<div style="width:48px;height:48px;border-radius:14px;background:linear-gradient(135deg,rgba(2,154,98,0.12),rgba(57,228,154,0.06));display:flex;align-items:center;justify-content:center;flex-shrink:0;"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#029a62" stroke-width="2">' + iconPath + '</svg></div>' +
                  '<div style="width:28px;height:28px;border-radius:50%;border:2px solid rgba(2,154,98,0.15);display:flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:800;color:#029a62;">' + String(i+1).padStart(2,'0') + '</div>' +
                '</div>' +
                '<p style="font-size:1.05rem;font-weight:700;color:#0f211a;margin:0;line-height:1.4;">' + b + '</p>' +
                '<div style="width:40px;height:3px;border-radius:3px;background:linear-gradient(90deg,#029a62,rgba(2,154,98,0.15));margin-top:1rem;"></div>' +
              '</div>';
            }).join('')}
          </div>
        </div>
      </section>

      <!-- 8. CARBONNXT SUPPORT — Premium Journey Redesign -->
      <section style="padding-block:clamp(90px,12vw,140px);background:linear-gradient(165deg,#04101d 0%,#071e15 50%,#04101d 100%);position:relative;overflow:hidden;">
        <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:radial-gradient(ellipse at 20% 50%,rgba(57,228,154,0.05),transparent 60%),radial-gradient(ellipse at 80% 30%,rgba(2,154,98,0.04),transparent 50%);pointer-events:none;"></div>
        <div class="container" style="position:relative;z-index:1;">
          <header class="text-center" style="margin-bottom:clamp(3rem,6vw,5rem);">
            <span class="section-label" style="color:#39e49a;letter-spacing:0.14em;font-weight:700;">YOUR JOURNEY WITH US</span>
            <h2 class="section-heading" style="color:#fff;font-size:clamp(2rem,3.5vw,2.8rem);">CarbonNxt Support Journey</h2>
            <p style="color:rgba(255,255,255,0.6);font-size:1.05rem;max-width:600px;margin:1rem auto 0;line-height:1.6;">End-to-end guidance at every stage of your carbon project lifecycle.</p>
          </header>

          <!-- Timeline connector line (desktop) -->
          <div style="position:relative;">
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1.5rem;">
              ${item.carbonnxt_support.map(function(sup, i) {
                var title = typeof sup === 'string' ? sup : (sup.title || 'Support');
                var icons = [
                  '<path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 14l2 2 4-4"/>',
                  '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
                  '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
                  '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/>',
                  '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
                  '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
                  '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
                  '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>'
                ];
                var iconPath = icons[i % icons.length];
                return '<div style="background:rgba(255,255,255,0.03);border:1px solid rgba(57,228,154,0.12);border-radius:22px;padding:clamp(1.5rem,3vw,2.25rem);position:relative;transition:all 0.4s cubic-bezier(0.25,0.46,0.45,0.94);cursor:default;" onmouseover="this.style.background=\'rgba(57,228,154,0.06)\';this.style.borderColor=\'rgba(57,228,154,0.35)\';this.style.transform=\'translateY(-6px)\';this.style.boxShadow=\'0 20px 50px rgba(57,228,154,0.1)\'" onmouseout="this.style.background=\'rgba(255,255,255,0.03)\';this.style.borderColor=\'rgba(57,228,154,0.12)\';this.style.transform=\'translateY(0)\';this.style.boxShadow=\'none\'">' +
                  '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.25rem;">' +
                    '<div style="width:48px;height:48px;border-radius:14px;background:linear-gradient(135deg,rgba(57,228,154,0.15),rgba(2,154,98,0.08));display:flex;align-items:center;justify-content:center;"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#39e49a" stroke-width="1.8">' + iconPath + '</svg></div>' +
                    '<div style="width:36px;height:36px;border-radius:50%;border:2px solid rgba(57,228,154,0.2);display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:800;color:#39e49a;letter-spacing:0.02em;">' + String(i+1).padStart(2,'0') + '</div>' +
                  '</div>' +
                  '<h3 style="font-size:1.1rem;font-weight:700;color:#ffffff;margin:0 0 0.5rem 0;line-height:1.35;">' + title + '</h3>' +
                  '<div style="width:40px;height:3px;border-radius:3px;background:linear-gradient(90deg,#39e49a,rgba(57,228,154,0.2));"></div>' +
                '</div>';
              }).join('')}
            </div>
          </div>

          <!-- Bottom CTA row -->
          <div style="text-align:center;margin-top:clamp(3rem,5vw,4rem);">
            <a href="contact.html" class="btn btn-primary" style="padding:1rem 2.5rem;font-size:1rem;"><span>Start Your Journey</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>
          </div>
        </div>
      </section>

      <!-- 9. FAQ -->
      <section class="sol-faq-section">
        <div class="container">
          <header class="text-center"><span class="section-label" style="color:#029a62;font-weight:700;">GOT QUESTIONS?</span><h2 class="section-heading" style="color:#0f211a;">Frequently Asked Questions</h2></header>
          <div class="faq-accordion">
            ${item.faq.map(function(q, i) {
              return '<div class="faq-item ' + (i === 0 ? 'is-open' : '') + '"><button class="faq-toggle" aria-expanded="' + (i === 0 ? 'true' : 'false') + '"><span>' + q.question + '</span><div class="faq-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg></div></button><div class="faq-content"><p>' + q.answer + '</p></div></div>';
            }).join('')}
          </div>
        </div>
      </section>

      <!-- 10. FINAL CTA -->
      <section style="padding-block:clamp(80px,10vw,120px);background:#04101d;color:#fff;text-align:center;">
        <div class="container" style="max-width:800px;">
          <h2 style="font-size:clamp(2.2rem,4vw,3.2rem);font-weight:800;line-height:1.2;margin-bottom:1.25rem;color:#fff;">${item.cta.title}</h2>
          <p style="font-size:1.15rem;line-height:1.65;color:rgba(255,255,255,0.8);margin-bottom:2.5rem;">${item.cta.description}</p>
          <div style="display:flex;justify-content:center;gap:1.25rem;flex-wrap:wrap;">
            <a href="contact.html" class="btn btn-primary" style="padding:1rem 2.25rem;font-size:1rem;"><span>${item.cta.primary_button}</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>
            <a href="seller.html" class="btn btn-outline" style="border-color:rgba(255,255,255,0.3);color:#fff;padding:1rem 2.25rem;font-size:1rem;"><span>${item.cta.secondary_button}</span></a>
          </div>
        </div>
      </section>
    `;

    // FAQ accordion
    container.querySelectorAll('.faq-item').forEach(function (el) {
      el.querySelector('.faq-toggle').addEventListener('click', function () {
        var open = el.classList.contains('is-open');
        container.querySelectorAll('.faq-item').forEach(function (i) { i.classList.remove('is-open'); });
        if (!open) el.classList.add('is-open');
      });
    });
  }

  // ── Init ──
  async function init() {
    var container = document.getElementById('solution-detail-app');
    if (!container) return;

    var slug = getSlug();

    try {
      var data = await loadJSON();
      var solution = data.solutions.find(function (s) { return s.slug === slug || s.id === slug; }) || data.solutions[0];
      render(container, solution);
    } catch (err) {
      console.error('solution-detail.js error:', err);
      container.innerHTML = '<div style="padding:180px 20px;text-align:center;"><h2 style="color:#0f211a;">Could not load solution</h2><p style="color:#4e6057;">Error: ' + err.message + '</p><a href="solutions.html" class="btn btn-primary" style="margin-top:1.5rem;">Back to Solutions</a></div>';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
