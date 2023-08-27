"use client";

import { Flex } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Chat from "./components/Chat";
import InputForm from "./components/InputForm";
import { Message } from "./types/custom";
import ThreeDotsLoader from "./components/ThreeDotsLoader";
import { system_prompt } from "./constants/constants";
import { useEffect } from "react";
import Drag from "./components/Grigri/index";
import { createClient } from "@supabase/supabase-js";

const Home: NextPage = () => {
  const [chats, setChats] = useState<Message[]>([]); // 空の配列を初期値とする

  const currentUser = useRef("");

  const supabase = createClient(
    "https://znduoxdtpsjpugmsursb.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpuZHVveGR0cHNqcHVnbXN1cnNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI5NDE0ODQsImV4cCI6MjAwODUxNzQ4NH0.EMkadkV31g8zPVWUdVVzGvpOkYADVoe3WTEptsKBjb4"
  );

  useEffect(() => {
    const fetchData = async () => {
      console.log("テスト1");
      const data = await supabase.auth.getSession();
      console.log("テスト", data);
      if (data.data.session !== null) {
        // supabaseに用意されている現在ログインしているユーザーを取得する関数
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return; // ユーザーがいない場合は終了
        // currentUserにユーザーのメールアドレスを格納
        currentUser.current = user.id;
      }

      if (process.env.NODE_ENV === "development") {
        location.href = `http://localhost:3000/chat/${currentUser.current}`;
      } else {
        location.href = `http://fam-message.vercel.app/chat/${currentUser.current}`;
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    try {
      const storedChats = JSON.parse(localStorage.getItem("chats") || "[]").map(
        (chat: Message) => ({
          ...chat,
          fromStorage: true,
        })
      );
      if (storedChats.length > 0) {
        setChats(storedChats);
      } else {
        // ローカルストレージが空の場合、初期値を設定
        setChats([
          {
            role: "user",
            content: "こんにちは！はじめまして！",
            fromStorage: true,
          },
          {
            role: "assistant",
            content: "はじめまして！Famです",
            fromStorage: true,
          },
        ]);
      }
    } catch (error) {
      console.error("JSON parsing failed:", error);
    }
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    console.log("Current chats:", chats);
    if (chats.length > 0) {
      localStorage.setItem("chats", JSON.stringify(chats));
    }
  }, [chats]);

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
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      setChats((prev) => [...prev, data.result as Message]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="w-full max-w-2xl bg-white md:rounded-lg md:shadow-md p-4 md:p-10 mt-10 mb-0">
        <div className="mb-10">
          <AnimatePresence>
            {chats
              .filter((chat) => chat.role !== "system")
              .map((chat, index) => {
                return (
                  <Chat
                    role={chat.role}
                    content={chat.content}
                    key={index}
                    fromStorage={chat.fromStorage}
                  />
                );
              })}
          </AnimatePresence>
          {isSubmitting && (
            <Flex alignSelf="flex-start" px="2rem" py="0.5rem">
              <ThreeDotsLoader />
            </Flex>
          )}
        </div>
        <InputForm onSubmit={handleSubmit} />
      </div>
      <div className="h-32">
        <Drag />
      </div>
    </div>
  );
};

export default Home;
