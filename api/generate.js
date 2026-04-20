export default async function handler(req, res) {
  // Разрешаем только POST-запросы
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Метод не поддерживается' });
  }

  const { prompt } = req.body;

  try {
    const response = await fetch('https://llm.api.cloud.yandex.net/foundationModels/v1/completion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Api-Key ${process.env.YANDEX_API_KEY}`
      },
      body: JSON.stringify({
        // ВАЖНО: Замени "YOUR_FOLDER_ID" на ID своего каталога из Yandex Cloud
        modelUri: "gpt://b1gpfs86tjuroeggilm6/yandexgpt-lite",
        completionOptions: {
          stream: false,
          temperature: 0.7,
          maxTokens: 2000
        },
        messages: [
          {
            role: "user",
            text: prompt
          }
        ]
      })
    });

    const data = await response.json();
    return res.status(200).json(data);
    
  } catch (error) {
    return res.status(500).json({ error: 'Ошибка сервера' });
  }
}
