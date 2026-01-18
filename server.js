import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: "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" // <-- Replace with your API key
});

// Professional AI response endpoint
app.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) return res.status(400).json({ reply: "Please send a message." });

  try {
    const prompt = `
You are SinaFast AI, a professional assistant for Sinachi Franklin Ezeonyeka's portfolio website.
You respond politely, professionally, and concisely.
You know about:
- Services: Web Development, Web Design, Graphics Design
- Skills: HTML, CSS, JavaScript, Bootstrap, React
- Portfolio: Projects, Certificates, Highlights
- Contact info: Email ezeonyekasinachi@gmail.com
- How to hire: Explain briefly
Greet the user if they say hi/hello. Be helpful if they ask "Help" or "How to use".
Respond naturally to any question related to this portfolio.

User: ${message}
AI:
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 300,
    });

    const reply = completion.choices[0].message.content.trim();
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Sorry, I’m having trouble connecting to the AI. Please try again later." });
  }
});

app.listen(3000, () => console.log("SinaFast AI backend running on http://localhost:3000"));
