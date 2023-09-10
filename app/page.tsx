'use client';

import { Flex } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Chat from './components/Chat';
import InputForm from './components/InputForm';
import { Message } from './types/custom';
import ThreeDotsLoader from './components/ThreeDotsLoader';
import { system_prompt } from './constants/constants';
import { useEffect } from 'react';
import Drag from './components/Grigri/index';
import { createClient } from '@supabase/supabase-js';

const Home: NextPage = () => {
  const [chats, setChats] = useState<Message[]>([]); // 空の配列を初期値とする

  useEffect(() => {
    try {
      const storedChats = JSON.parse(localStorage.getItem('chats') || '[]').map(
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
            role: 'user',
            content: 'こんにちは！はじめまして！',
            fromStorage: true,
          },
          {
            role: 'assistant',
            content:
              'はじめまして!\n私は**あなたの学習をサポートするアシスタント**です。\n\nあなたの学習を全力でサポートします。\n困ったことがあればなんでも聞いてください！\n\n下記のように、コードを出力することもできます( ^^) _U~ \n\n --- \n\n以下はPythonで連立方程式`(x+y=3)`と`(x+3y=13)`を行列計算を用いて解くコード例です。\n\n```python\nimport numpy as np\n\n# 係数行列\nA = np.array([[1, 1], [1, 3]])\n\n# 定数ベクトル\nB = np.array([3, 13])\n\n# 連立方程式を解く\nsolution = np.linalg.solve(A, B)\n\n# 解を取り出す\nx = solution[0]\ny = solution[1]\n\nprint("x =", x)\nprint("y =", y)\n```\n\nこのプログラムでは、***NumPy***ライブラリを使用して行列計算を行っています。まず、係数行列`A`と定数ベクトル`B`を定義します。次に、***np.linalg.solve***関数を使用して連立方程式を解きます。解は***solution***という配列として得られますので、それを使ってxとyを取り出し、結果を出力しています。\n\nこのコードを実行すると、x = 2.0とy = 1.0という結果が得られます。つまり、連立方程式(x+y=3)と(x+3y=13)の解はx = 2.0とy = 1.0です。\n\n --- \n\nどうですか？こんなふうに、ただし、**わたしの能力には限界がある**ので、常に正しい回答を提供できるとは限りません。\n\n私と一緒に楽しく学んでいきましょう🔥\nもちろん、相談や雑談も大歓迎です!',
            fromStorage: true,
          },
        ]);
      }
    } catch (error) {
      console.error('JSON parsing failed:', error);
    }
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    console.log('Current chats:', chats);
    if (chats.length > 0) {
      localStorage.setItem('chats', JSON.stringify(chats));
    }
  }, [chats]);

  const handleSubmit = async (message: Message) => {
    try {
      setIsSubmitting(true);
      setChats((prev) => [...prev, message]);

      // ChatGPT APIと通信
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
              .filter((chat) => chat.role !== 'system')
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
