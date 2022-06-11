
const axios = require('axios');
require("dotenv").config();

const handler = async (event) => {
  
  const apiKey = process.env.API_KEY;

  const { id } = event.queryStringParameters
  
  try {

    const { data } = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`)

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
