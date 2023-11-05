export interface Experience {
  date: string,
  title: string,
  company: string,
  activities: {
    overview: string,
    highlights: string[]
  }
  specialty?: Specialty,
}

export interface Education {
  date: string,
  school: string,
  degree: string,
  details: string
  specialty?: Specialty,
}

export interface Reference {
  name: string,
  org: string,
  email: string
  specialty?: Specialty,
}

export interface Skill {
  class: string,
  skills: {
    title: string,
    score: number
  }[],
  specialty?: Specialty,
}

interface Specialty {
  specialty: "development" | "teaching" | "design" | "it support",
  strength?: 1 | 2 | 3
}