import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Dashboard",
    description: "Created by Jutech Devs",
};


export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className="flex justify-center items-center h-screen">
            {children}
        </div>
    );
}
