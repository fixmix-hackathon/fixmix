"use client";

import * as React from "react";
import { useState } from "react";
import Grigri from "./Grigri";

const Drag = () => {
    const [count, setCount] = useState(0);
    return (
        <div className="relative h-2/4 right-8">
            <div>
            <Grigri key={count} />
            </div>
        </div>
        );
    };

export default Drag;