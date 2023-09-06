import { Message } from "../types/custom"
import { motion } from "framer-motion"
import { Avatar, Flex } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import * as marked from 'marked'
import Prism from 'prismjs'
import 'prismjs/themes/prism.css'// または好きなテーマ
import CopyToClipboardButton from "./CopyToClipboardButton"
import hljs from 'highlight.js'
// githubスタイルを導入する
import 'highlight.js/styles/github.css'
import Image from 'next/image'
import localImage from "../../public/famAvatarImg.png"
import styles from './CodeBlock.module.css'

marked.setOptions({
    highlight: function(code, lang) {
        if (lang && hljs.getLanguage(lang)) {
            return hljs.highlight(lang, code).value;
        }
        return hljs.highlightAuto(code).value
    },
    langPrefix: 'language-', 
});

const Chat = ({ role, content, fromStorage }: Message) => {
    const [chatMessage, setChatMessage] = useState("")
    const [currentIndex, setCurrentIndex] = useState(0)
    const [showClipboard, setShowClipboard] = useState(false)

    useEffect(() => {
        console.log('fromStorage:', fromStorage);
        if (fromStorage) {
            setChatMessage(content);
        } else if (currentIndex < content.length) {
            const isNextPunctuation = [",", "。", "、", "!", "！", "？", "?"].includes(content[currentIndex - 1] || "")

            const isEnglish = /^[a-zA-Z\s]+$/.test(content[currentIndex])
            
            const delay = isNextPunctuation ? 280 : isEnglish ? 20 : 45

            const timeoutId = setTimeout(() => {
                setChatMessage((prevText) => prevText + content[currentIndex])
                setCurrentIndex((prevIndex) => prevIndex + 1)
            }, delay)
            return () => {
                clearTimeout(timeoutId)
            }
        }
        if (chatMessage === content) {
            setShowClipboard(true);
        }
    }, [content, currentIndex, fromStorage, chatMessage])

    // useEffect(() => {
    //     Prism.highlightAll();
    // }, [chatMessage, content]);
    
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
            animate={{ opacity: 1, translateY: 0, transition: { duration: 0.6 }}}
            exit={{ opacity: 0, translateY: 0}}
        >
            <Flex
                gap="5px"
                w="full"
                flexDir={role === "assistant" ? "row" : "row-reverse"}
            >
                <Avatar
                    name={role === "user" ? "Me" : "Fam"}
                    w="auto"
                    h="55px"
                    src={
                        role === "assistant"
                            ? "/fam_logo (100 × 100 px).png"
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
                            <Flex
                                alignSelf="flex-end"
                            >
                            {showClipboard && (
                                <CopyToClipboardButton textToCopy={chatMessage} />
                            )}
                            </Flex>
                            ファム
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
                    { role === "assistant" ? 
                    <div
                        dangerouslySetInnerHTML={{ __html: marked.parse(chatMessage) }}
                        className={styles.markdown}
                    />
                    : <div dangerouslySetInnerHTML={{ __html: marked.parse(content) }} /> }
                </Flex>
            </Flex>
        </motion.div>
    )
}

export default Chat