const FAQ_DATA = [
  { cat: 'General', q: 'What is CarbonNxt?', a: 'CarbonNxt is a next-generation digital carbon trading and environmental asset exchange platform designed to simplify participation in global carbon markets through secure, transparent, and technology-driven infrastructure.' },
  { cat: 'General', q: 'Who can use the platform?', a: 'CarbonNxt is designed for businesses, corporates, carbon project developers, brokers, investors, and other approved carbon-market participants.' },
  { cat: 'General', q: 'Which carbon markets does CarbonNxt support?', a: 'CarbonNxt is designed to support participation in both voluntary and compliance carbon markets, subject to platform availability, regulatory requirements, and registry integration.' },
  { cat: 'Buyers', q: 'How can buyers discover carbon credits?', a: 'Buyers can explore demonstration project listings through structured filters, project information, verification details, and documentation. Live project availability will depend on final platform integration.' },
  { cat: 'Buyers', q: 'What project information will be displayed?', a: 'Project listings include category, region, credit vintage, availability, verification status, methodology overview, documentation references, and environmental impact information where available.' },
  { cat: 'Buyers', q: 'How are transactions recorded?', a: 'CarbonNxt is designed to maintain transaction records, documentation links, and audit trails through a secure digital workflow. Specific features depend on platform integration and configuration.' },
  { cat: 'Buyers', q: 'How is pricing shown?', a: 'Pricing may be displayed as price on request or structured pricing information where available. Pricing is subject to market conditions and project-specific factors.' },
  { cat: 'Project Developers', q: 'How can a project be submitted?', a: 'Project developers can register, create an organization profile, add project information, upload supporting documents, and submit for review through the platform interface.' },
  { cat: 'Project Developers', q: 'What information is required?', a: 'Required information typically includes project details, methodology references, verification records, credit issuance information, and supporting documentation.' },
  { cat: 'Project Developers', q: 'Does every submitted project get listed?', a: 'No. Submitted projects undergo a review process. Only projects meeting platform requirements and applicable standards may be approved for listing.' },
  { cat: 'Project Developers', q: 'How are buyer enquiries managed?', a: 'Approved listings include enquiry management tools allowing project developers to respond to buyer requests for information and pricing.' },
  { cat: 'Standards and Verification', q: 'Why do standards matter?', a: 'Carbon standards define methodologies, validation requirements, and verification processes that underpin credit integrity and market confidence.' },
  { cat: 'Standards and Verification', q: 'How does CarbonNxt support traceability?', a: 'CarbonNxt is designed to connect project information, verification documentation, registry references, transaction records, and portfolio activity through traceable digital workflows.' },
  { cat: 'Standards and Verification', q: 'Will registry references be available?', a: 'Registry references are intended to be supported through integration-ready architecture, subject to platform and regulatory availability.' },
  { cat: 'Standards and Verification', q: 'How can users review documentation?', a: 'Project listings include access to project documentation, verification records, and audit trail information where available and permitted.' },
  { cat: 'Accounts and Security', q: 'How do users register?', a: 'Users can create accounts by selecting their participant type and completing the registration form. Account activation requires backend authentication integration.' },
  { cat: 'Accounts and Security', q: 'Is organization verification required?', a: 'Organization verification may be required for certain platform features and transaction capabilities, depending on platform configuration and regulatory requirements.' },
  { cat: 'Accounts and Security', q: 'How is user information protected?', a: 'CarbonNxt is designed with enterprise-grade security principles including secure authentication and data access controls. Specific security measures depend on final platform implementation.' },
  { cat: 'Accounts and Security', q: 'Can multiple team members use an organization account?', a: 'Organization accounts are designed to support multiple team members with role-based access controls, subject to platform configuration.' },
  { cat: 'Compliance', q: 'Does participation vary by jurisdiction?', a: 'Yes. Market availability, eligibility, and participation requirements may vary by jurisdiction and applicable regulation.' },
  { cat: 'Compliance', q: 'Does CarbonNxt provide legal advice?', a: 'No. CarbonNxt does not provide legal, tax, or investment advice. Users should seek independent professional guidance for regulatory and compliance matters.' },
  { cat: 'Compliance', q: 'Are all carbon credits available in every country?', a: 'No. Credit availability, eligibility, and transfer rules vary by jurisdiction, market type, and applicable regulatory frameworks.' },
]

function initFAQ() {
  const container = Utils.$('#faq-list')
  if (!container) return

  const render = (items) => {
    container.innerHTML = items.map((item, i) => `
      <div class="accordion-item glass-panel" style="padding:0 1.25rem;margin-bottom:0.75rem" data-cat="${item.cat}">
        <button class="accordion-trigger" aria-expanded="false" aria-controls="faq-panel-${i}" id="faq-trigger-${i}">
          ${Utils.escapeHtml(item.q)}
        </button>
        <div class="accordion-panel" id="faq-panel-${i}" role="region" aria-labelledby="faq-trigger-${i}">
          <div class="accordion-panel__inner">
            <div class="accordion-panel__content">${Utils.escapeHtml(item.a)}</div>
          </div>
        </div>
      </div>`).join('')

    Utils.$$('.accordion-trigger', container).forEach((btn) => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.accordion-item')
        const isOpen = item.classList.contains('is-open')
        Utils.$$('.accordion-item', container).forEach((el) => {
          el.classList.remove('is-open')
          Utils.$('.accordion-trigger', el)?.setAttribute('aria-expanded', 'false')
        })
        if (!isOpen) {
          item.classList.add('is-open')
          btn.setAttribute('aria-expanded', 'true')
        }
      })
    })
  }

  render(FAQ_DATA)

  const search = Utils.$('#faq-search')
  const catFilter = Utils.$('#faq-category')

  const filter = () => {
    let items = [...FAQ_DATA]
    const q = search?.value.toLowerCase().trim()
    const cat = catFilter?.value
    if (q) items = items.filter((f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q))
    if (cat) items = items.filter((f) => f.cat === cat)
    render(items)
  }

  search?.addEventListener('input', Utils.debounce(filter, 200))
  catFilter?.addEventListener('change', filter)
}
