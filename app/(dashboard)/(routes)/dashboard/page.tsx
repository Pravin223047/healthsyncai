"use client";
import React from "react";
import Image from "next/image";
import { CiLocationOn } from "react-icons/ci";
import Link from "next/link";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import HealthStatus from "../../_components/HealthStatus/HealthStatus";
import RightSideBar from "../../_components/RightSidebar/RightSidebar";

const DashboardPage = () => {
  return (
    <main className="h-full 2xl:pr-96 relative">
      <div className="flex w-full flex-col gap-4">
        <HealthStatus />
        <div className="w-full mx-auto p-4 pt-2">
          <h2 className="text-2xl font-semibold mb-4">
            Today&apos;s Schedules
          </h2>
          <div className="w-full flex flex-col gap-4 overflow-auto h-[71vh] hidden-scrollbar">
            <div className="bg-slate-800 text-white shadow-md rounded-lg p-4 flex items-center justify-between gap-4">
              <div className="flex flex-col">
                <div className="flex items-center mb-4">
                  <Image
                    src="/medicore.png"
                    alt="Logo"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="ml-2 flex items-center justify-center gap-2">
                    <h2 className="text-lg text-white font-medium">
                      Dr. John Doe
                    </h2>
                    <h5 className="text-sm text-blue-600">Dermatologist</h5>
                  </div>
                </div>
                <p className="text-slate-200 mb-2">
                  Consultation for depression and anxiety
                </p>
                <span className="text-sm text-blue-600 flex items-center">
                  <CiLocationOn className="mr-1 text-blue-600 text-lg" />
                  Solapur, Maharashtra - 413005
                </span>
              </div>
              <div className="flex flex-col justify-between items-end gap-4">
                <div className="text-md text-semibold text-slate-200">
                  22-12-24
                </div>
                <div className="flex space-x-4">
                  <Link
                    href={`/chat/12345`}
                    className="flex items-center px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition"
                  >
                    <IoChatboxEllipsesOutline className="mr-2" />
                    Chat
                  </Link>

                  <button className="px-5 py-2 bg-red-800 text-white rounded-md hover:bg-red-500 transition">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-slate-800 text-white shadow-md rounded-lg p-4 flex items-center justify-between gap-4">
              <div className="flex flex-col">
                <div className="flex items-center mb-4">
                  <Image
                    src="/medicore.png"
                    alt="Logo"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="ml-2 flex items-center justify-center gap-2">
                    <h2 className="text-lg text-white font-medium">
                      Dr. John Doe
                    </h2>
                    <h5 className="text-sm text-blue-600">Dermatologist</h5>
                  </div>
                </div>
                <p className="text-slate-200 mb-2">
                  Consultation for depression and anxiety
                </p>
                <span className="text-sm text-blue-600 flex items-center">
                  <CiLocationOn className="mr-1 text-blue-600 text-lg" />
                  Solapur, Maharashtra - 413005
                </span>
              </div>
              <div className="flex flex-col justify-between items-end gap-4">
                <div className="text-md text-semibold text-slate-200">
                  22-12-24
                </div>
                <div className="flex space-x-4">
                  <Link
                    href="/chat"
                    className="flex items-center px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition"
                  >
                    <IoChatboxEllipsesOutline className="mr-2" />
                    Chat
                  </Link>
                  <button className="px-5 py-2 bg-red-800 text-white rounded-md hover:bg-red-500 transition">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-slate-800 text-white shadow-md rounded-lg p-4 flex items-center justify-between gap-4">
              <div className="flex flex-col">
                <div className="flex items-center mb-4">
                  <Image
                    src="/medicore.png"
                    alt="Logo"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="ml-2 flex items-center justify-center gap-2">
                    <h2 className="text-lg text-white font-medium">
                      Dr. John Doe
                    </h2>
                    <h5 className="text-sm text-blue-600">Dermatologist</h5>
                  </div>
                </div>
                <p className="text-slate-200 mb-2">
                  Consultation for depression and anxiety
                </p>
                <span className="text-sm text-blue-600 flex items-center">
                  <CiLocationOn className="mr-1 text-blue-600 text-lg" />
                  Solapur, Maharashtra - 413005
                </span>
              </div>
              <div className="flex flex-col justify-between items-end gap-4">
                <div className="text-md text-semibold text-slate-200">
                  22-12-24
                </div>
                <div className="flex space-x-4">
                  <Link
                    href="/chat"
                    className="flex items-center px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition"
                  >
                    <IoChatboxEllipsesOutline className="mr-2" />
                    Chat
                  </Link>
                  <button className="px-5 py-2 bg-red-800 text-white rounded-md hover:bg-red-500 transition">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-slate-800 text-white shadow-md rounded-lg p-4 flex items-center justify-between gap-4">
              <div className="flex flex-col">
                <div className="flex items-center mb-4">
                  <Image
                    src="/medicore.png"
                    alt="Logo"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="ml-2 flex items-center justify-center gap-2">
                    <h2 className="text-lg text-white font-medium">
                      Dr. John Doe
                    </h2>
                    <h5 className="text-sm text-blue-600">Dermatologist</h5>
                  </div>
                </div>
                <p className="text-slate-200 mb-2">
                  Consultation for depression and anxiety
                </p>
                <span className="text-sm text-blue-600 flex items-center">
                  <CiLocationOn className="mr-1 text-blue-600 text-lg" />
                  Solapur, Maharashtra - 413005
                </span>
              </div>
              <div className="flex flex-col justify-between items-end gap-4">
                <div className="text-md text-semibold text-slate-200">
                  22-12-24
                </div>
                <div className="flex space-x-4">
                  <Link
                    href="/chat"
                    className="flex items-center px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition"
                  >
                    <IoChatboxEllipsesOutline className="mr-2" />
                    Chat
                  </Link>
                  <button className="px-5 py-2 bg-red-800 text-white rounded-md hover:bg-red-500 transition">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-slate-800 text-white shadow-md rounded-lg p-4 flex items-center justify-between gap-4">
              <div className="flex flex-col">
                <div className="flex items-center mb-4">
                  <Image
                    src="/medicore.png"
                    alt="Logo"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="ml-2 flex items-center justify-center gap-2">
                    <h2 className="text-lg text-white font-medium">
                      Dr. John Doe
                    </h2>
                    <h5 className="text-sm text-blue-600">Dermatologist</h5>
                  </div>
                </div>
                <p className="text-slate-200 mb-2">
                  Consultation for depression and anxiety
                </p>
                <span className="text-sm text-blue-600 flex items-center">
                  <CiLocationOn className="mr-1 text-blue-600 text-lg" />
                  Solapur, Maharashtra - 413005
                </span>
              </div>
              <div className="flex flex-col justify-between items-end gap-4">
                <div className="text-md text-semibold text-slate-200">
                  22-12-24
                </div>
                <div className="flex space-x-4">
                  <Link
                    href="/chat"
                    className="flex items-center px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition"
                  >
                    <IoChatboxEllipsesOutline className="mr-2" />
                    Chat
                  </Link>
                  <button className="px-5 py-2 bg-red-800 text-white rounded-md hover:bg-red-500 transition">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-slate-800 text-white shadow-md rounded-lg p-4 flex items-center justify-between gap-4">
              <div className="flex flex-col">
                <div className="flex items-center mb-4">
                  <Image
                    src="/medicore.png"
                    alt="Logo"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="ml-2 flex items-center justify-center gap-2">
                    <h2 className="text-lg text-white font-medium">
                      Dr. John Doe
                    </h2>
                    <h5 className="text-sm text-blue-600">Dermatologist</h5>
                  </div>
                </div>
                <p className="text-slate-200 mb-2">
                  Consultation for depression and anxiety
                </p>
                <span className="text-sm text-blue-600 flex items-center">
                  <CiLocationOn className="mr-1 text-blue-600 text-lg" />
                  Solapur, Maharashtra - 413005
                </span>
              </div>
              <div className="flex flex-col justify-between items-end gap-4">
                <div className="text-md text-semibold text-slate-200">
                  22-12-24
                </div>
                <div className="flex space-x-4">
                  <Link
                    href="/chat"
                    className="flex items-center px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition"
                  >
                    <IoChatboxEllipsesOutline className="mr-2" />
                    Chat
                  </Link>
                  <button className="px-5 py-2 bg-red-800 text-white rounded-md hover:bg-red-500 transition">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden h-full w-full 2xl:flex 2xl:flex-col 2xl:fixed right-0 2xl:inset-y-0 bg-gray-900 2xl:max-w-96">
        <RightSideBar />
      </div>
    </main>
  );
};

export default DashboardPage;
