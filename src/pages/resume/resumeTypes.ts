export interface Experience {
  date: string,
  title: string,
  company: string,
  activities: {
    overview: string,
    highlights: string[]
  }
}

export interface Education {
  date: string,
  school: string,
  degree: string,
  details: string
}

export interface Reference {
  name: string,
  org: string,
  email: string
}

export interface Skill {
  class: string
  skills: {
    title: string
    score: number
  }[]
}