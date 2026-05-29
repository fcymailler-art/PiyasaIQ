import express from 'express';
import axios from 'axios';

const router = express.Router();

// Helper function to generate AI sentiment tag
function generateAISentiment() {
  const sentiments = ['bullish', 'bearish', 'neutral'];
  return sentiments[Math.floor(Math.random() * sentiments.length)];
}

// GET /news - Fetch latest financial news
router.get('/', async (req, res) => {
  const newsApiKey = process.env.NEWSAPI_KEY;

  if (!newsApiKey) {
    throw new Error('NEWSAPI_KEY is not configured in environment variables');
  }

  const response = await axios.get('https://newsapi.org/v2/everything', {
    params: {
      q: 'crypto OR forex OR markets',
      sortBy: 'publishedAt',
      language: 'en',
      apiKey: newsApiKey,
    },
  });

  const newsItems = response.data.articles.map(article => ({
    headline: article.title,
    source: article.source.name,
    timestamp: article.publishedAt,
    url: article.url,
    image: article.urlToImage,
    aiSentiment: generateAISentiment(),
  }));

  res.json(newsItems);
});

export default router;