export default async function handler(req, res) {
  // Allow requests from any origin (adjust this to your domain in production)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid request: messages array required' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY, // Loaded from Vercel environment variable
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001', // Fast and cost-effective for a chatbot
        max_tokens: 1024,
        system: `You are Aria, a friendly and professional virtual dental receptionist for SmileCare Dental. 
Your role is to:
- Warmly greet patients and answer questions about the dental practice
- Help patients understand available services (cleanings, fillings, crowns, whitening, orthodontics, etc.)
- Assist with checking insurance compatibility (ask for their insurance provider name)
- Help schedule appointments by collecting: patient name, preferred date/time, and reason for visit
- Provide general dental care information and tips

Always be warm, reassuring, and professional. Keep responses concise and conversational.
If someone has a dental emergency, always advise them to call the office directly or go to an emergency room.
Do not provide specific medical diagnoses or treatment recommendations.`,
        messages: messages,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Anthropic API error:', error);
      return res.status(response.status).json({ error: 'AI service error', details: error });
    }

    const data = await response.json();
    return res.status(200).json({ reply: data.content[0].text });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
