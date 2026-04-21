export default async function handler(req, res) {
  try {
    const { message } = req.body;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.CLAUDE_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-3-haiku-20240307",
        max_tokens: 200,
        messages: [
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({
        error: data
      });
    }

    res.status(200).json({
      reply: data.content?.[0]?.text || "Sin respuesta"
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
}
