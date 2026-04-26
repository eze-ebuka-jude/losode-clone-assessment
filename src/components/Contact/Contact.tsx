"use client";

import React from "react";
import { Form, Input, Button, Modal } from "antd";
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
        <div className="bg-gray-50 py-12 sm:py-16 px-3 sm:px-6 lg:px-8 mt-4 sm:mt-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8 sm:mb-12">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                        Get in touch with us
                    </h1>
                    <p className="text-base sm:text-lg text-gray-600">
                        We&apos;d love to hear from you. Send us a message and we&apos;ll respond as
                        soon as possible.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
                    <div className="space-y-6 sm:space-y-8">
                        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition">
                            <div className="flex items-start gap-3 sm:gap-4">
                                <div className="text-2xl text-blue-600 mt-1 shrink-0">
                                    <EnvironmentOutlined />
                                </div>
                                <div>
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
                                        Address
                                    </h3>
                                    <p className="text-sm sm:text-base text-gray-600">
                                        400 University Drive Suite 200 Coral
                                        <br />
                                        Gables, FL 33134 USA
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition">
                            <div className="flex items-start gap-3 sm:gap-4">
                                <div className="text-2xl text-green-600 mt-1 shrink-0">
                                    <PhoneOutlined />
                                </div>
                                <div>
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
                                        Phone Numbers
                                    </h3>
                                    <p className="text-sm sm:text-base text-gray-600">
                                        +1 (305) 123-4567 <br /> +1 (305) 123-4568
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition">
                            <div className="flex items-start gap-3 sm:gap-4">
                                <div className="text-2xl text-orange-600 mt-1 shrink-0">
                                    <ClockCircleOutlined />
                                </div>
                                <div>
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
                                        Business Hours
                                    </h3>
                                    <p className="text-sm sm:text-base text-gray-600">
                                        Monday - Friday: 9am - 6pm <br /> Saturday - Sunday: 10am - 4pm
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={handleSubmit}
                            onValuesChange={handleFormChange}
                            className="space-y-4"
                        >
                            <Form.Item
                                name="name"
                                label={<span className="text-sm sm:text-base">Name</span>}
                                rules={[{ required: true, message: "Name is required" }]}
                            >
                                <Input placeholder="Your Name" size="large" />
                            </Form.Item>

                            <Form.Item
                                name="email"
                                label={<span className="text-sm sm:text-base">Email</span>}
                                rules={[
                                    { required: true, message: "Email is required" },
                                    { type: "email", message: "Invalid email" },
                                ]}
                            >
                                <Input placeholder="your@email.com" size="large" />
                            </Form.Item>

                            <Form.Item
                                name="subject"
                                label={<span className="text-sm sm:text-base">Subject</span>}
                                rules={[{ required: true, message: "Subject is required" }]}
                            >
                                <Input placeholder="Subject of your message" size="large" />
                            </Form.Item>

                            <Form.Item
                                name="message"
                                label={<span className="text-sm sm:text-base">Message</span>}
                                rules={[{ required: true, message: "Message is required" }]}
                            >
                                <Input.TextArea
                                    placeholder="Your message..."
                                    rows={5}
                                    className="text-sm sm:text-base"
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={isLoading}
                                    disabled={!allFieldsFilled || isLoading}
                                    className="w-full h-10 sm:h-12 text-sm sm:text-base font-semibold"
                                    size="large"
                                >
                                    {isLoading ? "Sending..." : "Send Message"}
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>

            <Modal
                title={<span className="text-lg sm:text-xl">Message Sent Successfully</span>}
                open={isModalVisible}
                onOk={handleCloseModal}
                onCancel={handleCloseModal}
                centered
                okText="Close"
                cancelButtonProps={{ style: { display: "none" } }}
                width="90%"
            >
                <div className="flex items-center justify-center gap-3">
                    <CheckCircleOutlined className="text-3xl text-green-500" />
                    <div>
                        <p className="text-base sm:text-lg font-semibold text-gray-900">
                            Thank you for your message!
                        </p>
                        <p className="text-sm sm:text-base text-gray-600">
                            We&apos;ll get back to you as soon as possible.
                        </p>
                    </div>
                </div>
            </Modal>
        </div>
    );

};

export default Contact;