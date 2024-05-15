import { Experience, Footer, Hero, Navbar, Projects } from '@/components/organisms'

export default function Developer() {
  return (
    <main className="flex flex-col justify-between min-h-[100vh] text-black bg-green-50">
      <div className="fixed w-full z-30">
        <Navbar profile={"developer"} />
      </div>
      <div id="about" className="mt-[12vh]"></div>
      <div className="p-3 md:m-5 md:ml-16">
        <Hero />
      </div>
      {/* Languages and technologies */}
      {/* <div className="bg-white p-3 md:py-5 md:p-10 md:pl-16 space-y-5 md:space-y-0 flex flex-col md:flex-row md:space-x-8 items-start justify-center border-y border-secondary border-opacity-10">
        <div className="md:flex-1">
          <h3 className="text-xl font-semibold">
            Technologies I have been working on include
          </h3>
          <ul className="list-disc list-inside">
            <li>NextJs, React</li>
            <li>React Native</li>
            <li>NodeJs, Express</li>
            <li>Qt with python (pyQt5)</li>
            <li>MongoDB, Mongoose</li>
            <li>Tensorflow</li>
          </ul>
        </div>
        <div className="md:flex-1">
          <h3 className="text-xl font-semibold">
            Programming languages I spend most of my time on include
          </h3>
          <ul className="list-disc list-inside">
            <li>JavaScript (ES6)</li>
            <li>Python 3</li>
            <li>TypeScript</li>
            <li>C, Go, R</li>
          </ul>
        </div>
      </div> */}
      {/* projects */}
      {/* <div
        id="projects"
        className="p-3 md:py-5 md:p-10 md:pl-16 flex flex-col space-y-7 md:space-y-24"
      >
        <Projects />
      </div> */}
      {/* <div
        id="experience"
        className="bg-white p-3 md:py-5 md:p-10 md:pl-16 flex flex-col space-y-7 md:space-y-24 border-y border-secondary border-opacity-10"
      >
        <Experience />
      </div> */}

      <div id="contact" className="">
        <Footer profile={"developer"} />
      </div>
    </main>
  );
}
