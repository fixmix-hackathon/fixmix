import { Message } from "../types/custom"
import { motion } from "framer-motion"
import { Avatar, Flex } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import * as marked from 'marked';
import * as marked from 'marked'
import Prism from 'prismjs'
import 'prismjs/themes/prism.css'// または好きなテーマ

const Chat = ({ role, content, fromStorage }: Message) => {
    const [chatMessage, setChatMessage] = useState("")
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        console.log('fromStorage:', fromStorage);
        if (fromStorage) {
            setChatMessage(content);
        } else if (currentIndex < content.length) {
            const isNextPunctuation = [",", "。", "、", "!", "！", "？", "?"].includes(content[currentIndex - 1] || "")

            const isEnglish = /^[a-zA-Z\s]+$/.test(content[currentIndex])
            
            const delay = isNextPunctuation ? 280 : isEnglish ? 20 : 55

            const timeoutId = setTimeout(() => {
                setChatMessage((prevText) => prevText + content[currentIndex])
                setCurrentIndex((prevIndex) => prevIndex + 1)
            }, delay)
            return () => {
                clearTimeout(timeoutId)
            }
        }
        Prism.highlightAll();
    }, [content, currentIndex, fromStorage])

    return (
        <motion.div
            style={{
                alignSelf: role === "assistant" ? "flex-start" : "flex-end",
                width: "auto",
            }}
            initial={{
                opacity: 0,
                translateY: "100%",
            }}
            animate={{ opacity: 1, translateY: 0, transition: { duration: 1.0 }}}
            exit={{ opacity: 0, translateY: 0}}
        >
            <Flex
                gap="5px"
                w="full"
                flexDir={role === "assistant" ? "row" : "row-reverse"}
            >
                <Avatar
                    name={role === "user" ? "Me" : "GPT"}
                    w="40px"
                    h="40px"
                    src={
                        role === "assistant"
                            ? "https://openmoji.org/data/color/svg/1F9DE.svg"
                            : "https://openmoji.org/data/color/svg/1F473.svg"
                    }
                />
                <Flex
                    borderWidth={1}
                    borderColor="blue.400"
                    bg="main-bg"
                    p="0.5rem 1rem"
                    w="auto"
                    mt="16"
                    rounded={
                        role === "assistant" ? "0 20px 20px 20px" : "20px 0 20px 20px"
                    }
                    fontSize={{ base: "8px", md: "18px" }}
                    flexDir="column"
                    color="black"
                >
                    {role === "assistant" && (
                        <Flex
                            alignSelf="flex-start"
                            fontStyle="italic"
                            opacity={0.4}
                            fontSize="8px"
                            as="small"
                            fontWeight={500}
                            color="black"
                        >
                            GPT
                        </Flex>
                    )}
                    { role === "user" && (
                        <Flex
                            alignSelf="flex-start"
                            fontStyle="italic"
                            opacity={0.4}
                            fontSize="8px"
                            as="small"
                            fontWeight={500}
                            color="black"
                        >
                            あなた
                        </Flex>
                    )}
                    { role === "assistant" ? <div dangerouslySetInnerHTML={{ __html: marked.parse(chatMessage) }} />
                    : <div dangerouslySetInnerHTML={{ __html: marked.parse(content) }} /> }
                </Flex>
            </Flex>
        </motion.div>
    )
}

export default Chat