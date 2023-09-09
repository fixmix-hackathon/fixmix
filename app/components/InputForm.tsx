import React, { useRef } from 'react';
import { Message } from '../types/custom';

type InputFormProps = {
  onSubmit: (message: Message) => Promise<void>;
};

const InputForm = ({ onSubmit }: InputFormProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const inputValue = textareaRef.current?.value;

    if (inputValue) {
      onSubmit({
        role: 'user',
        content: inputValue,
      });
      textareaRef.current.value = '';
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center p-4 border-t border-gray-200"
    >
      <textarea
        ref={textareaRef}
        className="flex-grow text-gray-600 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-blue-300"
        placeholder="メッセージを入力..."
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault(); // デフォルトの改行動作をキャンセル
            handleSubmit(e); // 送信処理を呼び出す
            console.log('Enter key pressed!!!');
          }
        }}
      />
      <button
        type="submit"
        className="group relative px-4 py-2 overflow-hidden rounded-lg bg-white text-lg shadow font-mono ml-4 px-4 py-2 text-black "
      >
        <div className="absolute inset-0 w-1.5 bg-amber-300 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
        <span className="relative text-black-600 font-semibold md:text-1xl group-hover:text-white">
          送信
        </span>
      </button>
    </form>
  );
};

export default InputForm;
