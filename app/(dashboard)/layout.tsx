"use client";

import { ReactNode, useEffect, useState } from "react";
import SideBar from "./_components/Sidebar/Sidebar";
import NavBar from "./_components/Navbar/navbar";
import { ToasterProvider } from "@/components/toast-provider";
import { useUser } from "@clerk/nextjs";

interface UserData {
  name: string | "";
}

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { isLoaded, user } = useUser();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    if (isLoaded && user) {
      setUserData({
        name: user.fullName || "user",
      });
      setLoading(false);
    }
  }, [isLoaded, user]);

  return (
    <div className="h-full relative">
      <ToasterProvider />
      <div className="hidden h-full 2xl:flex 2xl:flex-col 2xl:fixed 2xl:inset-y-0 bg-gray-900 2xl:w-80">
        <SideBar />
      </div>

      <main className="2xl:pl-80">
        <NavBar profile={userData} loading={loading} />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
