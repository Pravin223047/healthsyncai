"use client";

import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import {
  FileCheck2,
  HeartPulse,
  LayoutDashboard,
  UserSearch,
  MailPlus,
  Settings,
  LogOut,
} from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

const poppins = Poppins({
  weight: "600",
  subsets: ["latin"],
});

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Health Details",
    icon: HeartPulse,
    href: "/healthdetails",
    color: "text-violet-500",
  },
  {
    label: "My Documents",
    icon: FileCheck2,
    href: "/documents",
    color: "text-pink-700",
  },
  {
    label: "My Appointments",
    icon: MailPlus,
    href: "/appointments",
    color: "text-orange-700",
  },
  {
    label: "MediChat AI",
    icon: UserSearch,
    href: "/medichatai",
    color: "text-emerald-500",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
  {
    label: "Logout",
    icon: LogOut,
    href: "/logout",
  },
];

const SideBar = () => {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) {
    return (
      <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
        <div className="px-3 py-2 flex-1">
          <div className="flex items-center flex-col justify-center mb-8">
            <Skeleton className="h-36 w-36 rounded-full mb-4" />
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>

          <nav className="space-y-3 p-1">
            {routes.map((route, index) => (
              <div key={index} className="flex items-center p-3">
                <Skeleton className="h-5 w-5 mr-3" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </nav>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link
          href="/dashboard"
          className="flex items-center flex-col justify-center mb-8"
          aria-label="Home"
        >
          <div className="relative h-36 w-36">
            <Image
              src="/medicore.png"
              alt="MediChat Logo"
              layout="fill"
              objectFit="contain"
            />
          </div>

          <h1
            className={cn(
              "text-2xl text-center font-bold flex flex-col ",
              poppins.className
            )}
          >
            Medi-Chat <br />{" "}
            <p className="text-sm text-slate-500">Clinic on click</p>
          </h1>
        </Link>

        <nav className="space-y-3 p-1">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10",
                pathname === route.href ? "bg-white/10" : ""
              )}
              aria-current={pathname === route.href ? "page" : undefined}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default SideBar;
