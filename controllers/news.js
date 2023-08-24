import axios from "axios"

export const fetchNews = async (req, res) => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/news')
        res.status(200).json({
            success: true,
            data: response.data
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}
