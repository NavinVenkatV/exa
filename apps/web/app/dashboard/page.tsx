"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Space_Grotesk } from "next/font/google";
import Nav from "app/component/nav";
// import { FaSearch } from "react-icons/fa";
// import { GiWorld } from "react-icons/gi";
// import { GrMagic } from "react-icons/gr";
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

type QueryItem =
  { type: "user"; text: string } |
  {
    type: "llm"; text: {
      title: string; url: string;
      text: string; author: string; reference: String; image: any; publishedDate: string
    }[]
  };


function Child() {
  const [greeting, setGreeting] = useState("");
  const [query, setQuery] = useState<QueryItem[]>([]); // Changed to array of objects
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
      console.log("LLM RESPONSE", res.data.result.results);
      return res.data.result.results;

    } catch (e) {
      return "Something went wrong!";
    }
  };

  const handlePromptSubmit = async () => {
    if (input.trim() !== "") {
      setChatUi(true);
      //@ts-ignore
      setQuery((prev) => [...prev, { text: input, type: "user" }]);
      setLoading(true);
      const res = await llm();
      setInput("");
      setTimeout(() => {
        //@ts-ignore
        setQuery((prev) => [...prev, { text: res, type: "llm" }]);
        setLoading(false); // Stop loading
      }, 3000);
    }
  };

  function renderTextWithLinks(text: string) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 cursor-pointer underline break-words"
          >
            {part}
          </a>
        );
      } else {
        return <span key={index}>{part}</span>;
      }
    });
  }
  function cleanText(text: string) {
    const cleanedText = text.replace(/[#\$]/g, '');
    return cleanedText;
  }

  function CleanDate(text: string) {
    const format = new Date(text);
    return format.toString();
  }


  return (
    <div
      className={`w-full h-screen px-10 py-5  overflow-hidden bg-gradient-to-b from-blue-950 via-black to-black text-white ${spaceGrotesk.className}`}
    >
      <Nav />
      <div className="flex justify-center w-full h-full">
        <div className="flex flex-col justify-start mt-24 h-full w-full pb-40">
          <div className="w-full">
            {!showChatUi && (
              <>
                <h1 className="text-5xl text-center mt-10">{greeting}, Navin</h1>
                <p className="text-2xl text-center mb-10 text-neutral-500">
                  How can I help you today?
                </p>
              </>
            )}
            {showChatUi && (
              <div className="w-[1000px] bg-gradient-to-r from-black via-black to-blue-950 text-white px-4 py-2 rounded-xl mx-auto">
                {query.map((item, index) => (
                  <div key={index} className="mb-4">
                    {item.type === "user" ? (
                      <p className="text-left text-lg">{item.text}</p>
                    ) : (
                      <div className="flex flex-col gap-4">
                        {item.text.map((res, i) => (
                          <div key={i} className="flex justify-start mt-7 flex-col gap-2">
                            <p className="text-3xl text-white">{res.title}</p>
                            {res.image && <img src={res.image} alt="Image" className="w-auto h-[400px] mt-5 rounded-xl items-center flex justify-center object-cover" />}
                            <div className="text-neutral-500 mt-4">
                              {renderTextWithLinks(cleanText(res.text))}
                            </div>
                            <div className="w-full flex justify-between items-center"> 
                              <p className="text-sm text-neutral-400">By {res.author}</p>
                              <p className="text-neutral-500 text-sm"><span className="text-white">Published:</span> {CleanDate(res.publishedDate)}</p>
                            </div>
                            <a href={res.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">Reference</a>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="h-0.5 my-2 bg-neutral-800 w-full"></div>
                  </div>
                ))}

                {loading && <Loading />} {/* Render loading component */}
              </div>
            )}
          </div>

          <div className={`${showChatUi && 'fixed bottom-0 left-0 py-5 pt-12 '}w-full  bg-opacity-80  flex flex-col items-center`}>
            <div className="border w-[700px] bg-neutral-900 py-2 p-4 border-neutral-700 rounded-xl">
              <div className="flex items-center gap-2">
                <input
                  onChange={(e) => setInput(e.target.value)}
                  value={input}
                  type="text"
                  placeholder="What do you want to know?"
                  className="focus:outline-none w-full h-full text-white"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") handlePromptSubmit();
                  }}
                />
                <span
                  onClick={handlePromptSubmit}
                  className={`w-7 h-7 rounded-full flex justify-center items-center ${input !== ""
                    ? "bg-white cursor-pointer hover:-translate-y-0.5 transition-all duration-200 ease-in-out"
                    : "bg-neutral-800 cursor-not-allowed"
                    }`}
                >
                  <FaArrowUp color="black" />
                </span>
              </div>
            </div>

            {/* <div className="mt-5 text-black text-center items-center justify-center flex flex-wrap gap-4">
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
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Child;