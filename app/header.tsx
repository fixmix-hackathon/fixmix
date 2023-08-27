"use client";

import React, { useState, useEffect } from "react"
import { siteTitle } from "./constants/constants"
import Link from "next/link"

const Header = () => {
    const [showHeader, setShowHeader] = useState(true)

    useEffect(() => {
        const handleScroll = () => {

        const currentScrollPos = window.scrollY

        if (currentScrollPos > 1200) {
            setShowHeader(false)
        } else {
            setShowHeader(true)
        }
        }

        window.addEventListener("scroll", handleScroll)

        return () => {
        window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    return (
        <header
        className={`relative py-5 bg-white shadow-md ${
            showHeader ? "sticky top-0 z-10" : "hidden"
        }`}
        >
        <div className="flex justify-between px-8">
            <Link
            href="/"
            className="text-md md:text-1xl text-gray-600 font-semibold whitespace-pre-line"
            >
            {siteTitle}
            </Link>
            <Link
            href="/login"
            className="text-md md:text-1xl text-gray-600 font-semibold whitespace-pre-line"
            >
            ログイン
            </Link>
        </div>
        </header>
    )
}

export default Header
