const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const prompt = async (prompt) => {
    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });
        return completion.data.choices[0].text;
    } catch (e) {
        return e
    }
}

module.exports = prompt;
