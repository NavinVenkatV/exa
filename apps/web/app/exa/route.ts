import { NextRequest, NextResponse } from "next/server";
import Exa from "exa-js";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { prisma } from "@repo/db";

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

    return NextResponse.json({msg : "here is your response"})

    //FInding User
    const user = await prisma.user.findUnique({
        where: {
            email: userEmail
        }
    })
    if (!user) {
        return NextResponse.json({ msg: "User Not Found" }, { status: 401 })
    }

    try {
        //getting result from exa api
        const result = await exa.searchAndContents(
            prompt, {
            text: { "maxCharacters": 1000 }
        })

        //Format the result into a string
        const formattedResult = result.results.map(r => r.text).join('\n\n');

        //Finding if users last Chat
        const lastChat = await prisma.chat.findFirst({
            where: {
                userId: user.id,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        //Finding is user is starting fresh prompt 
        const isFreshChat = !lastChat ||
            (new Date().getTime() - new Date(lastChat.updatedAt).getTime()) > 15 * 60 * 1000

        if (!isFreshChat) {
            // Add messages to existing chat
            await prisma.messages.create({
                data: {
                    chatId: lastChat.id,
                    content: formattedResult,
                    sender: "ai"
                }
            })

            await prisma.messages.create({
                data: {
                    chatId: lastChat.id,
                    content: prompt,
                    sender: "user"
                }
            })

            return NextResponse.json({ 
                message: "Added to existing chat",
                chatId: lastChat.id 
            })

        } else {
            // Create new chat and add messages
            const newChat = await prisma.chat.create({
                data: {
                    userId: user.id,
                    query: prompt
                }
            })

            await prisma.messages.create({
                data: {
                    chatId: newChat.id,
                    content: formattedResult,
                    sender: "ai"
                }
            })

            await prisma.messages.create({
                data: {
                    chatId: newChat.id,
                    content: prompt,
                    sender: "user"
                }
            })

            return NextResponse.json({ 
                message: "Created new chat",
                chatId: newChat.id 
            })
        }
    } catch (e) {

        console.error("Error in exa route:", e)
        return NextResponse.json({ 
            error: "Something went wrong",
            details: e instanceof Error ? e.message : "Unknown error"
        }, { status: 500 })
        
    }
}