import axios from 'axios';

export const fetchCryptoData = async (req, res) => {
    try {
        const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1&sparkline=false`;

        const response = await axios.get(apiUrl);

        const coins = response.data;

        const coinsWithPrices = [];

        coins.forEach((coin) => {
            const coinId = coin.id;
            const coinName = coin.name;
            const coinSymbol = coin.symbol;
            const coinPriceUSD = coin.current_price;
            const marketCapUSD = coin.market_cap;

            coinsWithPrices.push({
                id: coinId,
                name: coinName,
                symbol: coinSymbol,
                priceUSD: coinPriceUSD,
                marketCapUSD: marketCapUSD,
            });
        });

        return res.status(200).json({ data: coinsWithPrices });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'An error occurred while fetching data' });
    }
};
