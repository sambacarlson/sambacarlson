import { Experience, Footer, Hero, Navbar, Projects } from '@/components/organisms'

export default function Developer() {
  return (
    <main className="flex flex-col justify-between min-h-[100vh] text-black bg-green-50">
      <div className="fixed w-full z-30">
        <Navbar profile={"developer"} />
      </div>
      <div id="about" className="mt-[12vh]"></div>
      <div className="py-3 px-6  md:m-5 md:ml-16">
        <Hero />
      </div>
      <div className="bg-orange-300 grid grid-cols-4 gap-4 px-6 py-6">
        <TechArea icon={''} title={'Languages 1'} description={''} />
        <TechArea icon={''} title={'Languages 2'} description={''} />
        <TechArea icon={''} title={'Frameworks 1'} description={''} />
        <TechArea icon={''} title={'Frameworks 2'} description={''} />
        <TechArea icon={''} title={'Dev tools'} description={''} />
        <TechArea icon={''} title={'Management tools'} description={''} />
      </div>

      <div id="contact" className="">
        <Footer profile={"developer"} />
      </div>
    </main>
  );
}

const TechArea = ({ icon, title, description }: { icon: string, title: string, description: string }) => {
  return (
    <div className="flex flex-col p-2 mobile:p-4 tablet:p-8 desktop:p-10 border border-secondary rounded-lg  min-w-[200px] max-w-[400px]">
      <span className="">{icon}</span>
      <h3 className="font-bold text-lg tablet:text-xl">{title}</h3>
      <p className="">{description}</p>
    </div>
  )
};