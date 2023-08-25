"use client"

import { Flex } from "@chakra-ui/react"
import type { NextPage } from "next"
import { useState } from "react"
import Chat from "./components/Chat"
import InputForm from "./components/InputForm"
import { Message } from "./types/custom"
import ThreeDotsLoader from "./components/ThreeDotsLoader"

const Home: NextPage = () => {
  const [chats, setchats] = useState<Message[]>([
    {
      role: "system",
      content: "#", // Python側から取得？
    }
  ])

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (message: Message) => {
    try {
      setIsSubmitting(true);
      setChats((prev) => [...prev, message]);

      // ChatGPT APIと通信
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: [...chats, message].map((d) => ({
            role: d.role,
            content: d.content,
          })),
        }),
      })

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        )
      }
      setChats((prev) => [...prev, data.result as Message]);
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-2xl bg-white p-4 my-10">
    
    </div>
  );
};

export default Home
