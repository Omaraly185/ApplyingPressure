// API route to proxy events requests to the external API
// This can be used for server-side data fetching or as a proxy

export default async function handler(req, res) {
  const API_BASE_URL = 'https://applyingpressure-api-production.up.railway.app';
  
  try {
    if (req.method === 'GET') {
      // Fetch events from external API
      const response = await fetch(`${API_BASE_URL}/events`);
      const data = await response.json();
      
      res.status(200).json(data);
    } else if (req.method === 'POST') {
      // Create new event
      const response = await fetch(`${API_BASE_URL}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      });
      
      const data = await response.json();
      res.status(response.status).json(data);
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
