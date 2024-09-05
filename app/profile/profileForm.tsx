"use client";

import { Form, Input, Button, notification, FloatButton, Typography } from "antd";
import { useState, useEffect } from "react";
import {} from "./page"; // Import the server action
import { updateProfile } from "./utils/profileAction";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";
const {Title} = Typography;

export default function ProfileForm({ user }: any) {
    const [editEnabled, setEditEnabled] = useState(true);
    const [api, contextHolder] = notification.useNotification();

    const onFinish = async (values: any) => {
        try {
            // Directly call the server action (updateProfile) from client-side
            await updateProfile({ ...values, email: user.email });
            setEditEnabled(!editEnabled);
            api.success({
                message: "Success",
                description: "Profile updated successfully.",
            });
        } catch (err) {
            console.error(err);
            api.error({
                message: "Error",
                description: "There was an error updating your profile.",
            });
        }
    };

    useEffect(() => {
        api.info({
            message: "Info",
            description:
                "The data you will submit will help your peers or referrers to connect with you. Thanks.",
        });
    }, []);

    return (
        <div className="w-10/12 text-black rounded-md p-4 bg-slate-100 flex flex-col items-center">
            {contextHolder}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 20px",
                    backgroundColor: "#f5f5f5",
                    borderRadius: "8px",
                }}
            >
                <Title level={3}>Profile Information</Title>
                <FloatButton
                    className="bg-transparent"
                    onClick={() => {
                        setEditEnabled(!editEnabled);
                    }}
                    icon={editEnabled ? <EditOutlined /> : <CloseOutlined />}
                    tooltip={editEnabled ? "Edit Profile" : "Cancel Edit"}
                >
                    
                </FloatButton>
            </div>
            <Form
                labelCol={{ span: 5 }}
                layout="horizontal"
                labelAlign="left"
                initialValues={{ remember: true }}
                disabled={true}
                className="w-full max-w-md"
            >
                <Form.Item name="email" label="Email">
                    <Input placeholder={user.email} disabled />
                </Form.Item>
            </Form>
            <Form
                labelCol={{ span: 5 }}
                layout="horizontal"
                labelAlign="left"
                initialValues={{ remember: true }}
                disabled={editEnabled}
                className="w-full max-w-md"
                onFinish={onFinish}
            >
                <Form.Item name="firstName" label="First Name">
                    <Input
                        placeholder={
                            user?.firstName ? user.firstName : "First Name"
                        }
                    />
                </Form.Item>
                <Form.Item name="lastName" label="Last Name">
                    <Input
                        placeholder={
                            user?.lastName ? user.lastName : "Last Name"
                        }
                    />
                </Form.Item>
                <Form.Item name="phone" label="Phone No.">
                    <Input
                        placeholder={user?.phone ? user.phone : "WhatsApp No."}
                    />
                </Form.Item>
                <Form.Item name="location" label="Address">
                    <Input
                        placeholder={
                            user?.location
                                ? user.location
                                : "Work Location (State)"
                        }
                    />
                </Form.Item>
                <Form.Item
                    name="linkedin"
                    label="LinkedIn"
                    rules={[{ type: "url", warningOnly: true }]}
                >
                    <Input
                        placeholder={
                            user?.linkedin ? user.linkedin : "LinkedIn Url"
                        }
                    />
                </Form.Item>
                <Form.Item
                    name="github"
                    label="GitHub"
                    rules={[{ type: "url", warningOnly: true }]}
                >
                    <Input
                        placeholder={user?.github ? user.github : "GitHub Url"}
                    />
                </Form.Item>
                {<Form.Item name="button">
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>}
            </Form>
        </div>
    );
}
