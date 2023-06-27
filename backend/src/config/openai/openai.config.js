const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

module.exports = openai;