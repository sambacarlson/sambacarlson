import { HiOutlineMail } from 'react-icons/hi'
import { SiLinkedin } from 'react-icons/si'
import { PiPhoneCallFill } from 'react-icons/pi'
import { MdLocationOn } from 'react-icons/md'
import Image from 'next/image'


interface Experience {
  date: string,
  title: string,
  company: string,
  activities: {
    overview: string,
    highlights: string[]
  }
}

const myExperience: Experience[] = [
  {
    date: "Nov 2022 - Present",
    title: "Developer",
    company: "Iknite Space",
    activities: {
      overview: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque vero molestiae soluta numquam, dolorem voluptatem.",
      highlights: [
        "The first six months was focused on training, coaching and evalating",
        "The next six months was Internship period",
      ]
    }
  }
]

export default function Resume() {
  const profileText = "Software engineering with 1 year of experience"
  return (
    <main className="flex flex-col items-center text-primary bg-emerald-50 w-full lg:max-w-[1000px] min-h-[1000px] md:mt-[1em] mx-auto md:mb-[8em] shadow-lg ">
      <div className="flex flex-col w-full relative">
        <div className="md:absolute top-[3em] md:mr-4 pt-4 md:pt-0 flex justify-center md:w-[40%] bg-secondary md:bg-transparent" >
          <div className="overflow-hidden bg-stone-600 md:border-[0.4em] border-stone-600 w-[9em] h-[9em] md:h-[10em] md:w-[10em] rounded-full md:rounded-none z-10 ">
            <Image src="/me1.jpg" alt="Samba Carlson" width={350} height={350} className="object-cover h-full transform -scale-x-100" />
          </div>
        </div>
        <div className="flex justify-center bg-secondary w-full h-[8em] border-b-[0.5em] border-b-stone-600">
          <div className="text-white md:absolute left-[40%] top-[3em] flex flex-col items-center md:items-start justify-center md:justify-start">
            <h1 className="text-xl md:text-3xl font-bold">Samba Carlson</h1>
            <h3 className="font-bold text-base md:text-lg tracking-[0.3em]">SOFTWARE DEVELOPER</h3>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-8 md:absolute top-[9em] left-[40%] md:p-0">
          <div className="flex flex-row gap-x-3 col-span-2 md:col-span-1 break-all"><span className="text-secondary pt-[0.4rem]"><HiOutlineMail /></span><p>sambacarlson@gmail.com</p></div>
          <div className="flex flex-row gap-x-3 col-span-2 md:col-span-1"><span className="text-secondary pt-[0.4rem]"><PiPhoneCallFill /></span><p>+237677964952</p></div>
          <div className="flex flex-row gap-x-3 col-span-2 md:col-span-1 break-all"><span className="text-secondary pt-[0.4rem]"><SiLinkedin /></span><p>linkedin.com/in/sambacarlson</p></div>
          <div className="flex flex-row gap-x-3 col-span-2 md:col-span-1"><span className="text-secondary pt-[0.4rem]"><MdLocationOn /></span><p>Molyko Buea</p></div>
        </div>
      </div>
      <div className="grid grid-cols-5 w-full self-center h-full mt-[2em] md:mt-[7em] flex-1">
        <div className="col-span-5 md:col-span-2 w-full flex flex-col p-4 md:p-8 bg-green-100">
          <div className="hidden md:flex flex-col">
            <h3 className="font-bold text-xl text-secondary">Profile</h3>
            <p className="">{profileText}</p>
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-xl text-secondary">Skills</h3>
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-xl text-secondary">Education</h3>
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-xl text-secondary">Refereces</h3>
          </div>
        </div>
        <div className="col-span-5 order-first md:order-last md:col-span-3 w-full py-4 md:py-8 bg-green-200">
          <div className="flex md:hidden flex-col">
            <h3 className="font-bold text-xl text-secondary">Profile</h3>
            <p className="">{profileText}</p>
          </div>
          <h3 className="font-bold text-xl text-secondary">Experience</h3>
          <div className="flex flex-col space-y-4">
            {
              myExperience.map(ex => (
                <Experience key={ex.date} exp={{ date: ex.date, title: ex.title, company: ex.company, activities: { overview: ex.activities.overview, highlights: [...ex.activities.highlights] } }} />
              ))
            }
          </div>
        </div>
      </div>
    </main>
  )
}

const Experience = ({ exp }: { exp: Experience }) => {
  return (
    <div className="grid grid-cols-4 my-2">
      <h4 className="col-span-4 md:col-span-1">{exp.date}</h4>
      <div className="col-span-4 md:col-span-3 flex flex-col">
        <h4 className="font-bold text-lg">{exp.title} <span className="mx-4 md:mx-12">{exp.company}</span></h4>
        <p className="pr-4 md:pr-8 ">{exp.activities.overview}</p>
        <ul className="">
          {exp.activities.highlights.map((item: string) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}