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
                    <div className="h-screen bg-black">
                        <Layout>
                            <Header className="sticky top-0 z-10 w-full bg-white text-black flex items-center">
                                <Navbar/>
                            </Header>
                            <Content>{children}</Content>
                            <Footer className="bg-gray-800 text-white">
                                Footer
                            </Footer>
                        </Layout>
                    </div>
                </AntdRegistry>
            </body>
        </html>
    );
}
