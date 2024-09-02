"use client";

import { useEffect, useState } from "react";
import { Button, Card, Spin } from "antd";
import Link from "next/link";
import { getJobData, getLoggedInUser } from "./action";

const JobPage = ({ params }: { params: { jobid: string } }) => {
    const [job, setJob] = useState<any>(null);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchJob = async () => {
            setLoading(true);
            try {
                const jobData = await getJobData(params.jobid);
                const loggedInUser: any = await getLoggedInUser();
                setJob(jobData);
                setUser(loggedInUser);
            } catch (error) {
                console.error("Error fetching job:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchJob();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <Spin size="large" />
            </div>
        );
    }

    if (!job) {
        return <div className="text-center">Job not found</div>;
    }

    const {
        designation,
        organization,
        description,
        tech_tag,
        experience,
        salary,
        jobUrl,
        createdBy,
    } = job;

    return (
        <div className="p-5 max-w-4xl mx-auto">
            <Card title={designation} className="shadow-lg">
                <div className="mt-8 flex justify-between">
                    <Link href="/jobs">
                        <Button type="primary">Back to All Jobs</Button>
                    </Link>
                    <div>
                        {/* {user.email == createdBy.email && <Button type="default" className="mr-3">
                            Edit
                        </Button>} */}
                        <Button type="primary" danger>
                            Apply
                        </Button>
                    </div>
                </div>
                <p className="text-lg font-semibold">{organization}</p>
                <p className="text-sm text-gray-600">
                    Posted by: {createdBy?.email}
                </p>

                <div className="mt-5">
                    <p>
                        <strong>Technologies:</strong> {tech_tag.join(", ")}
                    </p>
                    <p>
                        <strong>Experience:</strong>{" "}
                        {experience.length
                            ? `${experience[0]} - ${experience[1]} years`
                            : "NA"}
                    </p>
                    <p>
                        <strong>Salary:</strong>{" "}
                        {salary.length
                            ? `${salary[0]} - ${salary[1]} LPA`
                            : "NA"}
                    </p>
                    <p>
                        <strong>Job URL:</strong>{" "}
                        <a
                            href={jobUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500"
                        >
                            {jobUrl}
                        </a>
                    </p>
                    <p>
                        <strong>Description:</strong> {description}
                    </p>
                </div>
            </Card>
        </div>
    );
};

export default JobPage;
