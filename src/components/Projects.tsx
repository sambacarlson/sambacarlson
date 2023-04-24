import React from 'react'
import Image from 'next/image'

const Projects = () => {
    return (
        <>
            <div className="space-y-5 md:space-y-0 grid grid-cols-1 md:grid-cols-2 md:gap-8 items-center justify-center">
                <h3 id="projects" className="text-xl font-semibold md:col-span-2">Some of the apps I have built include</h3>
            </div>
            <div className="space-y-5 md:space-y-0 grid grid-reverse grid-cols-1 md:grid-cols-2 md:gap-8 items-center justify-center">
                {/* whoget */}
                <div className="col-span-1">
                    <h3 className="font-semibold">WhoGet platform</h3>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore veritatis quaerat vitae a quas dignissimos veniam molestias illo mollitia sint consequatur distinctio nostrum numquam voluptates, quibusdam velit maxime harum rerum porro ex in ratione expedita aliquid? Ipsa, corporis incidunt sed neque alias ex quaerat tempora, consequuntur totam omnis suscipit voluptatibus non et pariatur maiores aliquam nesciunt culpa esse exercitationem? Dignissimos!</p>
                </div>
                <div className="relative col-span-1 md:order-first flex justify-center items-center">
                    <Image src="/favicon.jpeg" alt='whoget image' width={500} height={500} className="min-w-[200px] max-w-[30vw] max-h-[24vw] transform duration-500 hover:scale-105 object-contain" />
                </div></div>
            {/* iknite-fitness */}
            <div className="space-y-5 md:space-y-0 grid grid-cols-1 md:grid-cols-2 md:gap-8 items-center justify-center">
                <div className="col-span-1">
                    <h3 className="font-semibold">iknite fitness</h3>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore veritatis quaerat vitae a quas dignissimos veniam molestias illo mollitia sint consequatur distinctio nostrum numquam voluptates, quibusdam velit maxime harum rerum porro ex in ratione expedita aliquid? Ipsa, corporis incidunt sed neque alias ex quaerat tempora, consequuntur totam omnis suscipit voluptatibus non et pariatur maiores aliquam nesciunt culpa esse exercitationem? Dignissimos!</p>
                </div>
                <div className="relative col-span-1 md:order-last flex justify-center items-center">
                    <Image src="/favicon.jpeg" alt='whoget image' width={500} height={500} className="min-w-[200px] max-w-[30vw] max-h-[24vw] transform duration-500 hover:scale-105 object-contain" />
                </div></div>
            {/* carltodos */}
            <div className="space-y-5 md:space-y-0 grid grid-cols-1 md:grid-cols-2 md:gap-8 items-center justify-center">
                <div className="col-span-1">
                    <h3 className="font-semibold">carltodos</h3>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore veritatis quaerat vitae a quas dignissimos veniam molestias illo mollitia sint consequatur distinctio nostrum numquam voluptates, quibusdam velit maxime harum rerum porro ex in ratione expedita aliquid? Ipsa, corporis incidunt sed neque alias ex quaerat tempora, consequuntur totam omnis suscipit voluptatibus non et pariatur maiores aliquam nesciunt culpa esse exercitationem? Dignissimos!</p>
                </div>
                <div className="relative col-span-1 md:order-first flex justify-center items-center">
                    <Image src="/favicon.jpeg" alt='whoget image' width={500} height={500} className="min-w-[200px] max-w-[30vw] max-h-[24vw] transform duration-500 hover:scale-105 object-contain" />
                </div></div>
            {/* file manager */}
            <div className="space-y-5 md:space-y-0 grid grid-cols-1 md:grid-cols-2 md:gap-8 items-center justify-center">
                <div className="col-span-1">
                    <h3 className="font-semibold">desktop file manager</h3>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore veritatis quaerat vitae a quas dignissimos veniam molestias illo mollitia sint consequatur distinctio nostrum numquam voluptates, quibusdam velit maxime harum rerum porro ex in ratione expedita aliquid? Ipsa, corporis incidunt sed neque alias ex quaerat tempora, consequuntur totam omnis suscipit voluptatibus non et pariatur maiores aliquam nesciunt culpa esse exercitationem? Dignissimos!</p>
                </div>
                <div className="relative col-span-1 md:order-last flex justify-center items-center">
                    <Image src="/favicon.jpeg" alt='whoget image' width={500} height={500} className="min-w-[200px] max-w-[30vw] max-h-[24vw] transform duration-500 hover:scale-105 object-contain" />
                </div>
            </div>
        </>
    )
}

export default Projects
