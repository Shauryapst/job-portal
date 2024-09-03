"use client";
import {
    Button,
    Checkbox,
    Divider,
    Form,
    Input,
    InputNumber,
    Select,
    Slider,
    notification,
} from "antd";
const { TextArea } = Input;
import { useState } from "react";
import { tech_tags } from "./techlist";
import { createEditJob } from "../utils/jobAction";
import { navigation } from "../utils/jobAction";

export default function JobForm(job : any) {
    
    const [minExp, setMinExp] = useState(job?.experience?.[0] || 1);
    const [maxExp, setMaxExp] = useState(job?.experience?.[1] || 5);
    const [disableExp, setDisableExp] = useState(!!job?.experience?.length);
    const [disableSalary, setDisableSalary] = useState(!!job?.salary?.length);
    const [minSalary, setMinSalary] = useState(job?.salary?.[0] || 10);
    const [maxSalary, setMaxSalary] = useState(job?.salary?.[1] || 20);
    const [api, contextHolder] = notification.useNotification();

    const sliderChange = (newValue: number[]) => {
        setMinExp(newValue[0]);
        setMaxExp(newValue[1]);
    };
    const minChange = (newValue: any) => {
        setMinExp(newValue);
    };
    const maxChange = (newValue: any) => {
        setMaxExp(newValue);
    };

    const sliderSalaryChange = (newValue: number[]) => {
        setMinSalary(newValue[0]);
        setMaxSalary(newValue[1]);
    };
    const minSalaryChange = (newValue: any) => {
        setMinSalary(newValue);
    };
    const maxSalaryChange = (newValue: any) => {
        setMaxSalary(newValue);
    };

    const onFinish = async (values: any) => {
        try {
            const data = { ...values };
            if (!disableExp) {
                data["experience"] = [minExp, maxExp];
            }
            if (!disableExp) {
                data["salary"] = [minSalary, maxSalary];
            }

            await createEditJob({ ...data });
            api.success({
                message: "Success",
                description: "Job created successfully.",
            });
            navigation('/jobs');
        } catch (err) {
            console.error(err);
            api.error({
                message: "Error",
                description: "There was an error while creating Job",
            });
        }
    };

    return (
        <div className="w-4/5 max-w-screen-md">
            {contextHolder}
            <Form
                labelCol={{ span: 6 }}
                layout="horizontal"
                labelAlign="left"
                onFinish={onFinish}
            >
                <Form.Item name="referrerEmail" label="Referrer Email">
                    <Input placeholder={job?.referrerEmail ||  "Referrer Email"} />
                </Form.Item>
                <Divider />
                <Form.Item
                    name="referrerPhoneNumber"
                    label="Referrer PhoneNo."
                    rules={[
                        {
                            pattern: /^\d{10}$/,
                            message:
                                "Please enter a valid 10-digit phone number!",
                        },
                    ]}
                >
                    <Input
                        onChange={(e) => {
                            const value = e.target.value;
                            if (!/^\d*$/.test(value)) {
                                e.target.value = value.slice(0, -1); // Remove the last non-digit character
                            }
                        }}
                        placeholder={job?.referrerPhoneNumber ||"Referrer PhoneNo."}
                    />
                </Form.Item>
                <Divider />
                <Form.Item
                    name="organization"
                    label="Organization"
                    rules={[
                        {
                            required: true,
                            message: "Please input Organization Name!",
                        },
                    ]}
                    required
                >
                    <Input placeholder="Name of Organization that is Hiring" />
                </Form.Item>
                <Divider />
                <Form.Item name="description" label="Description" rules={[
                        {
                            required: true,
                            message: "Please input Description!",
                        },
                    ]} required>
                    <TextArea placeholder="Job Description" />
                </Form.Item>
                <Divider />
                <Form.Item name="designation" label="Designation" rules={[
                        {
                            required: true,
                            message: "Please enter Designation!",
                        },
                    ]} required>
                    <Input placeholder="Designation or Position if for Multiple, then just paste Basic" />
                </Form.Item>
                <Divider />
                <Form.Item
                    name="jobUrl"
                    label="Job Url"
                    rules={[
                        {
                            type: "url",
                            warningOnly: true,
                        },
                        {
                            required: true,
                            message: "Please enter URL/related to job",
                        },
                    ]}
                    required
                >
                    <Input placeholder="Job Url / LinkedIn Url" />
                </Form.Item>
                <Divider />
                <Form.Item name="tech_tag" label="Technologies" rules={[
                        {
                            required: true,
                            message: "Please select atleast 5 Tech!",
                        },
                    ]} required>
                    <Select
                        mode="multiple"
                        allowClear
                        placeholder="Please select"
                        options={tech_tags}
                        maxCount={5}
                    />
                </Form.Item>
                <Divider />
                <Form.Item name="experience" label="Experience">
                    <Checkbox
                        onChange={(e) => {
                            setDisableExp(!disableExp);
                        }}
                    >
                        Experience not known
                    </Checkbox>
                    <Slider
                        step={0.5}
                        range
                        defaultValue={[minExp, maxExp]}
                        min={0}
                        max={20}
                        onChange={sliderChange}
                        value={[minExp, maxExp]}
                        disabled={disableExp}
                    />

                    <div className="flex gap-4">
                        <Form.Item label="Min Experience">
                            <InputNumber
                                step={0.5}
                                defaultValue={minExp}
                                value={minExp}
                                min={0}
                                max={maxExp - 0.5}
                                onChange={minChange}
                                disabled={disableExp}
                            />
                        </Form.Item>
                        <Form.Item label="Max Experience">
                            <InputNumber
                                defaultValue={maxExp}
                                value={maxExp}
                                min={minExp + 0.5}
                                max={20}
                                step={0.5}
                                onChange={maxChange}
                                disabled={disableExp}
                            />
                        </Form.Item>
                    </div>
                </Form.Item>
                <Divider />
                <Form.Item name="salary" label="Salary(LPA)">
                    <Checkbox
                        onChange={(e) => {
                            setDisableSalary(!disableSalary);
                        }}
                    >
                        Salary not known
                    </Checkbox>
                    <Slider
                        step={5}
                        range
                        defaultValue={[minSalary, minSalary]}
                        min={5}
                        max={100}
                        onChange={sliderSalaryChange}
                        value={[minSalary, maxSalary]}
                        disabled={disableSalary}
                    />
                    <div className="flex gap-4">
                        <Form.Item label="From">
                            <InputNumber
                                step={5}
                                defaultValue={minSalary}
                                value={minSalary}
                                min={0}
                                max={maxSalary}
                                onChange={minSalaryChange}
                                disabled={disableSalary}
                            />
                        </Form.Item>
                        <Form.Item label="To">
                            <InputNumber
                                defaultValue={maxSalary}
                                value={maxSalary}
                                min={minSalary}
                                max={100}
                                step={5}
                                onChange={maxSalaryChange}
                                disabled={disableSalary}
                            />
                        </Form.Item>
                    </div>
                </Form.Item>
                <Divider />
                <Form.Item name="images" label="Images">
                    <Input
                        disabled={true}
                        placeholder="Will Add the Function"
                    />
                </Form.Item>
                <Divider />
                <Form.Item name="submitButton">
                    
                    <Button htmlType="submit" type="primary">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
