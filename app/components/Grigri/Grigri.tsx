import * as React from "react"
import { useRef } from "react"
import { motion } from "framer-motion"

const Grigri = () => {
    const constraintsRef = useRef(null)

    return (
        <div>
        <motion.div className="absolute w-20 h-20 bg-black rounded-lg top-[calc(75%-24px)] left-[calc(80%-12px)] opacity-20" ref={constraintsRef} />
        <motion.div className="absolute w-16 h-16 bg-slate-50 rounded-lg top-[calc(75%-12px)] left-[calc(80%-6px)]" drag dragConstraints={constraintsRef} />
        </div>
    )
}

export default Grigri