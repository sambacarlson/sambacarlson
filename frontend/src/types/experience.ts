export type ExperienceDomain = "development" | "teaching" | "theology";

export interface ExperienceType {
  date: string;
  title: string;
  company: string;
  domain: ExperienceDomain;
  activities: {
    overview: string;
    highlights: string[];
  };
}