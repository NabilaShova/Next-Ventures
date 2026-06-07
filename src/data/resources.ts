export type ResourceType =
  | "guides"
  | "whitepapers"
  | "templates"
  | "prompts"
  | "playbooks"
  | "api";

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  downloadUrl?: string;
  fileSize?: string;
  pages?: number;
  featured?: boolean;
  tags: string[];
}

export const resources: Resource[] = [
  {
    id: "enterprise-ai-playbook",
    title: "Enterprise AI Implementation Playbook",
    description:
      "Step-by-step guide to deploying AI agents across your organization with minimal disruption.",
    type: "playbooks",
    fileSize: "4.2 MB",
    pages: 48,
    featured: true,
    tags: ["AI", "Enterprise", "Deployment"],
  },
  {
    id: "roi-calculator-template",
    title: "AI ROI Calculator Template",
    description:
      "Spreadsheet template to calculate projected ROI from AI automation investments.",
    type: "templates",
    fileSize: "1.1 MB",
    featured: true,
    tags: ["ROI", "Finance", "Template"],
  },
  {
    id: "ai-agent-prompt-library",
    title: "AI Agent Prompt Library",
    description:
      "50+ battle-tested prompts for customer support, sales, and operations AI agents.",
    type: "prompts",
    fileSize: "890 KB",
    featured: true,
    tags: ["Prompts", "AI Agents", "Templates"],
  },
  {
    id: "automation-whitepaper",
    title: "The State of Enterprise AI Automation 2026",
    description:
      "Research report on AI adoption trends, benchmarks, and best practices across industries.",
    type: "whitepapers",
    fileSize: "6.8 MB",
    pages: 32,
    tags: ["Research", "Automation", "Trends"],
  },
  {
    id: "integration-guide",
    title: "CRM & ERP Integration Guide",
    description:
      "Technical guide for connecting AI agents with Salesforce, HubSpot, SAP, and more.",
    type: "guides",
    fileSize: "2.4 MB",
    pages: 24,
    tags: ["Integration", "CRM", "Technical"],
  },
  {
    id: "security-compliance-guide",
    title: "AI Security & Compliance Guide",
    description:
      "SOC 2, GDPR, and HIPAA compliance checklist for enterprise AI deployments.",
    type: "guides",
    fileSize: "1.8 MB",
    pages: 18,
    tags: ["Security", "Compliance", "Enterprise"],
  },
  {
    id: "email-campaign-prompts",
    title: "Email Campaign Prompt Pack",
    description: "20 prompts for AI-powered email marketing automation.",
    type: "prompts",
    fileSize: "450 KB",
    tags: ["Email", "Marketing", "Prompts"],
  },
  {
    id: "workflow-templates",
    title: "Business Automation Workflow Templates",
    description: "Pre-built workflow templates for common business processes.",
    type: "templates",
    fileSize: "3.2 MB",
    tags: ["Workflows", "Automation", "Templates"],
  },
];

export const resourceTypes: { value: ResourceType | "all"; label: string }[] = [
  { value: "all", label: "All Resources" },
  { value: "guides", label: "Guides" },
  { value: "whitepapers", label: "Whitepapers" },
  { value: "templates", label: "Templates" },
  { value: "prompts", label: "Prompts" },
  { value: "playbooks", label: "Playbooks" },
];
