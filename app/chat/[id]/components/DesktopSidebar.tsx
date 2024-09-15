"use client";
import useRoutes from "@/app/hooks/useRoutes";
import React from "react";
import DesktopItem from "./DesktopItem";
import { UserButton } from "@clerk/nextjs";

const DesktopSidebar = () => {
  const routes = useRoutes();
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-x-auto lg:bg-slate-900 lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between">
      <nav className="mt-4 flex flex-col justify-between">
        <ul role="list" className="flex flex-col items-center space-y-1">
          {routes.map((item) => (
            <DesktopItem
              key={item.label}
              href={item.href}
              label={item.label}
              icon={item.icon}
              active={item.active}
              onClick={item.onClick}
            />
          ))}
        </ul>
      </nav>
      <div className="flex items-center justify-center w-full">
        <div className="relative flex items-center justify-center">
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default DesktopSidebar;
