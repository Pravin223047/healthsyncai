"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import useClient from "@/hooks/useClient";
import SideBar from "../Sidebar/Sidebar";
import RightSideBar from "../RightSidebar/RightSidebar";

const MobileSideBar = () => {
  const { isMounted } = useClient();

  if (!isMounted) return null;

  return (
    <>
      {/* Left Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <SideBar />
        </SheetContent>
      </Sheet>

      {/* Right Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="p-0">
          <RightSideBar />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileSideBar;
