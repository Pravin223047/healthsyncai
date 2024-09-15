import React from "react";
import { FaHeartbeat } from "react-icons/fa";

const BloodPressureCard = () => {
  // Simulated blood pressure readings
  const systolic = 120;
  const diastolic = 80;

  // Determine the gradient color based on blood pressure level
  const getGradientClass = () => {
    if (systolic < 120 && diastolic < 80) {
      return "bg-gradient-to-r from-green-400 to-green-600";
    } else if (systolic >= 120 && systolic < 130 && diastolic < 80) {
      return "bg-gradient-to-r from-yellow-400 to-yellow-600";
    } else if (
      (systolic >= 130 && systolic < 140) ||
      (diastolic >= 80 && diastolic < 90)
    ) {
      return "bg-gradient-to-r from-orange-400 to-orange-600";
    } else if (systolic >= 140 || diastolic >= 90) {
      return "bg-gradient-to-r from-red-400 to-red-600";
    } else {
      return "bg-gradient-to-r from-purple-400 to-purple-600";
    }
  };

  return (
    <div className="bg-slate-800 text-white rounded-lg shadow-md p-4 flex flex-col items-start mt-4">
      {/* Blood Pressure Icon */}
      <div className="flex w-full gap-2">
        <div className="relative flex items-center justify-center w-12 h-12 bg-red-200 rounded-lg mr-4">
          <div className="absolute flex items-center justify-center -top-2 -left-2 bg-red-500 rounded-full w-5 h-5">
            <FaHeartbeat className="text-white w-2 h-2 flex items-center justify-center" />
          </div>
          <FaHeartbeat className="text-red-600 w-8 h-8" />
        </div>

        {/* Blood Pressure Info */}
        <div className="flex-1">
          <div className="flex justify-between gap-1">
            <div>
              <h3 className="text-md font-semibold text-white">
                Blood Pressure
              </h3>
              <p className="text-sm text-gray-500">
                16 August, 2023 <br />
                02:36 pm
              </p>
            </div>
            <div
              className={`text-md font-bold flex flex-col items-start justify-start text-transparent bg-clip-text ${getGradientClass()}`}
            >
              <p className="flex w-full items-center justify-center gap-1">
                {systolic}/{diastolic}{" "}
                <span className="text-sm font-medium">mmHg</span>
              </p>
              <p className="text-sm">Normal</p>
            </div>
          </div>
        </div>
      </div>

      {/* Blood Pressure Zones */}
      <div className="mt-4 w-full">
        <div className="w-full h-2 rounded-full bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 mb-1"></div>
        <div className="flex justify-between text-xs text-gray-600">
          <span className="text-yellow-500 text-center">
            90/60
            <br />
            Low
          </span>
          <span className="text-green-400 text-center">
            120/80
            <br />
            Normal
          </span>
          <span className="text-orange-500 text-center">
            130/85
            <br />
            Elevated
          </span>
          <span className="text-red-400 text-center">
            140/90
            <br />
            High
          </span>
          <span className="text-red-600 text-center">
            180/120
            <br />
            Crisis
          </span>
        </div>
      </div>
      <div className="mt-6 w-full">
        <button className="px-4 py-2 w-full bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none">
          Calculate Blood Pressure
        </button>
      </div>
    </div>
  );
};

export default BloodPressureCard;
