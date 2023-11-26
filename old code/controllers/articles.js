import axios from "axios"
import articlesModel from "../models/articles.js"

export const saveArticles = async (req, res) => {
    try {
        const response = await axios.get('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@Oakchain')
        const newArticles = await articlesModel.insertMany(response.data.items)
        console.log(newArticles)
        return res.status(200).json({
            success: true,
            data: newArticles,
            message: "All articles fetched successfully"
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json(
            {
                success: false,
                message: 'Internal server error'
            }
        )

    }

}

export const fetchAllArticles = async (req, res) => {
    try {
        const response = await articlesModel.find()
        console.log(response)
        res.status(200).json({
            success: true,
            data: response,
            message: "All articles fetched successfully"
        })

    } catch (err) {
        console.log(err)
        res.status(500).json(
            {
                success: false,
                message: 'Internal server error'
            }
        )
    }
}


export const fetchSingleArticle = async (req, res) => {
    const { id } = req.params
    console.log(id)
    try {
        const response = await articlesModel.findOne({ _id: id })
        console.log(response)
        res.status(200).json({
            success: true,
            data: response,
            message: "All articles fetched successfully"
        })

    } catch (err) {
        console.log(err)
        res.status(500).json(
            {
                success: false,
                message: 'Internal server error'
            }
        )

    }

}