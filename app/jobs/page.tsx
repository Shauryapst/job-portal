import JobCard from "@/components/JobCard";
import { PlusSquareOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";
import { Suspense } from "react";
import { fetchJobs } from "./utils/jobAction";


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
                        <Link key={job.id} href={`/jobs/${job.id}`}>
                            <JobCard job={JSON.stringify(job)}  />
                        </Link>
                    ))}
                </div>
            </Suspense>
            {/* <Button loading={false}>Load More</Button> */}
        </div>
    );
}
