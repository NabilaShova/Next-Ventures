import { PrismaClient, ProductType } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  { name: "AI Agents", slug: "ai-agents", description: "Intelligent autonomous AI agents", icon: "Bot", order: 1 },
  { name: "SaaS", slug: "saas", description: "Software as a Service platforms", icon: "Cloud", order: 2 },
  { name: "Web Apps", slug: "web-apps", description: "Custom web applications", icon: "Globe", order: 3 },
  { name: "Mobile Apps", slug: "mobile-apps", description: "Native and cross-platform apps", icon: "Smartphone", order: 4 },
  { name: "Automation", slug: "automation", description: "Business process automation", icon: "Zap", order: 5 },
  { name: "Custom Enterprise", slug: "custom-enterprise", description: "Bespoke enterprise solutions", icon: "Building2", order: 6 },
];

const products = [
  {
    name: "AI Customer Support Agent",
    slug: "ai-customer-support-agent",
    tagline: "24/7 intelligent customer support that never sleeps",
    description: "Deploy an AI-powered customer support agent that handles inquiries, resolves issues, and escalates complex cases — reducing support costs by up to 70%.",
    type: ProductType.AI_AGENT,
    featured: true,
    categorySlug: "ai-agents",
    features: [
      { title: "Multi-channel Support", description: "Handle chat, email, and social media from one agent" },
      { title: "Knowledge Base Integration", description: "Automatically learn from your documentation and FAQs" },
      { title: "Smart Escalation", description: "Seamlessly hand off complex issues to human agents" },
      { title: "Sentiment Analysis", description: "Detect customer frustration and prioritize accordingly" },
      { title: "Multi-language", description: "Support customers in 50+ languages automatically" },
    ],
    benefits: [
      { title: "Reduce Support Costs", description: "Automate 80% of tier-1 support tickets", metric: "70%" },
      { title: "Faster Resolution", description: "Average response time under 30 seconds", metric: "<30s" },
      { title: "Higher Satisfaction", description: "Consistent, accurate responses every time", metric: "95%" },
    ],
    integrations: ["Zendesk", "Intercom", "Freshdesk", "Slack", "Shopify", "Salesforce"],
    faqs: [
      { question: "How quickly can we deploy?", answer: "Most enterprises are live within 2 weeks with our guided onboarding process." },
      { question: "Can it integrate with our existing helpdesk?", answer: "Yes, we integrate with all major helpdesk platforms including Zendesk, Intercom, and Freshdesk." },
      { question: "What about data security?", answer: "We're SOC 2 Type II certified with end-to-end encryption and GDPR compliance." },
    ],
    monthlyPrice: 499,
    yearlyPrice: 4990,
  },
  {
    name: "AI Sales Recovery Agent",
    slug: "ai-sales-recovery-agent",
    tagline: "Recover abandoned carts and lost leads automatically",
    description: "An AI agent that identifies at-risk deals, re-engages abandoned carts, and recovers lost revenue through personalized outreach.",
    type: ProductType.AI_AGENT,
    featured: true,
    categorySlug: "ai-agents",
    features: [
      { title: "Cart Recovery", description: "Automated personalized recovery sequences" },
      { title: "Lead Scoring", description: "AI-powered lead prioritization and scoring" },
      { title: "Personalized Outreach", description: "Dynamic messaging based on customer behavior" },
      { title: "Pipeline Analytics", description: "Real-time deal health monitoring" },
      { title: "CRM Sync", description: "Bi-directional sync with Salesforce and HubSpot" },
    ],
    benefits: [
      { title: "Revenue Recovery", description: "Recover up to 35% of abandoned carts", metric: "35%" },
      { title: "Pipeline Velocity", description: "Accelerate deal closure by 40%", metric: "40%" },
      { title: "ROI", description: "Average 8x return on investment", metric: "8x" },
    ],
    integrations: ["Shopify", "WooCommerce", "Salesforce", "HubSpot", "Klaviyo"],
    faqs: [
      { question: "How does cart recovery work?", answer: "Our AI analyzes abandonment patterns and sends personalized recovery messages via email, SMS, and chat at optimal times." },
      { question: "Can it work with our CRM?", answer: "Yes, we offer native integrations with Salesforce, HubSpot, and Pipedrive." },
    ],
    monthlyPrice: 399,
    yearlyPrice: 3990,
  },
  {
    name: "AI Email Campaign Agent",
    slug: "ai-email-campaign-agent",
    tagline: "AI-powered email marketing that writes, sends, and optimizes itself",
    description: "Automate your entire email marketing workflow with an AI agent that creates campaigns, personalizes content, and optimizes send times.",
    type: ProductType.AI_AGENT,
    featured: true,
    categorySlug: "ai-agents",
    features: [
      { title: "AI Copywriting", description: "Generate high-converting email copy automatically" },
      { title: "Send Time Optimization", description: "ML-powered optimal send time per recipient" },
      { title: "A/B Testing", description: "Automated multivariate testing and optimization" },
      { title: "Segmentation", description: "Dynamic audience segmentation based on behavior" },
      { title: "Analytics Dashboard", description: "Real-time campaign performance insights" },
    ],
    benefits: [
      { title: "Higher Open Rates", description: "Increase open rates by up to 45%", metric: "45%" },
      { title: "More Conversions", description: "Boost click-through rates by 60%", metric: "60%" },
      { title: "Time Saved", description: "Reduce campaign creation time by 90%", metric: "90%" },
    ],
    integrations: ["Mailchimp", "Klaviyo", "SendGrid", "HubSpot", "Shopify"],
    faqs: [
      { question: "Does it replace our email platform?", answer: "It works alongside your existing platform or can serve as a standalone solution." },
      { question: "How does AI copywriting work?", answer: "Our AI analyzes your brand voice, past campaigns, and industry benchmarks to generate on-brand copy." },
    ],
    monthlyPrice: 299,
    yearlyPrice: 2990,
  },
  {
    name: "AI Inventory Forecasting Agent",
    slug: "ai-inventory-forecasting-agent",
    tagline: "Predict demand, optimize stock, eliminate waste",
    description: "Machine learning-powered inventory forecasting that predicts demand patterns, optimizes stock levels, and prevents stockouts.",
    type: ProductType.AI_AGENT,
    featured: false,
    categorySlug: "ai-agents",
    features: [
      { title: "Demand Forecasting", description: "ML models predict demand 90 days ahead" },
      { title: "Reorder Automation", description: "Automatic purchase order generation" },
      { title: "Seasonal Analysis", description: "Account for seasonality and trends" },
      { title: "Multi-location", description: "Manage inventory across warehouses" },
      { title: "Supplier Integration", description: "Direct integration with supplier systems" },
    ],
    benefits: [
      { title: "Reduce Stockouts", description: "Decrease stockout incidents by 85%", metric: "85%" },
      { title: "Lower Holding Costs", description: "Reduce excess inventory by 30%", metric: "30%" },
      { title: "Accuracy", description: "95% forecast accuracy rate", metric: "95%" },
    ],
    integrations: ["Shopify", "NetSuite", "SAP", "QuickBooks", "Fishbowl"],
    faqs: [
      { question: "How accurate are the forecasts?", answer: "Our ML models achieve 95% accuracy after 30 days of historical data ingestion." },
      { question: "Can it handle multiple warehouses?", answer: "Yes, we support unlimited warehouse locations with inter-location transfer optimization." },
    ],
    monthlyPrice: 599,
    yearlyPrice: 5990,
  },
  {
    name: "Shopify AI Assistant",
    slug: "shopify-ai-assistant",
    tagline: "Your AI co-pilot for Shopify store management",
    description: "An all-in-one AI assistant for Shopify merchants — manage products, optimize listings, handle customer queries, and boost sales.",
    type: ProductType.SAAS,
    featured: true,
    categorySlug: "saas",
    features: [
      { title: "Product Optimization", description: "AI-generated titles, descriptions, and SEO" },
      { title: "Store Analytics", description: "Actionable insights and recommendations" },
      { title: "Customer Chat", description: "Embedded AI chat widget for your store" },
      { title: "Inventory Alerts", description: "Smart low-stock and reorder notifications" },
      { title: "Marketing Automation", description: "Automated email and social campaigns" },
    ],
    benefits: [
      { title: "Revenue Growth", description: "Average 25% revenue increase", metric: "25%" },
      { title: "Time Saved", description: "Save 20+ hours per week on store management", metric: "20h" },
      { title: "Conversion Rate", description: "Improve conversion rates by 18%", metric: "18%" },
    ],
    integrations: ["Shopify", "Klaviyo", "Google Analytics", "Facebook Ads", "Instagram"],
    faqs: [
      { question: "Is it a Shopify app?", answer: "Yes, it's available on the Shopify App Store with one-click installation." },
      { question: "Does it work with Shopify Plus?", answer: "Absolutely — we have dedicated Shopify Plus features including multi-store management." },
    ],
    monthlyPrice: 199,
    yearlyPrice: 1990,
  },
  {
    name: "AI Analytics Dashboard",
    slug: "ai-analytics-dashboard",
    tagline: "Business intelligence powered by AI insights",
    description: "A comprehensive analytics platform with AI-powered insights, predictive analytics, and automated reporting for data-driven decisions.",
    type: ProductType.SAAS,
    featured: true,
    categorySlug: "saas",
    features: [
      { title: "AI Insights", description: "Automated anomaly detection and trend analysis" },
      { title: "Custom Dashboards", description: "Drag-and-drop dashboard builder" },
      { title: "Predictive Analytics", description: "Forecast revenue, churn, and growth" },
      { title: "Automated Reports", description: "Scheduled reports delivered to stakeholders" },
      { title: "Data Connectors", description: "100+ pre-built data source integrations" },
    ],
    benefits: [
      { title: "Faster Decisions", description: "Reduce reporting time by 80%", metric: "80%" },
      { title: "Revenue Insights", description: "Identify growth opportunities automatically", metric: "3x" },
      { title: "Data Accuracy", description: "99.9% data pipeline reliability", metric: "99.9%" },
    ],
    integrations: ["Google Analytics", "Stripe", "Shopify", "Salesforce", "PostgreSQL", "BigQuery"],
    faqs: [
      { question: "What data sources do you support?", answer: "We support 100+ connectors including databases, SaaS tools, and file uploads." },
      { question: "Can we build custom dashboards?", answer: "Yes, our drag-and-drop builder lets you create unlimited custom dashboards." },
    ],
    monthlyPrice: 349,
    yearlyPrice: 3490,
  },
  {
    name: "AI CRM Assistant",
    slug: "ai-crm-assistant",
    tagline: "Supercharge your CRM with AI automation",
    description: "An intelligent CRM assistant that automates data entry, scores leads, suggests next actions, and keeps your pipeline healthy.",
    type: ProductType.AI_AGENT,
    featured: false,
    categorySlug: "ai-agents",
    features: [
      { title: "Auto Data Entry", description: "Automatically populate CRM fields from emails and calls" },
      { title: "Lead Scoring", description: "AI-powered lead qualification and scoring" },
      { title: "Next Best Action", description: "Intelligent recommendations for each deal" },
      { title: "Meeting Prep", description: "Auto-generated meeting briefs and talking points" },
      { title: "Pipeline Health", description: "Real-time pipeline risk assessment" },
    ],
    benefits: [
      { title: "Sales Productivity", description: "Increase rep productivity by 35%", metric: "35%" },
      { title: "Data Quality", description: "Improve CRM data accuracy by 90%", metric: "90%" },
      { title: "Win Rate", description: "Boost close rates by 22%", metric: "22%" },
    ],
    integrations: ["Salesforce", "HubSpot", "Pipedrive", "Microsoft Dynamics", "Zoho CRM"],
    faqs: [
      { question: "Which CRMs do you support?", answer: "We integrate with Salesforce, HubSpot, Pipedrive, Dynamics 365, and Zoho CRM." },
      { question: "How does auto data entry work?", answer: "Our AI parses emails, calendar events, and call transcripts to automatically update CRM records." },
    ],
    monthlyPrice: 449,
    yearlyPrice: 4490,
  },
  {
    name: "AI Voice Receptionist",
    slug: "ai-voice-receptionist",
    tagline: "Professional AI phone agent for your business",
    description: "A natural-sounding AI voice agent that answers calls, schedules appointments, routes inquiries, and provides 24/7 phone coverage.",
    type: ProductType.AI_AGENT,
    featured: true,
    categorySlug: "ai-agents",
    features: [
      { title: "Natural Voice", description: "Human-like conversational AI with custom voice" },
      { title: "Call Routing", description: "Intelligent call routing and transfer" },
      { title: "Appointment Booking", description: "Schedule appointments directly from calls" },
      { title: "Multi-language", description: "Support callers in 30+ languages" },
      { title: "Call Analytics", description: "Detailed call logs and performance metrics" },
    ],
    benefits: [
      { title: "Never Miss a Call", description: "100% call answer rate, 24/7/365", metric: "100%" },
      { title: "Cost Savings", description: "80% cheaper than human receptionists", metric: "80%" },
      { title: "Customer Satisfaction", description: "4.8/5 average caller satisfaction", metric: "4.8" },
    ],
    integrations: ["Twilio", "RingCentral", "Google Calendar", "Calendly", "Salesforce"],
    faqs: [
      { question: "Does it sound like a real person?", answer: "Yes, our voice AI uses advanced neural TTS that sounds natural and can be customized to match your brand." },
      { question: "Can it handle complex inquiries?", answer: "It handles 85% of calls autonomously and seamlessly transfers complex ones to your team." },
    ],
    monthlyPrice: 299,
    yearlyPrice: 2990,
  },
  {
    name: "AI WhatsApp Business Agent",
    slug: "ai-whatsapp-business-agent",
    tagline: "Automate WhatsApp conversations at scale",
    description: "An AI agent for WhatsApp Business API that handles customer conversations, processes orders, and provides instant support.",
    type: ProductType.AI_AGENT,
    featured: false,
    categorySlug: "ai-agents",
    features: [
      { title: "Conversational AI", description: "Natural language understanding for WhatsApp" },
      { title: "Order Processing", description: "Take orders and payments via WhatsApp" },
      { title: "Broadcast Campaigns", description: "Targeted message broadcasts with AI personalization" },
      { title: "Catalog Integration", description: "Showcase products directly in chat" },
      { title: "Analytics", description: "Conversation analytics and performance tracking" },
    ],
    benefits: [
      { title: "Response Speed", description: "Instant responses, 24/7 availability", metric: "<5s" },
      { title: "Engagement", description: "3x higher engagement than email", metric: "3x" },
      { title: "Conversion", description: "25% higher conversion from WhatsApp leads", metric: "25%" },
    ],
    integrations: ["WhatsApp Business API", "Shopify", "Stripe", "Zapier", "HubSpot"],
    faqs: [
      { question: "Do I need WhatsApp Business API?", answer: "Yes, we help you set up and manage your WhatsApp Business API account." },
      { question: "Can it process payments?", answer: "Yes, we support WhatsApp Pay and Stripe payment integration for in-chat purchases." },
    ],
    monthlyPrice: 249,
    yearlyPrice: 2490,
  },
  {
    name: "AI Appointment Scheduler",
    slug: "ai-appointment-scheduler",
    tagline: "Intelligent scheduling that eliminates no-shows",
    description: "An AI-powered scheduling agent that books appointments, sends reminders, handles rescheduling, and reduces no-shows.",
    type: ProductType.AI_AGENT,
    featured: false,
    categorySlug: "ai-agents",
    features: [
      { title: "Smart Scheduling", description: "AI-optimized time slot recommendations" },
      { title: "Automated Reminders", description: "Multi-channel reminder sequences" },
      { title: "Rescheduling", description: "Self-service rescheduling via chat or voice" },
      { title: "Calendar Sync", description: "Sync with Google, Outlook, and Apple calendars" },
      { title: "No-show Prevention", description: "Predictive no-show detection and prevention" },
    ],
    benefits: [
      { title: "Reduce No-shows", description: "Decrease no-show rates by 60%", metric: "60%" },
      { title: "Booking Efficiency", description: "Reduce scheduling time by 75%", metric: "75%" },
      { title: "Revenue Protection", description: "Recover $50K+ annually in lost appointments", metric: "$50K" },
    ],
    integrations: ["Google Calendar", "Outlook", "Calendly", "Acuity", "Salesforce"],
    faqs: [
      { question: "How does no-show prevention work?", answer: "Our AI analyzes historical patterns to identify high-risk appointments and sends targeted reminder sequences." },
      { question: "Can patients/clients reschedule themselves?", answer: "Yes, via web, chat, SMS, or voice — they can reschedule without staff involvement." },
    ],
    monthlyPrice: 179,
    yearlyPrice: 1790,
  },
];

async function main() {
  console.log("Seeding database...");

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
  }

  for (const product of products) {
    const category = await prisma.category.findUnique({
      where: { slug: product.categorySlug },
    });
    if (!category) continue;

    const { categorySlug, monthlyPrice, yearlyPrice, ...productData } = product;

    const created = await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        ...productData,
        features: product.features,
        benefits: product.benefits,
        integrations: product.integrations,
        faqs: product.faqs,
        categoryId: category.id,
      },
      create: {
        ...productData,
        features: product.features,
        benefits: product.benefits,
        integrations: product.integrations,
        faqs: product.faqs,
        categoryId: category.id,
        imageUrl: `https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop`,
      },
    });

    await prisma.pricingPlan.upsert({
      where: { id: `${created.id}-starter` },
      update: {},
      create: {
        id: `${created.id}-starter`,
        name: "Starter",
        description: "Perfect for small teams getting started",
        monthlyPrice,
        yearlyPrice,
        features: product.features.slice(0, 3).map((f) => f.title),
        trialDays: 14,
        productId: created.id,
      },
    });

    await prisma.pricingPlan.upsert({
      where: { id: `${created.id}-pro` },
      update: {},
      create: {
        id: `${created.id}-pro`,
        name: "Professional",
        description: "For growing businesses with advanced needs",
        monthlyPrice: monthlyPrice * 2,
        yearlyPrice: yearlyPrice * 2,
        features: product.features.map((f) => f.title),
        trialDays: 14,
        isPopular: true,
        productId: created.id,
      },
    });

    await prisma.pricingPlan.upsert({
      where: { id: `${created.id}-enterprise` },
      update: {},
      create: {
        id: `${created.id}-enterprise`,
        name: "Enterprise",
        description: "Custom solutions for large organizations",
        isEnterprise: true,
        features: [...product.features.map((f) => f.title), "Dedicated support", "Custom integrations", "SLA guarantee"],
        productId: created.id,
      },
    });
  }

  const testimonials = [
    { name: "Sarah Chen", role: "CTO", company: "TechFlow Inc.", content: "Next Ventures transformed our customer support. We reduced response times by 90% and our team can focus on complex issues.", rating: 5, featured: true },
    { name: "Marcus Williams", role: "VP of Sales", company: "RetailMax", content: "The AI Sales Recovery Agent recovered $2.3M in abandoned revenue in the first quarter alone. ROI was immediate.", rating: 5, featured: true },
    { name: "Elena Rodriguez", role: "CEO", company: "GrowthLabs", content: "We deployed 5 AI agents across our operations. The efficiency gains are remarkable — we've saved over 10,000 hours annually.", rating: 5, featured: true },
    { name: "James Park", role: "Director of Operations", company: "LogiChain", content: "Inventory forecasting accuracy went from 60% to 95%. We've virtually eliminated stockouts while reducing holding costs.", rating: 5, featured: false },
    { name: "Amanda Foster", role: "CMO", company: "BrandPulse", content: "Our email campaigns now write themselves. Open rates increased 45% and our marketing team focuses on strategy, not execution.", rating: 5, featured: false },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }

  const caseStudies = [
    {
      title: "How TechFlow Reduced Support Costs by 70%",
      slug: "techflow-support-cost-reduction",
      client: "TechFlow Inc.",
      industry: "Technology",
      problem: "TechFlow's customer support team was overwhelmed with 5,000+ daily tickets, leading to 48-hour response times and declining CSAT scores.",
      solution: "Deployed AI Customer Support Agent with knowledge base integration, smart escalation, and multi-channel support across chat, email, and social.",
      implementation: "2-week deployment with phased rollout. Integrated with existing Zendesk instance and trained on 2 years of support history.",
      results: { metrics: [{ label: "Response Time", value: "< 30s", change: "-95%" }, { label: "Cost Reduction", value: "70%", change: "-70%" }, { label: "CSAT Score", value: "4.8/5", change: "+40%" }], highlights: ["80% of tickets resolved autonomously", "Support team refocused on complex issues", "$1.2M annual savings"] },
      revenueIncrease: 15,
      costReduction: 70,
      timeSaved: 15000,
      featured: true,
    },
    {
      title: "RetailMax Recovers $2.3M with AI Sales Agent",
      slug: "retailmax-sales-recovery",
      client: "RetailMax",
      industry: "E-commerce",
      problem: "RetailMax was losing $3M annually to cart abandonment with a 72% abandonment rate and no automated recovery system.",
      solution: "Implemented AI Sales Recovery Agent with personalized outreach, dynamic pricing incentives, and multi-channel recovery sequences.",
      implementation: "Integrated with Shopify and Klaviyo. AI trained on 18 months of purchase and abandonment data.",
      results: { metrics: [{ label: "Cart Recovery", value: "35%", change: "+35%" }, { label: "Revenue Recovered", value: "$2.3M", change: "+$2.3M" }, { label: "ROI", value: "8x", change: "8x" }], highlights: ["35% cart recovery rate", "$2.3M recovered in Q1", "Personalized recovery at scale"] },
      revenueIncrease: 35,
      costReduction: 0,
      timeSaved: 5000,
      featured: true,
    },
  ];

  for (const cs of caseStudies) {
    await prisma.caseStudy.upsert({
      where: { slug: cs.slug },
      update: cs,
      create: { ...cs, results: cs.results },
    });
  }

  const blogPosts = [
    { title: "The Enterprise Guide to AI Agent Deployment", slug: "enterprise-ai-agent-deployment-guide", excerpt: "A comprehensive guide to deploying AI agents in enterprise environments.", content: "Full article content here...", category: "AI", tags: ["AI", "Enterprise", "Deployment"], author: "Next Ventures Team", readingTime: 12, featured: true },
    { title: "5 Ways AI Automation Cuts Business Costs", slug: "ai-automation-cost-reduction", excerpt: "Discover how leading companies use AI automation to dramatically reduce operational costs.", content: "Full article content here...", category: "Automation", tags: ["Automation", "Business", "ROI"], author: "Sarah Chen", readingTime: 8, featured: true },
    { title: "Shopify AI: The Complete Merchant's Guide", slug: "shopify-ai-merchants-guide", excerpt: "Everything Shopify merchants need to know about leveraging AI for growth.", content: "Full article content here...", category: "Ecommerce", tags: ["Shopify", "Ecommerce", "AI"], author: "Marcus Williams", readingTime: 10, featured: false },
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }

  const resources = [
    { title: "AI Agent Deployment Playbook", slug: "ai-agent-deployment-playbook", description: "Step-by-step guide to deploying AI agents in your organization.", type: "playbooks" },
    { title: "Enterprise AI ROI Calculator Template", slug: "enterprise-ai-roi-calculator", description: "Calculate the expected ROI of AI implementation for your business.", type: "templates" },
    { title: "Customer Support AI Prompt Library", slug: "customer-support-prompt-library", description: "50+ proven prompts for AI customer support agents.", type: "prompts" },
    { title: "The State of Enterprise AI 2026", slug: "state-of-enterprise-ai-2026", description: "Comprehensive whitepaper on enterprise AI adoption trends.", type: "whitepapers" },
  ];

  for (const resource of resources) {
    await prisma.resource.upsert({
      where: { slug: resource.slug },
      update: resource,
      create: resource,
    });
  }

  console.log("Seeding complete!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
