const { OpenAI } = require('openai'); // ✅ doğru içe aktarma
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }); // ✅ instance oluştur

const Message = require('../models/messagemodel');
const Job = require('../models/jobmodel');

async function chatWithBot(req, res) {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Mesaj boş olamaz.' });

  try {
    const systemPrompt = "Sen kariyer tavsiyesi veren bir asistansın. Öğrencilerin iş, staj veya burs aramalarına yardımcı ol.";

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      max_tokens: 500
    });

    const response = completion.choices[0].message.content;

    const savedMessage = await Message.create({ userMessage: message, botResponse: response });

    res.json(savedMessage);
  } catch (err) {
    console.error("OpenAI API Hatası:", err);
    res.status(500).json({ error: 'Yanıt oluşturulamadı.', details: err.message });
  }
}

async function fetchJobs() {
  try {
    const jobs = await Job.find().populate('company');
    if (!jobs.length) {
      console.warn("Veritabanında iş ilanı bulunamadı.");
    }
  } catch (err) {
    console.error("Veritabanı Hatası:", err);
    throw err;
  }
}

module.exports = { chatWithBot, fetchJobs };
