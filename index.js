const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 10000;

app.get('/pay', async (req, res) => {
  try {
    const response = await axios.post('https://api.usegateway.net/v1/payments/', {
      name: 'Product',
      description: 'Автоматический заказ',
      pricing_type: 'fixed_price',
      local_price: {
        amount: 10,
        currency: 'USD'
      },
      redirect_url: process.env.REDIRECT_URL,
      cancel_url: process.env.REDIRECT_URL
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-api-key': process.env.API_KEY
      }
    });

    res.redirect(response.data.payment_url);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send('Ошибка при создании платежа');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
