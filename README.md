# CarbonNxt Static Website

Next-generation digital carbon credit exchange marketing site — static HTML, CSS, and vanilla JavaScript.

**Live domain (planned):** [carbonnxt.com](https://carbonnxt.com)  
**Contact:** info@carbonnxt.com · 9898226312 · Ahmedabad, Gujarat

---

## Overview

CarbonNxt is a static website showcasing a carbon credit marketplace platform. It includes marketplace discovery, solution pages, insights, FAQ, contact forms, and auth UI shells. Backend integration (forms, authentication, live marketplace data) is not yet connected — demo data and placeholder endpoints are used throughout.

## Tech Stack

- **HTML5** — Semantic markup, accessibility (skip links, ARIA, landmarks)
- **CSS** — Custom properties, mobile-first responsive design, glass-panel UI, native smooth scroll (`scroll-behavior: smooth`), pure CSS keyframes & transitions
- **JavaScript** — Pure Vanilla ES6+, zero heavy external dependencies (native IntersectionObserver for scroll reveals)
- **Partials:** Header/footer loaded via `fetch()` (requires local server)

## Project Structure

```
carbonnxt/
├── index.html                 # Homepage
├── about.html                 # Mission, vision, approach
├── marketplace.html           # Project search, filters, compare
├── project-detail.html        # Dynamic project page (?id=)
├── buy-carbon-credits.html    # Buyer solutions
├── list-carbon-credits.html   # Seller / listing info
├── project-developers.html    # Developer solutions
├── corporates-investors.html  # Corporate & investor solutions
├── technology.html            # Platform technology
├── standards-registries.html  # Standards & registry approach
├── compliance-security.html   # Verification & security
├── portfolio-management.html  # Portfolio dashboard demo
├── insights.html              # Article listing
├── insight-detail.html        # Dynamic article (?id=)
├── faq.html                   # Searchable FAQ
├── contact.html               # Contact form
├── login.html                 # Auth UI (noindex)
├── register.html              # Multi-step registration (noindex)
├── privacy-policy.html        # Draft legal — requires legal review
├── terms.html                 # Draft legal
├── cookie-policy.html
├── risk-disclaimer.html
├── coming-soon.html           # Standalone landing (no header/footer)
├── 404.html                   # Standalone error page
├── robots.txt
├── sitemap.xml
└── assets/
    ├── css/                   # 7 stylesheets (variables → responsive)
    ├── js/                    # Site config, utils, page scripts
    ├── partials/              # header.html, footer.html
    ├── icons/                 # favicon.svg
    └── images/                # Placeholders + README for client assets
```

## Local Development

Static files must be served over HTTP for partial loading (`fetch`).

### Python

```bash
cd carbonnxt
python -m http.server 8080
```

Open [http://localhost:8080](http://localhost:8080)

### Node.js (npx)

```bash
npx serve .
```

### VS Code / Cursor

Use the **Live Server** extension and open `index.html`.

## Configuration

Edit `assets/js/site-config.js`:

```javascript
const SITE_CONFIG = {
  companyName: 'CarbonNxt',
  email: 'info@carbonnxt.com',
  phone: '9898226312',
  demoMode: true,
  endpoints: {
    contact: '',      // POST endpoint for contact form
    newsletter: '',   // POST endpoint for newsletter
    registration: '', // Auth API
    login: '',        // Auth API
  },
}
```

When `endpoints` are empty, forms display demo messages instead of submitting.

## Demonstration Data

- Marketplace projects: `assets/js/marketplace-data.js`
- Insights articles: `assets/js/insights-data.js`
- FAQ content: `assets/js/faq.js`

All demo content is labeled **Demonstration Data** or **Demonstration Article** in the UI. No fake statistics, testimonials, or social links are used.

## Page Scripts

| Page | Additional scripts |
|------|-------------------|
| `marketplace.html` | `marketplace-data.js`, `marketplace.js` |
| `project-detail.html` | `marketplace-data.js`, `marketplace.js`, `project-detail.js` |
| `insights.html` | `insights-data.js`, `insights.js` |
| `insight-detail.html` | `insights-data.js`, `insight-detail.js` |
| `faq.html` | `faq.js` |
| `login.html`, `register.html` | `auth-ui.js` (standalone, no partials) |

All other pages load `main.js` after header/footer partials.

## SEO

- Canonical URLs and Open Graph tags on public pages
- `login.html`, `register.html`, `coming-soon.html` — `noindex`
- `robots.txt` disallows auth pages
- `sitemap.xml` lists all public pages (excludes login/register)
- Organization JSON-LD on main pages

## Deployment

1. Upload all files to static hosting (Netlify, Vercel, S3+CloudFront, GitHub Pages, etc.)
2. Configure `404.html` as the host's error page
3. Point `carbonnxt.com` DNS to the host
4. Connect form endpoints in `site-config.js`
5. Replace demonstration images per `assets/images/README.md`
6. Complete legal review of privacy policy, terms, and cookie policy
7. Obtain client approval for vision statement (see HTML comment in `about.html`)

## Legal & Compliance Notes

- Privacy policy, terms, and cookie policy are **drafts** — legal counsel review required
- Risk disclaimer clarifies carbon market risks; not investment advice
- No fake registry logos on standards page

## Browser Support

Modern evergreen browsers (Chrome, Firefox, Safari, Edge). Respects `prefers-reduced-motion`. Three.js hero degrades to SVG fallback on unsupported devices.

## License

Proprietary — CarbonNxt. All rights reserved.
