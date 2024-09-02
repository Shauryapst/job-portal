import JobCard from "@/components/JobCard";
import { connectDB } from "@/lib/mongoose";
import JobReferral from "@/models/job";
import { PlusSquareOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";
import { Suspense } from "react";

export async function fetchJobs(page: number, limit: number) {
    await connectDB();
    const jobList = await JobReferral.find()
        .populate("createdBy", "email")
        .sort({createdAt : -1})
        .skip((page - 1) * limit)
        .limit(limit) // Limit the number of jobs returned
        .lean();
    return jobList;
}

export default async function AllJobPage() {
    let jobList = await fetchJobs(1, 100);
    return (
        <div className="p-5 flex flex-col h-full">
            <div className="my-5">
                <Link href="/jobs/create">
                    <Button>
                        <PlusSquareOutlined />
                        Create New Job
                    </Button>
                </Link>
            </div>
            <Suspense>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-full">
                    {jobList.map((job) => (
                        <Link href={`/jobs/${job._id}`}>
                            <JobCard job={JSON.stringify(job)} key={job._id} />
                        </Link>
                    ))}
                </div>
            </Suspense>
            {/* <Button loading={false}>Load More</Button> */}
        </div>
    );
}
