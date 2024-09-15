"use client";

import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import BluetoothEnable from "../../BluetoothEnabled/BluetoothEnabled";

const HeartRateCard = () => {
  const [isBluetoothDialogOpen, setIsBluetoothDialogOpen] = useState(false);
  const [pairedDeviceName, setPairedDeviceName] = useState<string | null>(null);
  const [heartRate, setHeartRate] = useState<number | null>(null);
  const [storedHeartRate, setStoredHeartRate] = useState<number | null>(null);
  const [step, setStep] = useState(1);
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    if (heartRate !== null) {
      // Force re-render when heart rate changes
    }
  }, [heartRate]);

  const handleCalculateHeartRate = async () => {
    try {
      setStep(2);
      setIsBluetoothDialogOpen(true);

      // Simulate enabling Bluetooth (replace with actual Bluetooth code)
      setTimeout(async () => {
        setStep(3);
        setIsBluetoothDialogOpen(false);
        setIsCalculating(true);

        // Request the Bluetooth device with optional services
        const device = await navigator.bluetooth.requestDevice({
          acceptAllDevices: true,
          optionalServices: ["heart_rate", "battery_service"],
        });

        setPairedDeviceName(device.name || "Unknown Device");

        const server = await device.gatt?.connect();
        if (!server) {
          throw new Error("Failed to connect to the GATT server");
        }

        const service = await server.getPrimaryService("heart_rate");
        const characteristic = await service.getCharacteristic(
          "heart_rate_measurement"
        );

        await characteristic.startNotifications();
        characteristic.addEventListener(
          "characteristicvaluechanged",
          handleCharacteristicValueChanged
        );
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      setIsBluetoothDialogOpen(false);
      setIsCalculating(false);
    }
  };

  const handleCharacteristicValueChanged = (event: any) => {
    const value = event.target.value;
    const heartRate = parseHeartRate(value);
    setHeartRate(heartRate);
    setStep(4);
    setIsCalculating(false);
  };

  const parseHeartRate = (value: DataView) => {
    return value.getUint8(1); // Example for Heart Rate Measurement characteristic
  };

  const getHeartRateZone = () => {
    if (!heartRate) return "Light";
    if (heartRate < 80) return "Light";
    if (heartRate < 120) return "Normal";
    if (heartRate < 140) return "Weight";
    if (heartRate < 160) return "Aerobic";
    if (heartRate < 180) return "Anaerobic";
    return "VO2 max";
  };

  const resetState = () => {
    setHeartRate(null);
    setPairedDeviceName(null);
    setStoredHeartRate(null);
    setStep(1);
  };

  const getHeartRateColor = (rate: number) => {
    if (rate < 80) return "text-yellow-200";
    if (rate < 120) return "text-yellow-500";
    if (rate < 140) return "text-orange-400";
    if (rate < 160) return "text-orange-500";
    if (rate < 180) return "text-red-400";
    return "text-red-600";
  };

  const getHeartRateRangePosition = () => {
    if (!heartRate) return "0%";
    const minRate = 80;
    const maxRate = 183;
    const rangeWidth = 100; // Width of the range component in percentage
    const range = maxRate - minRate;
    const position = ((heartRate - minRate) / range) * rangeWidth;
    return `${Math.min(100, Math.max(0, position))}%`;
  };

  const getPointerPosition = () => {
    if (!heartRate) return "0%";
    const minRate = 80;
    const maxRate = 183;
    const rangeWidth = 100; // Width of the range component in percentage
    const range = maxRate - minRate;
    const position = ((heartRate - minRate) / range) * rangeWidth;
    return `${Math.min(100, Math.max(0, position))}%`;
  };

  return (
    <div className="bg-slate-800 text-white rounded-lg shadow-md p-4 flex flex-col items-start mt-4 relative">
      {isBluetoothDialogOpen && (
        <BluetoothEnable
          isOpen={isBluetoothDialogOpen}
          onClose={() => setIsBluetoothDialogOpen(false)}
        />
      )}

      <div className="flex w-full gap-2">
        <div className="relative flex items-center justify-center w-12 h-12 bg-red-200 rounded-lg mr-4">
          <div className="absolute flex items-center justify-center -top-2 -left-2 bg-red-500 rounded-full w-5 h-5">
            <FaHeart className="text-white w-2 h-2 flex items-center justify-center" />
          </div>
          <FaHeart className="text-red-600 w-8 h-8" />
        </div>

        <div className="flex-1">
          <div className="flex justify-between">
            <div>
              <h3 className="text-md font-semibold text-white">Heart Rate</h3>
              <p className="text-sm text-gray-500">
                16 August, 2023 <br />
                02:36 pm
              </p>
            </div>
            <div className="text-md font-bold flex flex-col items-start justify-start text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
              <p
                className={`flex w-full items-center justify-center gap-1 ${
                  heartRate ? getHeartRateColor(heartRate) : ""
                }`}
              >
                {heartRate !== null ? heartRate : "N/A"}{" "}
                <span className="text-sm font-medium">BPM</span>
              </p>
              <p className="text-sm">{getHeartRateZone()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2 w-full relative">
        <div className="w-full h-3 mt-7 rounded-full bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 mb-1"></div>
        <div className="absolute top-0 mt-7 z-10 left-0 w-full h-3 rounded-full bg-gray-500">
          <div
            className={`absolute rounded-full rounded-tr-none rounded-br-none h-full bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500`}
            style={{ width: getHeartRateRangePosition() }}
          />
        </div>
        <div className="absolute top-7 left-0 w-full h-3 rounded-full bg-gray-500">
          <div
            className={`absolute z-20 -top-0 w-3 h-3 rounded-tl-none rounded-bl-none bg-white rounded-full`}
            style={{ left: getPointerPosition() }}
          />
        </div>
        <div className="flex mt-3 mb-3 justify-between text-xs text-gray-600 absolute w-full top-1/2 transform -translate-y-1/2">
          <span className="text-yellow-200 text-center">
            80
            <br />
            <br />
            Light
          </span>
          <span className="text-yellow-500 text-center">
            102
            <br />
            <br />
            Normal
          </span>
          <span className="text-orange-400 text-center">
            122
            <br />
            <br />
            Weight
          </span>
          <span className="text-orange-500 text-center">
            142
            <br />
            <br />
            Aerobic
          </span>
          <span className="text-red-400 text-center">
            162
            <br />
            <br />
            Anaerobic
          </span>
          <span className="text-red-600 text-center">
            183
            <br />
            <br />
            VO<sub>2</sub> max
          </span>
        </div>
      </div>

      <div className="mt-10 w-full">
        {step === 1 && (
          <button
            onClick={handleCalculateHeartRate}
            className="px-4 py-2 w-full bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
          >
            Calculate Heart Rate
          </button>
        )}
        {step === 2 && (
          <button
            onClick={() => setIsBluetoothDialogOpen(true)}
            className="px-4 py-2 w-full bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none"
          >
            Open Bluetooth Settings
          </button>
        )}
        {step === 3 && (
          <button
            disabled
            className="px-4 py-2 w-full bg-gray-500 text-white rounded-md shadow-md"
          >
            Calculating Heart Rate...
          </button>
        )}
        {step === 4 && (
          <button
            onClick={() => {
              if (heartRate !== null) {
                setStoredHeartRate(heartRate);
                resetState();
              }
            }}
            disabled={heartRate === null}
            className="px-4 py-2 w-full bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 focus:outline-none"
          >
            Save Heart Rate
          </button>
        )}
        {pairedDeviceName && (
          <p className="mt-2 text-sm text-gray-400">
            Paired Device:{" "}
            <span className="text-blue-500">{pairedDeviceName}</span>
          </p>
        )}
        {step >= 2 && (
          <div className="mt-4 w-full">
            <h4 className="text-sm font-semibold mb-2">Steps:</h4>
            <ul className="text-xs text-gray-400 list-disc list-inside">
              {step >= 2 && <li>Step 1: Enable Bluetooth</li>}
              {step >= 3 && (
                <>
                  <li>Step 2: Pair the device</li>
                  <li>
                    Step 3: On the watch, go to the heart rate section and click
                    on heart rate.
                  </li>
                </>
              )}
              {step === 4 && <li>Step 4: Heart rate measured successfully.</li>}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeartRateCard;
