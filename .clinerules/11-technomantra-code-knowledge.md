# Technomantra Local Code Knowledge Graph (V4.8.14)

> Structural local index. Read current source before editing. Secrets are intentionally excluded.

- Indexed source files: 35
- Structural edges: 12
- Matched end-to-end flows: 0
- Updated: 2026-08-25T04:53:55.118Z

## Frontend API calls
- API GET /assets/partials/header.html <- assets/js/layout.js
- API GET /assets/partials/footer.html <- assets/js/layout.js

## Dependency edges
- IMPORT about.html -> assets/css/variables.css, assets/css/reset.css, assets/css/base.css, assets/css/components.css, assets/css/animations.css, assets/css/pages.css, assets/css/responsive.css, assets/js/site-config.js
- IMPORT contact.html -> assets/css/variables.css, assets/css/reset.css, assets/css/base.css, assets/css/components.css, assets/css/animations.css, assets/css/pages.css, assets/css/responsive.css, assets/js/site-config.js
- IMPORT insights.html -> assets/css/variables.css, assets/css/reset.css, assets/css/base.css, assets/css/components.css, assets/css/animations.css, assets/css/pages.css, assets/css/responsive.css, assets/js/site-config.js
- IMPORT solutions.html -> assets/css/variables.css, assets/css/reset.css, assets/css/base.css, assets/css/components.css, assets/css/animations.css, assets/css/pages.css, assets/css/responsive.css, assets/js/site-config.js
- IMPORT seller.html -> assets/css/variables.css, assets/css/reset.css, assets/css/base.css, assets/css/components.css, assets/css/animations.css, assets/css/pages.css, assets/css/responsive.css, assets/js/site-config.js
- IMPORT buyer.html -> assets/css/variables.css, assets/css/reset.css, assets/css/base.css, assets/css/components.css, assets/css/animations.css, assets/css/pages.css, assets/css/responsive.css, assets/js/site-config.js
- IMPORT index.html -> assets/css/variables.css, assets/css/reset.css, assets/css/base.css, assets/css/components.css, assets/css/animations.css, assets/css/pages.css, assets/css/responsive.css, assets/js/site-config.js
- IMPORT index-old.html -> assets/css/variables.css, assets/css/reset.css, assets/css/base.css, assets/css/components.css, assets/css/animations.css, assets/css/pages.css, assets/css/responsive.css, assets/js/site-config.js

## Database references
- DB assets/js/insights-data.js -> auditable
- DB assets/js/main.js -> a, our

## Symbols
- SYMBOL assets/js/layout.js: loadPartials, loadScript, dismissLoader, pageExtras, boot
- SYMBOL assets/js/page-loader.js: initPageLoader
- SYMBOL assets/js/animations.js: initHomeAnimations
- SYMBOL assets/js/auth-ui.js: initAuthUI, initPasswordToggle, initLoginForm, initRegisterForm
- SYMBOL assets/js/faq.js: initFAQ, render, filter
- SYMBOL assets/js/forms.js: initForms, getDemoMessage, createNotice, getFormData, validateForm
- SYMBOL assets/js/hero-video.js: initHeroVideo, showFallback, markReady, tryPlay
- SYMBOL assets/js/insight-detail.js: initInsightDetail
- SYMBOL assets/js/insights-data.js: getArticleById, getRelatedArticles
- SYMBOL assets/js/insights.js: initInsights, render, filter
- SYMBOL assets/js/main.js: initMain, initCommandCentre, activateRail, initOnboardingTabs, initCapabilityEcosystem, initAudienceTabs, switchAudience, initEcosystemTabs, initMarketplacePreview, renderHomeProjectCard
- SYMBOL assets/js/marketplace-data.js: getProjectById, getRelatedProjects
- SYMBOL assets/js/marketplace.js: initMarketplace, renderProjects, initFilters, getCompareList, toggleCompare, initCompare, updateCompareDrawer, apply
- SYMBOL assets/js/navigation.js: initNavigation, initDropdowns, closeAll, initMobileNav, close, open
- SYMBOL assets/js/project-detail.js: initProjectDetail
- SYMBOL assets/js/utils.js: reveal, toggle

## UI/style selectors
- UI assets/partials/footer.html: #back-to-top, .site-footer, .container, .site-footer__grid, .site-footer__brand, .site-logo, .site-logo__img, .site-footer__contact, .site-footer__col, .site-footer__bottom, .back-to-top
- UI assets/partials/header.html: #site-header, #nav-toggle, #mobile-nav, .site-header, .container, .site-header__inner, .site-logo, .site-logo__img, .site-nav, .site-nav__list, .site-nav__link, .site-nav__actions, .btn, .btn-primary
- UI about.html: #header-placeholder, #main-content, #about-hero-title, #who-we-are, #who-we-are-title, #mission, #mission-title, #different, #different-title, #what-we-help, #help-title, #project-areas, #areas-title, #trust-integrity
- UI contact.html: #page-loader, #header-placeholder, #main-content, #choose-enquiry, #contact-form-section, #contact-form, #contact-name, #contact-company, #contact-email, #contact-phone, #contact-role, #contact-enquiry-type, #contact-country, #contact-method
- UI insights.html: #page-loader, #header-placeholder, #main-content, #featured-guides, #market-basics, #standards-registries, #project-knowledge, #knowledge-centre, #quick-faq, #footer-placeholder, .skip-link, .page-loader, .page-loader__logo, .page-loader__tagline
- UI solutions.html: #page-loader, #header-placeholder, #main-content, #core-solutions, #digital-mrv, #impact-categories, #methodology-areas, #how-it-connects, #who-its-for, #footer-placeholder, .skip-link, .page-loader, .page-loader__logo, .page-loader__tagline
- UI seller.html: #page-loader, #header-placeholder, #main-content, #developer-guide, #guide-name, #guide-email, #seller-faq, #seller-faq-trigger-1, #seller-faq-panel-1, #seller-faq-trigger-2, #seller-faq-panel-2, #seller-faq-trigger-3, #seller-faq-panel-3, #seller-faq-trigger-4
- UI buyer.html: #page-loader, #header-placeholder, #main-content, #buyers-guide, #guide-name, #guide-email, #buyer-faq-trigger-1, #buyer-faq-panel-1, #buyer-faq-trigger-2, #buyer-faq-panel-2, #buyer-faq-trigger-3, #buyer-faq-panel-3, #buyer-faq-trigger-4, #buyer-faq-panel-4
- UI index.html: #header-placeholder, #main-content, #hero, #hero-video, #hero-fallback, #audience-section, #tab-businesses, #tab-developers, #tab-brokers, #tab-investors, #audience-panel, #audience-panel-img, #audience-panel-content, #audience-panel-label
- UI assets/css/components.css: .btn, .btn-primary, .btn-secondary, .btn-ghost, .btn-sm, .glass-panel, .data-badge, .verification-badge, .demo-badge, .site-header, .site-nav__link, .site-logo__img, .container, .site-header__inner
- UI assets/css/pages.css: .hero--cinematic, .hero__media, .hero__video-wrap, .hero__video, .hero--video, .hero__stars, .hero__canvas, .hero__fallback, .hero__gradient, .hero__gradient--space, .hero__gradient--horizon, .hero__content-wrap, .hero__content--center, .hero__eyebrow
- UI assets/css/animations.css: .animate-fade-up, .animate-float, .animate-pulse, .hero__content, .hero--cinematic, .hero--banner, .trust-strip__item, .trust-strip, .page-transition, .journey-step, .integrity-step, .chart-line, .hero__video-wrap, .hero__fallback
- UI assets/css/base.css: .skip-link, .container, .display-serif, .section, .section-label, .section-heading, .section-intro, .text-green, .text-cyan, .text-muted, .bg-deep, .bg-secondary, .sr-only
- UI assets/css/responsive.css: .site-footer__grid, .marketplace-preview__hero, .marketplace-preview__collage, .marketplace-preview__grid, .tech-board__panel--wide, .tech-board__panel, .pillars-grid, .site-nav, .site-nav__actions, .btn-ghost, .nav-toggle, .hero--cinematic, .hero__headline, .hero--banner
- UI assets/css/variables.css: #ffffff, #f4f8f6, #ebf2ef, #e2eae6
- UI index-old.html: #page-loader, #header-placeholder, #main-content, #hero, #hero-video, #hero-fallback, #diagonalHatch, #about, #ecosystem, #dotPatternTL, #audience-section, #tab-businesses, #tab-developers, #tab-brokers
- UI renewcred-solutions.html: #root
