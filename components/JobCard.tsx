"use client"
const JobCard = ({ job }: any) => {
    job = JSON.parse(job);
    const { designation, organization, tech_tag, experience, _id } = job
    const createdBy = job?.createdBy?.email;
    
    return (
        <div className="bg-white shadow-md rounded-lg p-6 m-4 hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {designation}
            </h3>
            <p className="text-gray-600 font-medium mb-4">{organization}</p>
            <div className="mb-4 flex gap-x-5">
                <p className="text-gray-700 font-semibold mb-1">Tech Stack:</p>
                <div className="flex flex-wrap">
                    {tech_tag.map((tag: string, index: number) => (
                        <span
                            key={index}
                            className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 mb-2 px-2.5 py-0.5 rounded"
                        >
                            {tag.toUpperCase()}
                        </span>
                    ))}
                </div>
            </div>
            <div className="mb-4 flex gap-5">
                <p className="text-gray-700 font-semibold mb-1">Experience:</p>
                <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">
                    {experience.length > 0
                        ? `${experience[0]} - ${experience[1]} years`
                        : "N/A"}
                </span>
            </div>
            <div className="mb-4 flex gap-5">
                <p className="text-gray-700 font-semibold mb-1">Posted by:</p>
                <span className="text-gray-800">{createdBy}</span>
            </div>
        </div>
    );
};

export default JobCard;
