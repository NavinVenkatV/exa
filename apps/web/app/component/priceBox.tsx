import React from "react";
import Button from "./ui/Button";

interface Typess {
    title1: string;
    title2: string;
    context: string[];
    price: string
}

function PriceBox({ title1, title2, context, price }: Typess) {
    return (
        <div className={`text-white border-1 bg-black border-black ${title1 === "Premium" && 'border-orange-700 border-3'} mt-10 p-10 rounded-xl w-[400px] h-[400px]"}`}>
            <div className="flex justify-between">
                <p className="text-neutral-500 text-xl">{title1}</p>
                {title1 === 'Premium' && <p className="bg-neutral-800 px-2 rounded-full flex items-center text-sm font-bold">Recommended</p>}
            </div>
            <p className="text-sm mt-3 ">{title2}</p>
            <div className="mt-7">
                <div className="flex justify-between items-center">
                    <p className="text-5xl">{price}</p>
                    <div className="shrink-0">
                        <button
                            className="bg-white px-4 py-2 rounded-full text-black text-base cursor-pointer
                 hover:-translate-y-0.5 transition-all duration-200 ease-in-out"
                        >
                            Buy Plan
                        </button>
                    </div>
                </div>

                <p className="h-0.5 mt-5 bg-neutral-700 w-full"></p>
            </div>
            <div className="mt-6 ">
                <div className="flex flex-col gap-2">
                    {context.map((item, index) => (
                        <div key={index} className="flex gap-2">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M20 6L9 17L4 12"
                                    stroke="green"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <p>{item}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PriceBox;