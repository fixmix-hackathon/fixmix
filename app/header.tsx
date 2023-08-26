import { siteTitle } from "./constants/constants"
import Link from "next/link"

const Header = () => {
    return (
        <header
        >
        <div className="flex justify-between px-8">
            <Link
            href="/"
            className="text-sm md:text-1xl text-gray-600 font-semibold whitespace-pre-line"
            >
            {siteTitle}
            </Link>
            <Link
            href="/login"
            className="text-sm md:text-1xl text-gray-600 font-semibold whitespace-pre-line"
            >
            ログイン
            </Link>
        </div>
        </header>
    )
}

export default Header
