import { Message } from "../types/custom"
import { motion } from "framer-motion"
import { Flex } from "@chakra-ui/react"

const Chat = ({ role, content }: Message) => {
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
            </Flex>
        </motion.div>
    )
}
}

export default Chat