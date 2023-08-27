import { NextApiRequest, NextApiResponse } from "next"
import OpenAI from "openai"
// 発行したAPI Keyを使って設定を定義
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (!process.env.OPENAI_API_KEY) {
        res.status(500).json({
            error: {
                message:
                    "OpenAI API key not configured, please follow instructions in README.md",
            },
        })
        return
    }

    // GPTに送るメッセージを取得
    const message = req.body.message;

    const model = process.env.OPENAI_API_MODEL as string;

    try {
        // APIとやり取り
        const completion = await openai.chat.completions.create({
            model: model,
            messages: message,
            temperature: 1.0,
            max_tokens: 700,
        })
        // GPTの返答を取得
        const completionMessage = completion.choices[0]?.message

        if (completionMessage) {
            res.status(200).json({ result: { role: "assistant", content: completionMessage.content } })
        } else {
            res.status(500).json({ error: { message: "Unexpected response from OpenAI API" } })
        }
    } catch (error: any) {
        if (error.response) {
            console.error(error.response.status, error.response.data)
            res.status(error.response.status).json(error.response.data)
        } else {
            console.error(`Error with OpenAI API request: ${error.message}`)
            res.status(500).json({
                error: {
                    message: "リクエストに失敗しました。",
                },
            })
        }
    }
}