const express = require('express');
const cors = require('cors'); // Import the cors package

const app = express();
const port = 3000;

const API_URL = 'http://20.244.56.144/test/companies/AMZ/categories/Laptop/products?top=10&minPrice=1&maxPrice=10000';
const BEARER_TOKEN ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIwODU2OTYyLCJpYXQiOjE3MjA4NTY2NjIsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjM3OTE4MGZjLWI4YmEtNDY0Yi05Yjk5LTk5MWU4OWQyZDYxNiIsInN1YiI6ImxvZ2VzaGJvb3BhdGhpNzJAZ21haWwuY29tIn0sImNvbXBhbnlOYW1lIjoic3JpU2hha3RoaSIsImNsaWVudElEIjoiMzc5MTgwZmMtYjhiYS00NjRiLTliOTktOTkxZTg5ZDJkNjE2IiwiY2xpZW50U2VjcmV0IjoicFRBVkpjdnNUUmxIT0hTWSIsIm93bmVyTmFtZSI6IkxvZ2VzaCBCb29wYXRoaSIsIm93bmVyRW1haWwiOiJsb2dlc2hib29wYXRoaTcyQGdtYWlsLmNvbSIsInJvbGxObyI6IjcxNDAyMTEwNjA0NiJ9.fNoWxNbWSvpWXPvvx5-X7bR7U0-n1HHXlCqzzmBVSvY'


app.use(cors());

app.get('/fetch-products', async (req, res) => {
  try {
    const fetch = await import('node-fetch');

    const response = await fetch.default(API_URL, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${BEARER_TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
