"use client"
import React, { useEffect } from 'react'
import { FiArrowRight } from "react-icons/fi"
import { useRouter } from 'next/navigation';


import {
    useMotionTemplate,
    useMotionValue,
    motion,
    animate,
} from "framer-motion";

function Button({title, place} : {
    title: string,
    place ?: string
}) {
    const router = useRouter();
    const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];
    const color = useMotionValue(COLORS_TOP[0]);
    const border = useMotionTemplate`1px solid ${color}`;
    const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

    useEffect(() => {
        animate(color, COLORS_TOP, {
            ease: "easeInOut",
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror",
        });
    }, []);

    return (
        <div
        onClick={() => {
            {place != "" &&  router.push(`/${place}`)}
        }}
        >
            <motion.button
            style={{
                border,
                boxShadow,
            }}
            whileHover={{
                scale: 1.015,
            }}
            whileTap={{
                scale: 0.985,
            }}
            className="group relative cursor-pointer flex w-fit items-center gap-1.5 rounded-full bg-gray-950/10 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-950/50"
        >
            {title}
            <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
        </motion.button>

        </div>
    )
}

export default Button


