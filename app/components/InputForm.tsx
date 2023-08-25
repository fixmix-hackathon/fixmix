import React, { useRef } from "react";
import { Message } from "../types/custom";

type InputFormProps = {
    onSubmit: (message: Message) => Promise<void>
};

const InputForm = ({ onSubmit }: InputFormProps) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const inputValue = textareaRef.current?.value

        if (inputValue) {
        onSubmit({
            role: "user",
            content: inputValue,
        });
        textareaRef.current.value = ""
        }
    }

    return (
        <form
        onSubmit={handleSubmit}
        className="flex items-center p-4 border-t border-gray-200"
        >
            <textarea
                ref={textareaRef}
                className="flex-grow text-gray-600 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-blue-300"
                placeholder="メッセージを入力..."
            />
        <button
            type="submit"
            className="text-black"
        >
            送信
        </button>
        </form>
    )
}

export default InputForm;