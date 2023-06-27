const openai = require('../../config/openai/openai.config');

async function getSummary (req, res, next) {
    const { company, docUrl, docType } = req.body;
    try {
        // const reqStart = Date.now();
        const response = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: `Extract and explain the most important points from ${company}'s ${docType}: ${docUrl}`,
          max_tokens: 4000,
          temperature: 0,
        });
        // const reqEnd = Date.now();
        const text = response.data.choices[0].text;
        const textList = text.split("\n\n").filter((sent) => sent !== "");
        res.status(200).json({
            text: textList,
            docType,
            company,
            docUrl
        });  
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getSummary
}