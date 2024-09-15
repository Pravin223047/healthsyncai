import React from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const fonts = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const Logo = () => {
  return (
    <div className="flex flex-col items-center gap-y-4">
      <div className="bg-white flex items-center justify-center rounded-full p-1">
        <Image
          src={"/medicore.png"}
          width={80}
          height={80}
          alt="MediChat Logo Image"
        />
      </div>
      <div className={cn(fonts.className, "flex flex-col items-center")}>
        <p className="text-xl font-semibold">MediChat</p>
        <p className="text-sm text-muted-foreground">
          Instant healthcare help, anytime, anywhere.
        </p>
      </div>
    </div>
  );
};

export default Logo;
