import { EducationType, ExperienceType, LinksType, ReferenceType, SkillType } from "@/types"

export const myProfileText = "Purposeful software developer with a passion for building rubust and efficient applications. Having a firm understanding of fundamental software engineering principles and programming languages such as Python, TypeScript and Go. Having a commended team spirit and commitment to continuous learning and inprovement."
export const myProfileText2 = "Purposeful Associate sales agent with 2+ years of experience delivering quality customer service and building strong client relationships. Having a passion for continuous learning and improving"

export const myExperience: ExperienceType[] = [
  {
    date: "July 2024 - September 2024",
    title: "Manager",
    company: "M & M complex, Biaka Junction Buea",
    activities: {
      overview: "Managing all the day-to-day activities of the carwash center of the complex including inventories, client's invoice, payment of workers.",
      highlights: [
        "Provided all the necessary equipment for carwash workers.",
        "Payed carwash workers either daily or monthly depending on their agreement with the complex",
        "Took advertisement initiatives such as proposing and printing a design for the carwash center."
      ]
    }
  },
  {
    date: "Holidays 2022, 2023, 2024",
    title: "Workshop assistant, seamstress",
    company: "Elearn's Fashion shop",
    activities: {
      overview: "Assisted in all the day to day running of the shop including Attending to client's requests, client measurement data collection, and sales of materials",
      highlights: [
        "Attended to clients to discuss their needs, offer suggestions, on what materials to purchase or designs to choose",
        "Collecting measurement information of clients for all sorts of designs",
      ]
    }
  },
  {
    date: "August 2023 - September 2023",
    title: "Liberian",
    company: "University of Buea",
    activities: {
      overview: "Was actively engaged in Library administration duties involving rearrangement of books, cleaning of bookshelf and assisting students find materials and relevant information regarding the library",
      highlights: [
        "Sorting out Msc thesis' off all faculties according to their years, faculties and focus areas",
        "Assisting non-students of the university with all the necessary requirements for accessing the school Library",
        "Guided students step-by-step through the process of applying for Library clearance"
      ]
    }
  },
  {
    date: "June 2019 - september 2023",
    title: "Sales Agent and Typist",
    company: "Pledge Info Techno Documentation Nkambe",
    activities: {
      overview: "Was actively engaged in the day-to-day operations of the documentation including sales, typing and printing of client's documents",
      highlights: [
        "Typing and editing various kinds of documents",
        "Selling of office accessories such pens, books, papers, envelopes, binders",
      ]
    }
  },

  // {
  //   date: "Mar 2021 - May 2021",
  //   title: "intern",
  //   company: "New Generation Technologies LTD Buea",
  //   activities: {
  //     overview: "Satisfactorily completed a required academic internship at the company, extending  my stay to learn, improve and participate.",
  //     highlights: [
  //       "Exceeded expectations through enthusiastic collaboration with team mates, passionately learning, contributing, asking lots of questions and taking notes",
  //       "Actively participated in the company's training programs for students and pupils such as ICT4kids and Electrolabs training sessions, spearheading hands-on workshops, and inspiring pupils to pursue tech careers",
  //       "Contributed to one of the companies top mobile projects, co-writing the SRS document with other interns, and building the UI for multiple screens using the flutter SDK",
  //     ]
  //   }
  // },
  {
    date: "",
    title: "",
    company: "",
    activities: {
      overview: "",
      highlights: []
    }
  }
]

export const myEducation: EducationType[] = [
  {
    date: "Oct 2019 - Aug 2022",
    school: "University of Buea",
    degree: "BSc in Microbiology",
    details: "Obtained a honorary Bachelor of science in microbiology"
  },
  {
    date: "Sept 2017 - June 2019",
    school: "GBHS Nkambe",
    degree: "BTech Software Eng.",
    details: "Obtained Advanced level GCE certificate in science subjects including Biology and Chemistry"
  }
]

export const myReference: ReferenceType[] = [
  {
    name: "Dr. Tatsinkou Fossi",
    org: "Lecturer. University of Buea",
    email: "+237 676 169 730"
  },
  {
    name: "Mr. Maurice",
    org: "Manager. Pledge Info Techno Nkambe",
    email: "+237 676 628 586"
  }
]

// skill score should be from 1 to 10
export const mySkills: SkillType[] = [
  // {
  //   class: "Programming Languages",
  //   skills: [
  //     {
  //       title: "JavaScript, TypeScript",
  //       score: 7
  //     },
  //     {
  //       title: "Golang",
  //       score: 7
  //     },
  //     {
  //       title: "Python 3",
  //       score: 9
  //     },
  //     // {
  //     //   title: "C",
  //     //   score: 5
  //     // },
  //   ]
  // },
  // {
  //   class: "Frontend Technologies",
  //   skills: [
  //     {
  //       title: "React, Nextjs",
  //       score: 7
  //     },
  //     {
  //       title: "TailwindCSS",
  //       score: 8,
  //     }
  //   ]
  // },
  // {
  //   class: "Backend Technologies",
  //   skills: [
  //     {
  //       title: "Node.js, Express",
  //       score: 5
  //     },
  //     {
  //       title: "Golang, Gin",
  //       score: 7
  //     }
  //   ]
  // },
  // {
  //   class: "Mobile Development",
  //   skills: [
  //     {
  //       title: "React Native",
  //       score: 6
  //     },
  //     // {
  //     //   title: "Flutter",
  //     //   score: 2
  //     // }
  //   ]
  // },
  {
    class: "Soft skills",
    skills: [
      {
        title: "Communication",
        score: 8
      },
      {
        title: "Leadership",
        score: 7
      },
      {
        title: "Teamwork",
        score: 8
      },
      {
        title: "Time management",
        score: 9
      },
      {
        title: "Problem solving",
        score: 7
      },
    ]
  },
  {
    class: "Computing",
    skills: [
      {
        title: "Excel",
        score: 8
      },
      {
        title: "Typing",
        score: 9
      },
      {
        title: "General IT",
        score: 7
      }
    ]
  },

  {
    class: "Languages",
    skills: [
      {
        title: "English",
        score: 10
      },
      {
        title: "French",
        score: 2
      }
    ]
  }
]


export const myLinks: LinksType[] = [
  {
    title: "GitHub",
    ref: "github.com/sambacarlson"
  },
  {
    title: "Portfolio",
    ref: "sambacarlson.vercel.app"
  }
]