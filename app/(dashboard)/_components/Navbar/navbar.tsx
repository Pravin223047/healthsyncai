// components/_components/Navbar/navbar.tsx

"use client";
import { UserButton } from "@clerk/nextjs";
import MobileSideBar from "../MobileSidebar/mobile-sidebar";
import {
  Bell,
  Settings as SettingsIcon,
  ShieldAlert,
  Search,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

interface Profile {
  name: string;
}

interface NavBarProps {
  profile: Profile | null;
  loading: boolean;
}

const NavBar = ({ profile, loading }: NavBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();

  const handleEmergencyClick = () => {
    router.push("/emergency");
  };

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  return (
    <nav className="fixed 2xl:relative z-30 w-full flex items-center justify-between p-4 bg-gray-900 text-white shadow-md">
      <MobileSideBar />

      {/* Mobile Search Bar Popup */}
      <div
        className={`fixed inset-0 bg-gray-900 p-4 transform transition-transform ${
          isSearchOpen ? "translate-x-0" : "translate-x-full"
        } z-50 flex flex-col`}
      >
        {loading ? (
          <Skeleton className="w-full h-10 mb-4" />
        ) : (
          <div className="flex items-center mb-4">
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-800 text-white placeholder-gray-400"
              aria-label="Search"
            />
            <Button
              variant="destructive"
              className="ml-2 p-2"
              onClick={() => setIsSearchOpen(false)}
              aria-label="Close search"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
        )}
      </div>

      {/* Mobile Search Icon */}
      <div className="flex items-center sm:hidden">
        {loading ? (
          <Skeleton className="w-8 h-8 rounded-full" />
        ) : (
          <Button
            variant="ghost"
            className="p-2 text-sm hover:bg-gray-700 rounded-full"
            onClick={toggleSearch}
            aria-label="Open search"
          >
            <Search className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Greeting */}
      <div className="text-lg font-semibold ml-4 mr-4">
        {loading ? (
          <Skeleton className="w-40 h-6" />
        ) : (
          <p>
            Hello,{" "}
            <span className="text-blue-600 font-bold">{profile?.name}</span>
          </p>
        )}
      </div>

      {/* Desktop Search Bar */}
      <div className="hidden sm:flex flex-1 mx-4">
        {loading ? (
          <Skeleton className="w-full h-10" />
        ) : (
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-800 text-white placeholder-gray-400"
            aria-label="Search"
          />
        )}
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center space-x-4">
        {/* Emergency Button */}
        {loading ? (
          <Skeleton className="w-28 h-10 rounded-md" />
        ) : (
          <>
            <Button
              variant="destructive"
              className="hidden sm:flex items-center"
              onClick={handleEmergencyClick}
              aria-label="Emergency"
            >
              <ShieldAlert className="h-6 w-6 mr-2" />
              Emergency
            </Button>
            <Button
              variant="destructive"
              className="sm:hidden flex items-center"
              onClick={handleEmergencyClick}
              aria-label="Emergency"
            >
              <ShieldAlert className="h-6 w-6" />
            </Button>
          </>
        )}

        {/* Notification and Settings Icons */}
        {loading ? (
          <div className="flex items-center gap-2 bg-slate-800 rounded-md">
            <Skeleton className="w-10 h-10 rounded-full" />
            <Skeleton className="w-10 h-10 rounded-full" />
          </div>
        ) : (
          <div className="flex items-center gap-2 bg-slate-800 rounded-md">
            <Button
              variant="ghost"
              className="p-2 rounded-full hover:bg-gray-700"
              aria-label="Notifications"
            >
              <Bell className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              className="p-2 rounded-full hover:bg-gray-700"
              aria-label="Settings"
            >
              <SettingsIcon className="h-6 w-6" />
            </Button>
          </div>
        )}

        {/* User Button */}
        {loading ? (
          <Skeleton className="w-32 h-10 rounded-full" />
        ) : (
          <div className={`hidden md:flex ${isSearchOpen ? "hidden" : "flex"}`}>
            <UserButton afterSignOutUrl="/" />
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
