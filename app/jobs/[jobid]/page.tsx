"use client";

import { useEffect, useState } from "react";
import { Button, Card, Dropdown, Image, Spin, Menu } from "antd";
import Link from "next/link";
import { getJobData, getLoggedInUser } from "./action";
import { MailOutlined, WhatsAppOutlined } from "@ant-design/icons";

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
    }, [params.jobid]);

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
        relatedImg,
        referrerPhoneNumber,
        referrerEmail,
    } = job;

    const message = `Hi,\nI saw your post about available jobs at ${organization}.\nCould you please give me a referral?\nThank you!`;

    const items = [
        {
            key: "1",
            label: (
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://wa.me/${referrerPhoneNumber}?text=${encodeURIComponent(message)}`}
                >
                    <WhatsAppOutlined /> WhatsApp Referrer
                </a>
            ),
            disabled: !referrerPhoneNumber,
        },
        {
            key: "2",
            label: (
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://wa.me/${job?.createdBy?.phone}?text=${encodeURIComponent(message)}`}
                >
                    <WhatsAppOutlined /> WhatsApp Poster
                </a>
            ),
            disabled: !job?.createdBy?.phone,
        },
        {
            key: "3",
            label: (
                <a
                    href={`mailto:${referrerEmail}?subject=Request%20for%20Referral&body=Hi,%20I%20saw%20your%20post%20about%20available%20jobs%20at%20${encodeURIComponent(organization)}.%20Could%20you%20please%20give%20me%20a%20referral%3F%0D%0A%0D%0AThank%20you%21`}
                >
                    <MailOutlined /> Email Referrer
                </a>
            ),
            disabled: !referrerEmail,
        },
        {
            key: "4",
            label: (
                <a
                    href={`mailto:${user?.email}?subject=Request%20for%20Referral&body=Hi,%20I%20saw%20your%20post%20about%20available%20jobs%20at%20${encodeURIComponent(organization)}.%20Could%20you%20please%20give%20me%20a%20referral%3F%0D%0A%0D%0AThank%20you%21`}
                >
                    <MailOutlined /> Email Poster
                </a>
            ),
            disabled: !user?.email,
        },
    ];

    return (
        <div className="p-5 max-w-4xl mx-auto">
            <Card title={designation} className="shadow-lg">
                <div className="mt-8 flex justify-between">
                    <Link href="/jobs">
                        <Button type="primary">Back to All Jobs</Button>
                    </Link>
                    <div>
                        <Dropdown
                            overlay={<Menu items={items} />}
                            trigger={["click"]}
                        >
                            <Button type="primary">Apply</Button>
                        </Dropdown>
                    </div>
                </div>
                <p className="text-lg font-semibold">{organization}</p>
                <p className="text-sm text-gray-600">
                    Posted by: {createdBy?.email}
                </p>
                {referrerPhoneNumber && (
                    <p className="text-sm text-gray-600">
                        Referrer Phone Number: {referrerPhoneNumber}
                    </p>
                )}
                {referrerEmail && (
                    <p className="text-sm text-gray-600">
                        Referrer Email: {referrerEmail}
                    </p>
                )}

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
                    <>
                        {relatedImg &&
                            relatedImg.map((url: string) => (
                                <Image key={url} width={200} src={url} />
                            ))}
                    </>
                </div>
            </Card>
        </div>
    );
};

export default JobPage;
