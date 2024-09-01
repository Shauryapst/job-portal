import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Layout, Menu } from "antd";
import { Header, Footer, Content } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import Link from "next/link";
import Navbar from "@/components/Navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Job Portal",
    description: "Job Portal",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AntdRegistry>
                    <div className="flex flex-col h-screen">
                        <Layout className="flex-1">
                            <Header className="sticky top-0 z-10 w-full bg-white text-black flex items-center">
                                <Navbar />
                            </Header>
                            <Content className="flex-1 overflow-y-auto">
                                {children}
                            </Content>
                        </Layout>
                    </div>
                </AntdRegistry>
            </body>
        </html>
    );
}
