import { NextRequest, NextResponse } from "next/server";
import Exa from "exa-js";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../lib/auth";
// import { prisma } from "@repo/db";

const exa = new Exa(process.env.EXA_API_KEY)
// console.log(exa)

//accepting user prompt and sending to exa api & recieving result
export async function POST(req: NextRequest) {
    // const session = await getServerSession(authOptions)
    // const userEmail = session?.user?.email;

    // if (!session || !userEmail) {
    //     return NextResponse.json({ msg: "UnAuthorised" }, { status: 401 })
    // }

    const { prompt } = await req.json();
    if (!prompt) {
        return NextResponse.json({ msg: "Prompt required" }, { status: 400 })
    }


    //FInding User
    // const user = await prisma.user.findUnique({
    //     where: {
    //         email: "vnavinvenkat@gmail.com"
    //     }
    // })
    // if (!user) {
    //     return NextResponse.json({ msg: "User Not Found" }, { status: 401 })
    // }

    try {
        const result = await exa.searchAndContents(
            prompt, {
            text: { "maxCharacters": 500 }
        })
        
        return NextResponse.json({ 
            message: "Created new chat",
            result: result
        })

        // const lastChat = await prisma.chat.findFirst({
        //     where: {
        //         userId: user.id,
        //     },
        //     orderBy: {
        //         createdAt: 'desc',
        //     },
        // });

        // const isFreshChat = !lastChat ||
        //     (new Date().getTime() - new Date(lastChat.updatedAt).getTime()) > 15 * 60 * 1000

        // if (!isFreshChat) {
        //     await prisma.messages.create({
        //         data: {
        //             chatId: lastChat.id,
        //             content: result,
        //             sender: "ai"
        //         }
        //     })

        //     await prisma.messages.create({
        //         data: {
        //             chatId: lastChat.id,
        //             content: prompt,
        //             sender: "user"
        //         }
        //     })

        //     return NextResponse.json({ 
        //         message: "Added to existing chat",
        //         result: formattedResult
        //     })

        // } else {
        //     const newChat = await prisma.chat.create({
        //         data: {
        //             userId: user.id,
        //             query: prompt
        //         }
        //     })

        //     await prisma.messages.create({
        //         data: {
        //             chatId: newChat.id,
        //             content: formattedResult,
        //             sender: "ai"
        //         }
        //     })

        //     await prisma.messages.create({
        //         data: {
        //             chatId: newChat.id,
        //             content: prompt,
        //             sender: "user"
        //         }
        //     })

           
        // }
    } catch (e) {

        console.error("Error in exa route:", e)
        return NextResponse.json({ 
            error: "Something went wrong",
            details: e instanceof Error ? e.message : "Unknown error"
        }, { status: 500 })
        
    }
}