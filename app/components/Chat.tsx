import { Message } from "../types/custom"
import { motion } from "framer-motion"
import { Avatar, Flex } from "@chakra-ui/react"
import { useEffect, useState } from "react"

const Chat = ({ role, content }: Message) => {
    const [chatMessage, setChatMessage] = useState("")
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        if (currentIndex < content.length) {
            const timeoutId = setTimeout(() => {
                setChatMessage((prevText) => prevText + content[currentIndex])
                setCurrentIndex((prevIndex) => prevIndex + 1)
            }, 40)
            return () => {
                clearTimeout(timeoutId)
            }
        }
    }, [content, currentIndex])

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
            animate={{ opacity: 1, translateY: 0, transition: { duration: 0.3 }}}
            exit={{ opacity: 0, translateY: 0}}
        >
            <Flex
                gap="5px"
                w="full"
                flexDir={role === "assistant" ? "row" : "row-reverse"}
            >
                <Avatar
                    name={role === "user" ? "Me" : "GPT"}
                    w="35px"
                    h="35px"
                    src={
                        role === "assistant"
                            ? "https://openmoji.org/data/color/svg/1F9DE.svg"
                            : "https://openmoji.org/data/color/svg/1F473.svg"
                    }
                />
            </Flex>
        </motion.div>
    )
}

export default Chat