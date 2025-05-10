const openai = require('../config/openai');
const Job = require('../models/jobmodel');

async function generateBotResponse(userMessage) {
  const jobs = await Job.find().populate('company');
  const jobInfo = jobs.map(job => {
    const companyName = job.company ? job.company.name : "Bilinmeyen Şirket";
    return `Pozisyon: ${job.title}, Şirket: ${companyName}, Açıklama: ${job.description}`;
  }).join('\n');

  const systemPrompt = `Sen öğrencilere iş, staj ve burs fırsatlarında yardımcı olan bir asistansın. Aşağıdaki ilanları dikkate alarak soruları yanıtla:\n\n${jobInfo}`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage }
    ],
    max_tokens: 500
  });

  return completion.choices[0].message.content;
}

module.exports = { generateBotResponse };
