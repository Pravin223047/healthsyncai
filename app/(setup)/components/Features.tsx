"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CanvasRevealEffect } from "./ui/CanvasRevealEffect";

const Features = () => {
  return (
    <section className="w-full py-20">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-800 dark:text-gray-200">
        <span className="text-purple-600 text-2xl md:text-4xl">
          🚀 Features Provided 🚀
        </span>
      </h1>
      <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-8">
        <Card
          title="Admin Panel"
          icon={<AceternityIcon order="Admin " />}
          des={[
            "User Management: Ability to manage user accounts, including creation, modification, and deletion.",
            "Role Assignment: Assign roles to users with specific permissions, such as admin, doctor, or regular user.",
            "System Configuration: Manage system settings and configurations, including security policies and data retention rules.",
            "Dashboard: View key metrics and analytics related to user activity and system usage.",
            "Audit Trail: Track and monitor user actions and system changes for accountability and compliance purposes.",
          ]}
          highlightColor="text-blue-500"
        >
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-sky-600 rounded-3xl overflow-hidden"
            colors={[[125, 211, 252]]}
          />
        </Card>
        <Card
          title="Patient Panel"
          icon={<AceternityIcon order="Patient " />}
          des={[
            "Medical Records Management: Manage personal medical records, including uploading documents, viewing history, and updating information.",
            "Appointment Booking: Schedule appointments with healthcare providers based on availability and preferences.",
            "Record Sharing: Share medical records securely with doctors or other healthcare providers for consultations or second opinions.",
            "Health Insights: Receive personalized health insights and recommendations based on medical history and symptoms.",
            "Notifications: Receive notifications for upcoming appointments, new messages, and important updates related to healthcare.",
          ]}
          highlightColor="text-green-500"
        >
          <CanvasRevealEffect
            animationSpeed={5.1}
            containerClassName="bg-emerald-900 rounded-3xl overflow-hidden"
          />
        </Card>
        <Card
          title="Doctor Panel"
          icon={<AceternityIcon order="Doctor " />}
          des={[
            "Patient Records: Access and view patient medical records, including history, diagnosis, treatment, and medication details.",
            "Appointment Management: Schedule and manage appointments with patients, including viewing upcoming appointments and availability.",
            "Communication: Communicate with patients securely within the platform, including sending messages and sharing documents.",
            "Medical Insights: Access AI-powered medical insights and recommendations based on patient data and symptoms.",
            "Collaboration: Collaborate with other healthcare providers by sharing patient information and insights securely.",
          ]}
          highlightColor="text-rose-500"
        >
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-pink-900 rounded-3xl overflow-hidden"
            colors={[
              [255, 166, 158],
              [221, 255, 247],
            ]}
            dotSize={2}
          />
        </Card>
      </div>
    </section>
  );
};

export default Features;

const Card = ({
  title,
  icon,
  children,
  des,
  highlightColor,
}: {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  des: string[];
  highlightColor: string;
}) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border border-black/[0.2] group/canvas-card flex items-center justify-center dark:border-white/[0.2] max-w-sm w-full mx-auto p-4 relative lg:h-[35rem] rounded-3xl shadow-lg transition-transform transform hover:scale-105"
      style={{
        background: "rgb(4,7,29)",
        backgroundColor:
          "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      }}
    >
      <Icon className="absolute h-12 w-12 -top-5 -left-5 dark:text-white text-black opacity-20" />
      <Icon className="absolute h-12 w-12 -bottom-5 -left-5 dark:text-white text-black opacity-20" />
      <Icon className="absolute h-12 w-12 -top-5 -right-5 dark:text-white text-black opacity-20" />
      <Icon className="absolute h-12 w-12 -bottom-5 -right-5 dark:text-white text-black opacity-20" />

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full w-full absolute inset-0"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20 px-8 bg-slate-900 h-full rounded-lg shadow-md p-6">
        <div className="group-hover/canvas-card:-translate-y-4 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] group-hover/canvas-card:opacity-0 transition duration-300 min-w-40 mx-auto flex items-center justify-center">
          {icon}
        </div>
        <h2 className="dark:text-white text-2xl font-semibold opacity-0 group-hover/canvas-card:opacity-100 relative z-10 mt-4 group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-300">
          {title}
        </h2>
        <ul className="text-sm opacity-0 group-hover/canvas-card:opacity-100 relative z-10 mt-4 group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-300">
          {des.map((item, index) => (
            <li key={index} className="mb-2" style={{ color: "#E4ECFF" }}>
              <span className={highlightColor}>{item.split(":")[0]}:</span>
              {item.split(":")[1]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const AceternityIcon = ({ order }: { order: string }) => {
  return (
    <div>
      <button className="relative inline-flex overflow-hidden rounded-md p-[2px]">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-slate-950 px-6 py-3 text-purple backdrop-blur-3xl font-bold text-xl">
          {order}
        </span>
      </button>
    </div>
  );
};

export const Icon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};
