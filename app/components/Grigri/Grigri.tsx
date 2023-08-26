import * as React from "react"
import { useRef } from "react"
import { motion } from "framer-motion"

const Grigri = () => {
    const constraintsRef = useRef(null)

    return (
        <div>
        <motion.div className="absolute w-32 h-32 bg-black rounded-md top-[calc(75%-24px)] left-[calc(75%-24px)] opacity-20" ref={constraintsRef} />
        <motion.div className="absolute w-24 h-24 bg-white rounded-md top-[calc(75%-12px)] left-[calc(75%-12px)]" drag dragConstraints={constraintsRef} />
        </div>
    )
}

export default Grigri