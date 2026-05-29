 
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY }
 
export const ContentBlockType = { Text: 'text', Image: 'image' }; 
 
export async function stream({ userId, systemPrompt, userMessage }) { 
  const messages = userMessage.map(b => ({ role: 'user', content: b.text || '' })); 
  const passThrough = new PassThrough(); 
  (async () => { 
    try { 
      const s = await groq.chat.completions.create({ model: 'llama-3.3-70b-versatile', messages: [{ role: 'system', content: systemPrompt }, ...messages], stream: true, max_tokens: 1024 }); 
      for await (const chunk of s) { const t = chunk.choices[0]?.delta?.content || ''; if (t) passThrough.write('data: ' + JSON.stringify({ text: t }) + '\n\n'); } 
      passThrough.write('data: [DONE]\n\n'); 
      passThrough.end(); 
    } catch(e) { passThrough.write('data: ' + JSON.stringify({ error: e.message }) + '\n\n'); passThrough.end(); } 
  })(); 
  return passThrough; 
} 
 
