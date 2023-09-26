const { Configuration, OpenAIApi } = require("openai");
const OpenAI = require("openai");

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(configuration);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateImage = async (req, res) => {
  try {
    // const response = await openai.createImage({
    //   prompt: "A cat on a lonely street, anime style",
    //   n: 1, //1-10 at a time
    //   size: "512x512", //256x256, 512x512, or 1024x1024
    // });

    const image = await openai.images.generate({
      prompt: "A cute baby sea otter",
      n: 1, //1-10 at a time
      size: "512x512", //256x256, 512x512, or 1024x1024
    });

    // const image_url = response.data.data[0].url;
    const image_url = image.data[0].url;

    res.status(200).json({
      success: true,
      data: image_url,
      raw_data: image.data[0],
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res.status(400).json({
      success: false,
      error: "Generation of that kind of Image is not permitted!!",
    });
  }
};

exports.generateImage = generateImage;
