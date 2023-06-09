import { NextResponse, NextRequest } from "next/server";
import { Configuration, OpenAIApi } from "openai";

export async function POST(req: NextRequest, res: NextResponse){

    const apiKey = "pk-wYlFAAQJIAwksekIwooAAlfETTfbEYwzEhXcibIxQgVnLPID"

    const configuration = new Configuration({
        apiKey: apiKey,
        basePath: "https://api.pawan.krd/v1",
    });
    
    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Can you type poetry?",
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: ["Human: ", "AI: "],
    });

    return NextResponse.json({
        body: response.data.choices[0].text
    })
}