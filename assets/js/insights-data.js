const INSIGHTS_ARTICLES = [
  {
    id: 'understanding-carbon-credits',
    slug: 'understanding-carbon-credits',
    title: 'Understanding Carbon Credits',
    category: 'Carbon Market Fundamentals',
    status: 'Demonstration Article',
    summary: 'An introduction to what carbon credits are, how they are created, and why they matter in climate action strategies.',
    readingTime: '6 min read',
    image: 'assets/images/insights/insight-credits.jpg',
    featured: true,
    isDemo: true,
    sections: [
      { heading: 'What Are Carbon Credits?', content: 'Carbon credits represent a measurable reduction, removal, or avoidance of greenhouse gas emissions. Each credit typically corresponds to one metric tonne of carbon dioxide equivalent (tCO₂e). They are issued following defined methodologies and verification processes within carbon market frameworks.' },
      { heading: 'How Credits Are Created', content: 'Carbon projects implement activities that reduce or remove emissions. After validation and verification against recognized standards, credits may be issued and made available for transfer in voluntary or compliance markets, subject to applicable rules and registry systems.' },
      { heading: 'Why Organizations Use Credits', content: 'Businesses and institutions may use carbon credits as part of broader sustainability, ESG, and net-zero strategies. Credits can complement direct emissions reductions but should be evaluated alongside organizational decarbonization plans.' },
    ],
    takeaways: [
      'Carbon credits represent verified emission reductions or removals.',
      'Credits are created through defined project methodologies and verification.',
      'Credits support—but do not replace—direct emissions reduction efforts.',
    ],
    relatedIds: ['voluntary-vs-compliance', 'traceability-matters'],
  },
  {
    id: 'voluntary-vs-compliance',
    slug: 'voluntary-vs-compliance-carbon-markets',
    title: 'Voluntary vs Compliance Carbon Markets',
    category: 'Carbon Market Fundamentals',
    status: 'Demonstration Article',
    summary: 'Understanding the differences between voluntary and compliance carbon markets and how organizations may participate.',
    readingTime: '7 min read',
    image: 'assets/images/insights/insight-markets.jpg',
    featured: false,
    isDemo: true,
    sections: [
      { heading: 'Voluntary Carbon Markets', content: 'Voluntary markets enable organizations to purchase carbon credits to support sustainability goals, ESG commitments, and climate-action programmes outside mandatory regulatory requirements.' },
      { heading: 'Compliance Carbon Markets', content: 'Compliance markets operate under regulatory frameworks where eligible entities must meet emissions obligations. Participation requirements, credit eligibility, and market rules vary by jurisdiction.' },
      { heading: 'Platform Considerations', content: 'Digital platforms like CarbonNxt are designed to support transparent participation across both market types, subject to platform availability, regulatory requirements, and registry integration.' },
    ],
    takeaways: [
      'Voluntary markets support organizational sustainability initiatives.',
      'Compliance markets operate under regulatory frameworks.',
      'Participation requirements vary by jurisdiction and market type.',
    ],
    relatedIds: ['understanding-carbon-credits', 'technology-in-carbon-markets'],
  },
  {
    id: 'traceability-matters',
    slug: 'why-traceability-matters',
    title: 'Why Traceability Matters',
    category: 'Standards and Verification',
    status: 'Demonstration Article',
    summary: 'How traceability supports integrity, compliance, and confidence in carbon credit transactions.',
    readingTime: '5 min read',
    image: 'assets/images/insights/insight-traceability.jpg',
    featured: false,
    isDemo: true,
    sections: [
      { heading: 'The Traceability Challenge', content: 'Carbon markets involve multiple stakeholders, documentation requirements, and registry systems. Without clear traceability, it becomes difficult to verify credit origins, ownership, and transaction history.' },
      { heading: 'Digital Traceability', content: 'Technology-driven platforms can connect project information, verification records, registry references, and transaction data into auditable digital workflows—supporting transparency at every stage.' },
      { heading: 'Benefits for Market Participants', content: 'Buyers gain confidence in credit integrity. Project developers maintain clear records. Investors and auditors can access documentation supporting due diligence and reporting requirements.' },
    ],
    takeaways: [
      'Traceability connects projects, credits, and transactions.',
      'Digital workflows support audit-ready documentation.',
      'Transparency builds confidence across market participants.',
    ],
    relatedIds: ['how-projects-verified', 'understanding-carbon-credits'],
  },
  {
    id: 'how-projects-verified',
    slug: 'how-carbon-projects-are-verified',
    title: 'How Carbon Projects Are Verified',
    category: 'Standards and Verification',
    status: 'Demonstration Article',
    summary: 'An overview of the validation and verification process that underpins carbon credit integrity.',
    readingTime: '8 min read',
    image: 'assets/images/insights/insight-verification.jpg',
    featured: false,
    isDemo: true,
    sections: [
      { heading: 'Validation', content: 'Before a project begins generating credits, its design is reviewed against applicable methodologies and standards. Validation confirms the project plan meets defined requirements.' },
      { heading: 'Verification', content: 'Independent verification assesses whether emission reductions or removals have occurred as claimed. Verification reports form the basis for credit issuance through registry systems.' },
      { heading: 'Ongoing Monitoring', content: 'Projects typically require periodic monitoring and re-verification to ensure continued compliance with methodology requirements and accurate credit quantification.' },
    ],
    takeaways: [
      'Validation reviews project design before credit generation.',
      'Verification confirms actual emission reductions or removals.',
      'Ongoing monitoring ensures continued project integrity.',
    ],
    relatedIds: ['traceability-matters', 'technology-in-carbon-markets'],
  },
  {
    id: 'technology-in-carbon-markets',
    slug: 'role-of-technology-in-carbon-markets',
    title: 'The Role of Technology in Carbon Markets',
    category: 'Technology and Innovation',
    status: 'Demonstration Article',
    summary: 'How digital infrastructure, analytics, and AI can bring clarity and efficiency to carbon market participation.',
    readingTime: '6 min read',
    image: 'assets/images/insights/insight-technology.jpg',
    featured: false,
    isDemo: true,
    sections: [
      { heading: 'Market Information Access', content: 'Digital platforms aggregate project information, documentation, and market data—making it easier for participants to discover and evaluate carbon credit opportunities.' },
      { heading: 'Analytics and Intelligence', content: 'Pricing analytics, portfolio visibility, and market intelligence tools help organizations make informed decisions based on structured data rather than fragmented information sources.' },
      { heading: 'Transaction Infrastructure', content: 'Secure digital workflows support transparent transactions, document management, and audit trails—connecting all stages of the carbon credit lifecycle.' },
    ],
    takeaways: [
      'Technology improves access to market information.',
      'Analytics support informed decision-making.',
      'Digital infrastructure enables transparent transactions.',
    ],
    relatedIds: ['voluntary-vs-compliance', 'how-projects-verified'],
  },
]

function getArticleById(id) {
  return INSIGHTS_ARTICLES.find((a) => a.id === id)
}

function getRelatedArticles(ids) {
  return ids.map((id) => getArticleById(id)).filter(Boolean)
}

const INSIGHT_CATEGORIES = [
  'Carbon Market Fundamentals',
  'Market Updates',
  'Project Development',
  'Standards and Verification',
  'Corporate Sustainability',
  'Technology and Innovation',
  'Compliance and Regulation',
  'Carbon Pricing',
]
