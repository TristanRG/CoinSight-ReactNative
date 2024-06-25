const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/api/cryptocurrencies', async (req, res) => {
    try {
        const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
            headers: {
                'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY
            },
            params: {
                start: 1,
                limit: 30,
                convert: 'USD'
            }
        });

        const cryptocurrencies = response.data.data.map(crypto => ({
            id: crypto.id,
            name: crypto.name,
            symbol: crypto.symbol,
            quote: {
                usd: {
                    price: crypto.quote.USD.price,
                    percentChange1h: crypto.quote.USD.percent_change_1h,
                    percentChange24h: crypto.quote.USD.percent_change_24h,
                    percentChange7d: crypto.quote.USD.percent_change_7d
                }
            }
        }));

        res.json({ data: cryptocurrencies });
    } catch (error) {
        console.error('Error fetching cryptocurrencies:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
