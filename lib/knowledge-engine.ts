import { portfolioData } from "@/data/knowledge/portfolio";
import { servicesData } from "@/data/knowledge/services";
import { industriesData } from "@/data/knowledge/industries";
import { aboutData } from "@/data/knowledge/about";
import { contactData } from "@/data/knowledge/contact";
import { faqData } from "@/data/knowledge/faq";
import { resourcesData } from "@/data/knowledge/resources";

// Match keywords to specific topics
export const keywordMatcher = (normalizedQuery: string): string | null => {
  if (/(project|portfolio|work|case study)/.test(normalizedQuery)) {
    return "Portfolio";
  }
  if (/(service|website|development|offer|build)/.test(normalizedQuery)) {
    return "Services";
  }
  if (/(industry|healthcare|finance|ecommerce|education)/.test(normalizedQuery)) {
    return "Industries";
  }
  if (/(about|company|who are you|team|story|history)/.test(normalizedQuery)) {
    return "About";
  }
  if (/(contact|email|phone|reach|get in touch|support)/.test(normalizedQuery)) {
    return "Contact";
  }
  if (/(faq|question|help|support|timeline|startup)/.test(normalizedQuery)) {
    return "FAQ";
  }
  if (/(resource|guide|whitepaper)/.test(normalizedQuery)) {
    return "Resources";
  }
  
  return null;
};

// Normalize the input query by lowercasing and removing extra spaces/punctuation
export const normalizeQuestion = (query: string): string => {
  return query
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .trim();
};

// Format the response JSON into a readable string/markdown-like structure (or just stringified JSON as requested)
export const responseFormatter = (topic: string, data: any, uiType: string): any => {
  return {
    content: `Here is the ${topic} information:`,
    uiType,
    payload: data,
  };
};

// Main entry point for resolving a query
export const knowledgeResolver = (query: string): any => {
  const normalizedQuery = normalizeQuestion(query);
  const topic = keywordMatcher(normalizedQuery);

  switch (topic) {
    case "Portfolio":
      return responseFormatter("Portfolio", portfolioData, "portfolio-cards");
    case "Services":
      return responseFormatter("Services", servicesData, "services-cards");
    case "Industries":
      return responseFormatter("Industries", industriesData, "industries-cards");
    case "About":
      return responseFormatter("About", aboutData, "about-card");
    case "Contact":
      return responseFormatter("Contact", contactData, "contact-card");
    case "FAQ":
      return responseFormatter("FAQ", faqData, "faq-list");
    case "Resources":
      return responseFormatter("Resources", resourcesData, "resources-list");
    default:
      return {
        content: "I'm still learning! Right now, I can help you with information about our:\n• Projects & Portfolio\n• Services & Offerings\n• Industries We Serve\n• About Our Company\n• Frequently Asked Questions (FAQ)\n• Resources & Guides\n• Contact Information",
        uiType: "text",
        payload: null
      };
  }
};
