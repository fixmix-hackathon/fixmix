"use client";

import { Flex } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Chat from "../components/Chat";
import ThreeDotsLoader from "../components/ThreeDotsLoader";
import InputForm from "../components/InputForm";
import { Message } from "../types/custom";
import { createClient } from "@supabase/supabase-js";
import { getUser } from "../utils/getUser";

const supabase = createClient(
  "https://znduoxdtpsjpugmsursb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpuZHVveGR0cHNqcHVnbXN1cnNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI5NDE0ODQsImV4cCI6MjAwODUxNzQ4NH0.EMkadkV31g8zPVWUdVVzGvpOkYADVoe3WTEptsKBjb4"
);

const ChatPage: NextPage = () => {
  // メッセージの状態を管理
  const [chats, setChats] = useState<Message[]>([]);
  // メッセージ送信中かどうかを管理
  const [isSubmitting, setIsSubmitting] = useState(false);
  // 現在のユーザーIDを管理
  const [userId, setUserId] = useState("");

  // ユーザーIDを取得
  useEffect(() => {
    async () => {
      const userid = await getUser();
      if (!userid) return;
      setUserId(userid);

      console.log("テスト", userid);
      //   setUserId(data?.data.user?.id);
    };
  }, []);

  // ユーザーIDに基づいてチャットデータを取得
  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      const { data, error } = await supabase
        .from("chats")
        .select("*")
        .eq("user_id", userId);
      console.log(userId);
      if (error) {
        console.error("Error fetching data: ", error);
      } else {
        setChats(data);
      }
    };
    fetchData();
  }, [userId]);

  // メッセージを送信する処理
  const handleSubmit = async (message: Message) => {
    try {
      setIsSubmitting(true);
      setChats((prev) => [...prev, message]);

      // Python Flaskサーバーにデータを送信
      const response = await fetch("http://localhost:5000/api/save_chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          content: message.content,
          role: message.role,
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      // 成功した場合、新しいメッセージを追加
      setChats((prev) => [...prev, data.result as Message]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white md:rounded-lg md:shadow-md p-4 md:p-10 my-10">
      <div className="mb-10">
        <AnimatePresence>
          {/* メッセージを表示 */}
          {chats.map((chat, index) => {
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
        {/* ローディング表示 */}
        {isSubmitting && (
          <Flex alignSelf="flex-start" px="2rem" py="0.5rem">
            <ThreeDotsLoader />
          </Flex>
        )}
      </div>
      {/* 入力フォーム */}
      <InputForm onSubmit={handleSubmit} />
    </div>
  );
};

export default ChatPage;
