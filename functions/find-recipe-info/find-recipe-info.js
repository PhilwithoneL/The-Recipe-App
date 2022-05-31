// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const axios = require('axios');
require("dotenv").config();

const handler = async (event) => {
  
  const apiKey = process.env.API_KEY;

  const { id } = event.queryStringParameters

  // const id = "83391"

  // let recipe_api = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`
  
  try {

    const { data } = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`)

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
