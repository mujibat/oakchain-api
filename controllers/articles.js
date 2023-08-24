import axios from "axios"

export const fetchAllArticles = async (req, res) => {
    try {
        const response = await axios.get('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@Oakchain')
        // console.log(response)
        res.status(200).json({
            success: true,
            data: response.data.items,
            message: "All articles fetched successfully"
        })

    } catch (err) {
        res.status(500).json(
            {
                success: false,
                message: 'Internal server error'
            }
        )

    }

}