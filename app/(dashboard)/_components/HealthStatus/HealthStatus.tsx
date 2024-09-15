import React, { useEffect, useRef, useState } from "react";
import {
  IoSpeedometerOutline,
  IoBagAddOutline,
  IoClose,
  IoTimeOutline,
} from "react-icons/io5";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { FaEye, FaSearch } from "react-icons/fa";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { PiSyringe } from "react-icons/pi";
import { CgInsertAfter } from "react-icons/cg";
import { CiCalendarDate } from "react-icons/ci";

const API_KEY = "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";

const systemMessage = {
  role: "system",
  content:
    "Explain things like you're a doctor to a patient with 10 years of experience. Give the answer in terms of its advantages, disadvantages, side effects, etc. Each term should display on a new line. Give the answer in simple English language.",
};

const HealthStatus = () => {
  const [showMedicine, setShowMedicine] = useState(false);
  const [showMedDetails, setShowMedDetails] = useState(false);
  const [showHealthTips, setShowHealthTips] = useState(false);
  const [messages, setMessages] = useState([
    {
      message:
        "Hello, I'm HealthSync.ai! Your Personal Health Care Assistant. Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [retryAfter, setRetryAfter] = useState(0);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (retryAfter > 0) {
      const timerId = setTimeout(() => {
        setRetryAfter(retryAfter - 1);
      }, 1000);

      return () => clearTimeout(timerId);
    }
  }, [retryAfter]);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.scrollTop =
        chatContainer.scrollHeight - chatContainer.clientHeight;
    }
  }, [messages]);

  const handleSend = async (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => {
    if (
      e.type === "click" ||
      (e as React.KeyboardEvent<HTMLInputElement>).key === "Enter"
    ) {
      setShowHealthTips(true);
      const inputElement = (e.target as HTMLElement)
        .closest("div")
        ?.querySelector("input") as HTMLInputElement;
      const message = inputElement.value;

      if (message.trim()) {
        const newMessage = {
          message,
          sentTime: new Date().toLocaleTimeString(),
          sender: "user",
        };

        const newMessages = [...messages, newMessage];
        setMessages(newMessages);

        setIsTyping(true);
        await processMessageToChatGPT(newMessages);

        inputElement.value = ""; // Clear input field after sending
        setShowMedDetails(true);
      }
    }
  };

  async function processMessageToChatGPT(chatMessages: any[]) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages],
    };

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiRequestBody),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sentTime: new Date().toLocaleTimeString(),
            sender: "ChatGPT",
          },
        ]);
      } else if (response.status === 429) {
        const retryAfterHeader = response.headers.get("Retry-After");
        setRetryAfter(parseInt(retryAfterHeader || "10"));
        throw new Error(
          "Too many requests. Retrying after " +
            retryAfterHeader +
            " seconds..."
        );
      } else {
        throw new Error("Failed to fetch response from OpenAI API");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <div className="health-container mt-[4.6rem] 2xl:mt-0 flex flex-col items-center md:flex-row w-full justify-between gap-4 h-full p-4">
      <div className="health-item flex items-center p-4 border-2 w-full h-20 bg-gray-800 rounded-md">
        <IoSpeedometerOutline className="text-yellow-600 h-[40px] w-[40px] flex items-center justify-center p-1 text-3xl bg-white rounded-full" />
        <div className="ml-4">
          <h2 className="text-lg font-semibold">BMI</h2>
          <p className="flex items-center text-gray-500">
            22.5
            <IoMdInformationCircleOutline
              title="BMI value using height and weight"
              className="ml-2"
            />
          </p>
        </div>
      </div>
      <div className="health-item relative flex items-center p-4 border-2 w-full h-20 bg-gray-800 rounded-md">
        <PiSyringe className="text-green-500 h-[40px] w-[40px] flex items-center justify-center p-1 text-3xl bg-white rounded-full" />
        <div className="ml-4">
          <h2 className="text-lg font-semibold">Medicines</h2>
          <p
            className="flex items-center text-blue-600 cursor-pointer"
            onClick={() => setShowMedicine(!showMedicine)}
          >
            View
            <FaEye className="ml-2" title="Medicine Details" />
          </p>
        </div>
        {showMedicine && (
          <div className="medicine-container absolute z-50 w-full top-24 left-0 bg-gray-800 p-4 rounded-md text-black">
            <div className="header flex justify-between items-center mb-4">
              <h4 className="text-lg font-semibold text-blue-700">
                Medicine Details
              </h4>
              <button onClick={() => setShowMedicine(false)}>
                <IoClose className="text-red-500 text-xl h-6 w-6 bg-red-200 p-1 rounded-md" />
              </button>
            </div>
            <div className="active-medicines mb-4">
              <h5 className="text-md font-semibold mb-2 text-slate-400">
                Active Medicines
              </h5>
              <div className="medicine-list space-y-4 hidden-scrollbar overflow-auto h-40">
                <div className="medicine-details p-4 bg-white rounded-md shadow-md">
                  <div className="medicine-name font-semibold mb-2">
                    Dolo{" "}
                    <span className="text-gray-500">/ Duration: 5 days</span>
                  </div>
                  <div className="medicine-info text-sm space-y-1">
                    <p className="flex items-center">
                      <IoBagAddOutline className="mr-2" /> 500mg
                    </p>
                    <p className="flex items-center">
                      <IoTimeOutline className="mr-2" /> 3 times a day [M-W-F]
                    </p>
                    <p className="flex items-center">
                      <CgInsertAfter className="mr-2" /> After Lunch
                    </p>
                    <p className="flex items-center">
                      <CiCalendarDate className="mr-2" /> 2024-05-10 /
                      2024-05-20
                    </p>
                  </div>
                </div>
                <div className="medicine-details p-4 bg-white rounded-md shadow-md">
                  <div className="medicine-name font-semibold mb-2">
                    Crosin{" "}
                    <span className="text-gray-500">/ Duration: 5 days</span>
                  </div>
                  <div className="medicine-info text-sm space-y-1">
                    <p className="flex items-center">
                      <IoBagAddOutline className="mr-2" /> 600mg
                    </p>
                    <p className="flex items-center">
                      <IoTimeOutline className="mr-2" /> 2 times a day [M-W-F]
                    </p>
                    <p className="flex items-center">
                      <CgInsertAfter className="mr-2" /> Before Sleep
                    </p>
                    <p className="flex items-center">
                      <CiCalendarDate className="mr-2" /> 2024-05-10 /
                      2024-05-20
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="completed-medicines">
              <h5 className="text-md font-semibold mb-2 text-slate-400 ">
                Completed Medicines
              </h5>
              <div className="medicine-list space-y-4 hidden-scrollbar overflow-auto h-40">
                <div className="medicine-details p-4 bg-white rounded-md shadow-md">
                  <div className="medicine-name font-semibold mb-2">
                    Paracetamol{" "}
                    <span className="text-gray-500">/ Duration: 5 days</span>
                  </div>
                  <div className="medicine-info text-sm space-y-1">
                    <p className="flex items-center">
                      <IoBagAddOutline className="mr-2" /> 500mg
                    </p>
                    <p className="flex items-center">
                      <IoTimeOutline className="mr-2" /> 3 times a day [M-W-F]
                    </p>
                    <p className="flex items-center">
                      <CgInsertAfter className="mr-2" /> After Breakfast
                    </p>
                    <p className="flex items-center">
                      <CiCalendarDate className="mr-2" /> 2024-05-10 /
                      2024-05-20
                    </p>
                  </div>
                </div>
                <div className="medicine-details p-4 bg-white rounded-md shadow-md">
                  <div className="medicine-name font-semibold mb-2">
                    Dolo{" "}
                    <span className="text-gray-500">/ Duration: 5 days</span>
                  </div>
                  <div className="medicine-info text-sm space-y-1">
                    <p className="flex items-center">
                      <IoBagAddOutline className="mr-2" /> 500mg
                    </p>
                    <p className="flex items-center">
                      <IoTimeOutline className="mr-2" /> 3 times a day [M-W-F]
                    </p>
                    <p className="flex items-center">
                      <CgInsertAfter className="mr-2" /> After Breakfast
                    </p>
                    <p className="flex items-center">
                      <CiCalendarDate className="mr-2" /> 2024-05-10 /
                      2024-05-20
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Additional UI components here */}

      <div className="health-item relative flex items-center p-4 border-2 w-full h-20 bg-gray-800 rounded-md">
        <MdOutlineHealthAndSafety className="text-blue-500 h-[40px] w-[40px] flex items-center justify-center p-1 text-3xl bg-white rounded-full" />
        <div className="ml-4">
          <h2 className="text-lg font-semibold">Health Tips</h2>
          <div className="input-container w-full mt-1 flex items-center space-x-2">
            <input
              type="text"
              placeholder="Type your message..."
              onKeyDown={handleSend}
              className="w-full p-1 border rounded-md bg-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-700"
            />
            <button
              onClick={handleSend}
              className="bg-blue-500 text-white text-sm p-2 rounded-md hover:bg-blue-600"
            >
              <FaSearch className="text-sm" />
            </button>
          </div>
        </div>
        {showHealthTips && (
          <div className="absolute z-50 w-full top-24 left-0 bg-gray-800 p-4 rounded-md text-black">
            <div className="header flex justify-between items-center mb-4">
              <h4 className="text-lg font-semibold text-blue-700">
                Your Response
              </h4>
              <button onClick={() => setShowHealthTips(false)}>
                <IoClose className="text-red-500 text-xl h-6 w-6 bg-red-200 p-1 rounded-md" />
              </button>
            </div>
            <div
              className="messages-container hidden-scrollbar rounded-md shadow-md h-80 overflow-y-auto"
              ref={chatContainerRef}
            >
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`message-item p-2 rounded-md mb-4 text-black ${
                    message.sender === "user" ? "bg-blue-100" : "bg-gray-100"
                  }`}
                >
                  <div>{message.message}</div>
                  <div className="text-xs text-gray-500 text-right pt-2">
                    {message.sentTime}
                  </div>
                </div>
              ))}
              {retryAfter > 0 && (
                <p className="text-red-500 mt-2">
                  Too many requests. Retrying in {retryAfter} seconds...
                </p>
              )}
              {isTyping && (
                <p className="text-gray-500 mt-2">HealthSync.ai is typing...</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthStatus;
