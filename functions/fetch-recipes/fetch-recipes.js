const axios = require('axios');
require("dotenv").config();

const handler = async (event) => {

  const { input } = event.queryStringParameters

  // const apiKey = "880d7c0a61e64e158ba654272cde54b2"

  const apiKey = process.env.API_KEY;


  try {


    const { data } = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${input}`)

    return {
      statusCode: 200,
      body: JSON.stringify(data),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }

}

module.exports = { handler }
