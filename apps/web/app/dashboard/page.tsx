"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Space_Grotesk } from "next/font/google";
import Nav from "../component/nav";
import { FaSearch } from "react-icons/fa";
import { GiWorld } from "react-icons/gi";
import { GrMagic } from "react-icons/gr";
import { FaArrowUp } from "react-icons/fa6";
import axios from "axios";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
});

// Loading Component
const Loading = () => {
  return (
    <div className="mb-4 text-left">
      <p className="text-lg">
        <span className="inline-block p-2 rounded-lg">
          <svg
            className="animate-spin h-5 w-5 inline-block mr-2"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8v-8H4z"
            />
          </svg>
        </span>
      </p>
      <div className="h-0.5 my-2 bg-neutral-800 w-full"></div>
    </div>
  );
};

function page() {
  const [greeting, setGreeting] = useState("");
  const [query, setQuery] = useState([]); // Changed to array of objects
  const [input, setInput] = useState("");
  const [showChatUi, setChatUi] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();
    if (hours >= 0 && hours < 12) {
      setGreeting("Good morning");
    } else if (hours >= 12 && hours < 17) {
      setGreeting("Good afternoon"); // Fixed typo
    } else if (hours >= 17 && hours < 21) {
      setGreeting("Good evening");
    } else {
      setGreeting("Good night");
    }
  }, []);

  const llm = async () => {
    try {
      const res = await axios.post("/exa", {
        prompt: input,
      });
      console.log("LLM RESPONSE", res);
      return res.data.msg;
    } catch (e) {
      return "Something went wrong!";
    }
  };

  // Handle prompt submission
  const handlePromptSubmit = async () => {
    if (input.trim() !== "") {
      //@ts-ignore
      setQuery((prev) => [...prev, { text: input, type: "user" }]);
      setLoading(true); // Start loading
      const res = await llm();
      setInput("");
      setChatUi(true);
      // Render loading for 3 seconds, then show result
      setTimeout(() => {
        //@ts-ignore
        setQuery((prev) => [...prev, { text: res, type: "llm" }]);
        setLoading(false); // Stop loading
      }, 3000);
    }
  };

  return (
    <div
      className={`w-full px-10 py-5 min-h-screen bg-gradient-to-b from-blue-950 via-black to-black text-white ${spaceGrotesk.className}`}
    >
      <Nav />
      <div className="flex justify-center w-full h-full">
        <div className="flex flex-col items-center justify-start mt-24 h-full w-full pb-40">
          <div className="text-center w-full">
            {!showChatUi && (
              <>
                <h1 className="text-5xl">{greeting}, Navin</h1>
                <p className="text-2xl text-neutral-500">
                  How can I help you today?
                </p>
              </>
            )}
            {showChatUi && (
              <div className="w-[1000px] bg-gradient-to-r from-black via-black to-blue-950 text-white px-4 py-2 rounded-xl mx-auto">
                {query.map((item, index) => (
                  <div key={index} className="mb-4">
                    <p
                      className={`text-lg ${
                        item.type === "user" ? "text-left" : "text-left"
                      }`}
                    >
                      <span
                        className={`inline-block p-2 rounded-lg ${
                          item.type === "user" ? "" : ""
                        }`}
                      >
                        {loading}
                        {item.text}
                      </span>
                    </p>
                    <div className="h-0.5 my-2 bg-neutral-800 w-full"></div>
                  </div>
                ))}
                {loading && <Loading />} {/* Render loading component */}
              </div>
            )}
          </div>

          <div className="fixed bottom-0 left-0 w-full bg-black bg-opacity-80 py-5 px-10 flex flex-col items-center">
            <div className="border w-[700px] pb-10 pt-4 px-4 border-neutral-700 rounded-xl">
              <div className="flex gap-2">
                <input
                  onChange={(e) => setInput(e.target.value)}
                  value={input}
                  type="text"
                  placeholder="What do you want to know?"
                  className="focus:outline-none w-full h-full bg-transparent text-white"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") handlePromptSubmit();
                  }}
                />
                <span
                  onClick={handlePromptSubmit}
                  className={`w-7 h-7 rounded-full flex justify-center items-center ${
                    input !== ""
                      ? "bg-white cursor-pointer hover:-translate-y-0.5 transition-all duration-200 ease-in-out"
                      : "bg-neutral-800 cursor-not-allowed"
                  }`}
                >
                  <FaArrowUp color="black" />
                </span>
              </div>
            </div>

            <div className="mt-5 text-black text-center items-center justify-center flex flex-wrap gap-4">
              <div className="bg-white flex items-center gap-2 p-3 rounded-xl cursor-pointer hover:bg-neutral-200 transition-all duration-150 ease-in-out">
                <FaSearch />
                <span>Research</span>
              </div>
              <div className="bg-white flex items-center gap-2 p-3 rounded-xl cursor-pointer hover:bg-neutral-200 transition-all duration-150 ease-in-out">
                <GiWorld />
                <span>Get latest news around world</span>
              </div>
              <div className="bg-white flex items-center gap-2 p-3 rounded-xl cursor-pointer hover:bg-neutral-200 transition-all duration-150 ease-in-out">
                <GrMagic />
                <span>Edit Image</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;