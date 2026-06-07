import type { NavItem } from "@/types";

export const mainNav: NavItem[] = [
  {
    title: "Solutions",
    href: "/solutions",
    children: [
      { title: "AI Agents", href: "/solutions?category=ai-agents", description: "Intelligent autonomous agents" },
      { title: "SaaS Products", href: "/solutions?category=saas", description: "Ready-to-deploy platforms" },
      { title: "Mobile Apps", href: "/solutions?category=mobile-apps", description: "Native & cross-platform" },
      { title: "Automation", href: "/solutions?category=automation", description: "Workflow automation" },
      { title: "Custom Software", href: "/solutions?category=custom-enterprise", description: "Bespoke enterprise solutions" },
    ],
  },
  { title: "Case Studies", href: "/case-studies" },
  { title: "Pricing", href: "/pricing" },
  {
    title: "Resources",
    href: "/resources",
    children: [
      { title: "Blog", href: "/blog", description: "Insights & updates" },
      { title: "Guides", href: "/resources", description: "Free guides & whitepapers" },
      { title: "Prompt Library", href: "/resources?type=prompts", description: "AI prompt templates" },
    ],
  },
  { title: "About", href: "/about" },
];

export const footerNav = {
  solutions: [
    { title: "AI Agents", href: "/solutions?category=ai-agents" },
    { title: "SaaS Products", href: "/solutions?category=saas" },
    { title: "Mobile Apps", href: "/solutions?category=mobile-apps" },
    { title: "Automation", href: "/solutions?category=automation" },
    { title: "Custom Software", href: "/solutions?category=custom-enterprise" },
  ],
  company: [
    { title: "About", href: "/about" },
    { title: "Case Studies", href: "/case-studies" },
    { title: "Blog", href: "/blog" },
    { title: "Contact", href: "/contact" },
    { title: "Careers", href: "/about#careers" },
  ],
  resources: [
    { title: "Documentation", href: "/resources" },
    { title: "API Reference", href: "/resources?type=api" },
    { title: "Prompt Library", href: "/resources?type=prompts" },
    { title: "Whitepapers", href: "/resources?type=whitepapers" },
    { title: "Templates", href: "/resources?type=templates" },
  ],
  legal: [
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Terms of Service", href: "/terms" },
    { title: "Cookie Policy", href: "/cookies" },
    { title: "Security", href: "/security" },
  ],
};
