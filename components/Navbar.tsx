import React from "react";
import Link from "next/link";
import { Menu, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { auth } from "@/auth";

const navitems = [
    {
        key: "dashboard",
        label: <Link href="/">Dashboard</Link>,
    },
    {
        label: "Jobs",
        key: "jobs",
        children: [
            { type: "group", label: <Link href="/jobs">All Jobs</Link> },
            {
                type: "group",
                label: <Link href="/jobs?applied=true">Applied Jobs</Link>,
            },
        ],
    },
    {
        label: "Referrals",
        key: "referrals",
        children: [
            {
                type: "group",
                label: <Link href="/referrals">All Referrals</Link>,
            },
            {
                type: "group",
                label: (
                    <Link href="/referrals?applied=true">
                        Applied Referrals
                    </Link>
                ),
            },
        ],
    },
];

export default async function Navbar() {
    const session = await auth();

    return (
        <>
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={["2"]}
                items={navitems}
                style={{
                    flex: 1,
                    minWidth: 0,
                }}
            />

            {session && (
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={["2"]}
                    items={[
                        {
                            label: <Avatar icon={<UserOutlined />} />,
                            key: "profile",
                            children: [
                                {
                                    type: "group",

                                    label: <Link href="/profile">Profile</Link>,
                                },
                                {
                                    type: "group",
                                    label: (
                                        <Link href="/signout">Sign Out</Link>
                                    ),
                                },
                            ],
                        },
                    ]}
                />
            )}

            {/* <Badge count={5}>
                {" "}
                <BellFilled
                    style={{
                        fontSize: 16,
                    }}
                />
            </Badge> */}
        </>
    );
}
