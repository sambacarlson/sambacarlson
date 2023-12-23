export interface ExperienceType {
  date: string,
  title: string,
  company: string,
  activities: {
    overview: string,
    highlights: string[]
  }
  specialty?: SpecialtyType,
}

export interface EducationType {
  date: string,
  school: string,
  degree: string,
  details: string
  specialty?: SpecialtyType,
}

export interface ReferenceType {
  name: string,
  org: string,
  email: string
  specialty?: SpecialtyType,
}

export interface SkillType {
  class: string,
  skills: {
    title: string,
    score: number
  }[],
  specialty?: SpecialtyType,
}

interface SpecialtyType {
  specialty: "development" | "teaching" | "design" | "it support",
  strength?: 1 | 2 | 3
}