export default async function handler(req, res) {
    const YANDEX_API_KEY = process.env.YANDEX_API_KEY;
    const FOLDER_ID = 'b1g11f5t6qk8rthn8c';

    // Получаем промпт из тела запроса
    const { prompt } = req.body;

    try {
        const response = await fetch('https://llm.api.cloud.yandex.net/foundationModels/v1/completion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Api-Key ${YANDEX_API_KEY}`
            },
            body: JSON.stringify({
                modelUri: `gpt://${FOLDER_ID}/yandexgpt/latest`,
                completionOptions: { stream: false, temperature: 0.9, maxTokens: 350 },
                messages: [{ role: 'user', text: prompt }]
            })
        });

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
