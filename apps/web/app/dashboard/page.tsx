"use client";
import React, { useState, useEffect } from "react";
import { Space_Grotesk } from "next/font/google";
import Nav from "app/component/nav";
import { FaArrowUp } from "react-icons/fa6";
import axios from "axios";
import Login from "app/component/login";
import { motion } from "framer-motion";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
});

const Loading = () => (
  <div className="mb-4 text-left">
    <p className="text-lg">
      <span className="inline-block p-2 rounded-lg">
        <svg className="animate-spin h-5 w-5 inline-block mr-2" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
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

type QueryItem =
  | { type: "user"; text: string }
  | {
      type: "llm";
      text: {
        title: string;
        url: string;
        text: string;
        author: string;
        reference: string;
        image: any;
        publishedDate: string;
      }[];
    };

function Child() {
  const [greeting, setGreeting] = useState("");
  const [query, setQuery] = useState<QueryItem[]>([]);
  const [input, setInput] = useState("");
  const [showChatUi, setChatUi] = useState(false);
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) setGreeting("Good morning");
    else if (hours < 17) setGreeting("Good afternoon");
    else if (hours < 21) setGreeting("Good evening");
    else setGreeting("Good night");
  }, []);

  const llm = async () => {
    try {
      const res = await axios.post("/exa", { prompt: input });
      return res.data.result.results;
    } catch (e) {
      return "Something went wrong!";
    }
  };

  const handlePromptSubmit = async () => {
    if (input.trim() !== "") {
      setChatUi(true);
      setQuery((prev) => [...prev, { text: input, type: "user" }]);
      setLoading(true);
      const res = await llm();
      setInput("");
      setTimeout(() => {
        setQuery((prev) => [...prev, { text: res, type: "llm" }]);
        setLoading(false);
      }, 3000);
    }
  };

  const renderTextWithLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, index) =>
      part.match(urlRegex) ? (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 cursor-pointer underline break-words"
        >
          {part}
        </a>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  const cleanText = (text: string) => text.replace(/[#\$]/g, "");
  const CleanDate = (text: string) => new Date(text).toLocaleString();

  return (
    <div
    className={`w-full min-h-screen px-2 md:px-10 py-5 overflow-hidden bg-neutral-900 text-white ${spaceGrotesk.className}`}
  >
  
      <Nav setLogin={setLogin} />
      {login && (
        <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-opacity-50 bg-black">
          <Login setLogin={setLogin} />
        </div>
      )}

      <div className="flex justify-center w-full">
        <div className="flex flex-col justify-start mt-36 md:mt-24 w-full md:pb-40">
          <div className="w-full max-w-screen-lg mx-auto">
            {!showChatUi && (
              <>
                <h1 className="text-2xl md:text-5xl text-center mt-10">{greeting}, Navin</h1>
                <p className="text-md md:text-2xl text-center mb-10 text-neutral-500">
                  How can I help you today?
                </p>
              </>
            )}

            {showChatUi && (
              <div className="w-full bg-black bg-opacity-50 text-white px-2 md:mb-7 mb-32 md:px-4 py-2 rounded-xl overflow-hidden">
                {query.map((item, index) => (
                  <motion.div key={index} className="mb-4">
                    {item.type === "user" ? (
                      <p className="text-left text-lg md:text-2xl">{item.text}</p>
                    ) : (
                      <div className="flex flex-col gap-4">
                        {item.text.map((res, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                            className="mt-6 flex flex-col gap-2"
                          >
                            <p className="text-xl md:text-2xl">{res.title}</p>
                            {res.image && (
                              <img
                                src={res.image}
                                alt="Result"
                                className="w-full h-[300px] md:h-[400px] mt-3 rounded-xl object-cover"
                              />
                            )}
                            <div className="text-neutral-400">{renderTextWithLinks(cleanText(res.text))}</div>
                            <div className="flex justify-between text-sm text-neutral-500">
                              <span>By {res.author}</span>
                              <span>Published: {CleanDate(res.publishedDate)}</span>
                            </div>
                            <a href={res.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                              Reference
                            </a>
                          </motion.div>
                        ))}
                      </div>
                    )}
                    <div className="h-0.5 my-2 bg-neutral-800 w-full"></div>
                  </motion.div>
                ))}
                {loading && <Loading />}
              </div>
            )}
          </div>

          <div className={`w-full flex flex-col items-center ${showChatUi ? "fixed bottom-0 left-0 py-5 pt-12" : ""}`}>
            <div className="w-full max-w-screen-md bg-neutral-900 border border-neutral-700 rounded-xl p-4">
              <textarea
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  e.currentTarget.style.height = "auto";
                  e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handlePromptSubmit();
                  }
                }}
                rows={1}
                placeholder="Ask Anything..."
                className="w-full text-sm md:text-lg bg-transparent text-white resize-none overflow-hidden focus:outline-none"
              />
              <div className="flex justify-between items-center mt-4">
                <div className="flex gap-2 flex-wrap">
                  <div className="bg-blue-950 hidden md:block text-sm rounded-2xl px-3 py-1">Be clear and specific</div>
                  <div className="bg-blue-950 text-sm rounded-2xl px-3 py-1">Beta v1</div>
                </div>
                <button
                  onClick={handlePromptSubmit}
                  disabled={!input.trim()}
                  className={`w-8 h-8 ml-2 rounded-full flex justify-center items-center ${
                    input.trim()
                      ? "bg-white hover:-translate-y-0.5 transition duration-200"
                      : "bg-neutral-800 cursor-not-allowed"
                  }`}
                >
                  <FaArrowUp color="black" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Child;
