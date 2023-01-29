import express from "express";
import cors from 'cors';
import { Configuration, OpenAIApi } from "openai";

const app = express()
app.use(cors())
app.use(express.json())

const config = new Configuration({
    apiKey: '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'
})
const openai = new OpenAIApi(config)
app.get('/', async(req, res) => {
    res.status(200).send({
        'message': 'Use chat for Open AI'
    })
})
app.post('/chat', async (req, res) => {
    const text = req.body.text;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: text,
        temperature: 0,
        max_tokens: 3000,
        top_p:1,
        frequency_penalty: 0.5,
        presence_penalty: 0

    })
    res.status(200).send({
        'message': response.data.choices[0].text
    })
})

app.listen(5000, () => console.log('AI server started on http://localhost:5000'))