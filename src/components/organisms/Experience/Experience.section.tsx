import React from 'react'

const Experience = () => {
    return (
        <div className="grid grid-cols-3">
            <div className="col-span-3 md:col-span-1">
                <h3 className="text-xl font-semibold mb-5 md:mr-5 border-b border-primary">My Experience</h3>
            </div>
            <div className="col-span-3 md:col-span-2 flex flex-col space-y-2 pb-3">
                {/* intern iknite */}
                <div className="flex flex-col space-y-2 pb-3 border-b border-primary">
                    <h4 className="text-xl font-bold">Intern --&gt; iknite.space</h4>
                    <p>November 2022 - present</p>
                    <ul className="list-disc list-inside">
                        <li>contributed to premium projects</li>
                        <li>implemented projects in react native</li>
                    </ul>
                </div>
                {/* Lecturer */}
                <div className="flex flex-col space-y-2 py-3 border-b border-primary">
                    <h4 className="text-xl font-bold">Lecturer --&gt; TRUSTECT Higher institute Buea</h4>
                    <p> October 2021 - present</p>
                    <ul className="list-disc list-inside">
                        <li>Taught Eng. Mathematics, Graphic Design</li>
                        <li>Superviced students final year projects</li>
                    </ul>
                </div>
                {/* Intern NGT */}
                <div className="flex flex-col space-y-2 py-3">
                    <h4 className="text-xl font-bold">Intern --&gt; New Generation Technologies Buea</h4>
                    <p> March 2021 - June 2021</p>
                    <ul className="list-disc list-inside">
                        <li>Worked on </li>
                        <li>Superviced students final year projects</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Experience
