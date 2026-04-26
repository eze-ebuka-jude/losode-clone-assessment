"use client";

import React from "react";
import { Form, Input, Button, Modal, Spin } from "antd";
import {
    EnvironmentOutlined,
    PhoneOutlined,
    ClockCircleOutlined,
    CheckCircleOutlined,
} from "@ant-design/icons";

interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const Contact = () => {
    const [form] = Form.useForm<ContactFormData>();
    const [isLoading, setIsLoading] = React.useState(false);
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [allFieldsFilled, setAllFieldsFilled] = React.useState(false);

    const handleFormChange = () => {
        const values = form.getFieldsValue();
        const filled = Boolean(
            values.name &&
            values.email &&
            values.subject &&
            values.message &&
            Object.values(values).every((val) => val?.toString().trim() !== "")
        );
        setAllFieldsFilled(filled);
    };

    const handleSubmit = async (values: ContactFormData) => {
        setIsLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));

            console.log("Form submitted with data:", values);

            setIsModalVisible(true);

            form.resetFields();
            setAllFieldsFilled(false);
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    return (
        <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                        Get in touch with us
                    </h1>
                    <p className="text-lg text-gray-600">
                        We&apos;d love to hear from you. Send us a message and we&apos;ll respond as
                        soon as possible.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                            <div className="flex items-start gap-4">
                                <div className="text-2xl text-blue-600 mt-1">
                                    <EnvironmentOutlined />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        Address
                                    </h3>
                                    <p className="text-gray-600">
                                        400 University Drive Suite 200 Coral
                                        <br />
                                        Gables, FL 33134 USA
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                            <div className="flex items-start gap-4">
                                <div className="text-2xl text-green-600 mt-1">
                                    <PhoneOutlined />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        Phone Numbers
                                    </h3>
                                    <p className="text-gray-600">
                                        +234 (0) 123 456 7890
                                        <br />
                                        +234 (0) 987 654 3210
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                            <div className="flex items-start gap-4">
                                <div className="text-2xl text-purple-600 mt-1">
                                    <ClockCircleOutlined />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        Working Hours
                                    </h3>
                                    <p className="text-gray-600">
                                        Monday - Friday: 9:00 AM - 6:00 PM
                                        <br />
                                        Saturday: 10:00 AM - 4:00 PM
                                        <br />
                                        Sunday: Closed
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            Send us a Message
                        </h2>

                        <Spin spinning={isLoading}>
                            <Form
                                form={form}
                                layout="vertical"
                                onFinish={handleSubmit}
                                onValuesChange={handleFormChange}
                                className="space-y-4"
                                disabled={isLoading}
                            >
                                <Form.Item
                                    name="name"
                                    label="Your Name"
                                    rules={[
                                        { required: true, message: "Name is required" },
                                        { min: 2, message: "Name must be at least 2 characters" },
                                    ]}
                                >
                                    <Input
                                        placeholder="John Doe"
                                        className="py-2"
                                        size="large"
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="email"
                                    label="Email Address"
                                    rules={[
                                        { required: true, message: "Email is required" },
                                        {
                                            type: "email",
                                            message: "Please enter a valid email address",
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder="john@example.com"
                                        className="py-2"
                                        size="large"
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="subject"
                                    label="Subject"
                                    rules={[
                                        { required: true, message: "Subject is required" },
                                        { min: 3, message: "Subject must be at least 3 characters" },
                                    ]}
                                >
                                    <Input
                                        placeholder="How can we help?"
                                        className="py-2"
                                        size="large"
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="message"
                                    label="Message"
                                    rules={[
                                        { required: true, message: "Message is required" },
                                        { min: 10, message: "Message must be at least 10 characters" },
                                    ]}
                                >
                                    <Input.TextArea
                                        placeholder="Tell us more about your inquiry..."
                                        rows={5}
                                        className="py-2"
                                    />
                                </Form.Item>

                                <Form.Item className="mb-0 pt-4">
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        size="large"
                                        className="w-full"
                                        disabled={!allFieldsFilled || isLoading}
                                        loading={isLoading}
                                    >
                                        Send Message
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Spin>
                    </div>
                </div>
            </div>

            <Modal
                title={null}
                footer={null}
                onCancel={handleCloseModal}
                open={isModalVisible}
                centered
                width={400}
            >
                <div className="text-center py-8">
                    <div className="flex justify-center mb-4">
                        <div className="text-6xl text-green-500">
                            <CheckCircleOutlined />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Message Sent Successfully!
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Thank you for reaching out. We&apos;ll get back to you as soon as possible.
                    </p>
                    <Button
                        type="primary"
                        size="large"
                        onClick={handleCloseModal}
                        className="w-full"
                    >
                        Close
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

export default Contact;