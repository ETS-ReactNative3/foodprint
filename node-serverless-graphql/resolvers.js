const { getCarbonFootprintFromImage, getCarbonFootprintFromName } = require('./carbon-footprint/carbon_footprint_calculation');
const { getCarbonFootprintFromBarcode } = require('./carbon-footprint/barcode');

const VisionAPI = require('./datasources/vision');
const credentials = require('./credentials/carbon-7fbf76411514.json');
const visionAPI = new VisionAPI(credentials);

const resolvers = {
  Query: {
    _: () => {
    },
  },
  Mutation: {
    postPicture: async (parent, { file }, context) => {
      // if (!context.user) {
      // Throw a 403 error instead of "ERROR", to provide more meaning to clients
      //   throw new Error('you must be logged in');
      // }

      console.log({ context, parent });
      const image = new Buffer(file.base64, 'base64'); // Decode base64 of "file" to image
      console.log('Received picture');
      const { item, carbonFootprintPerKg } = await getCarbonFootprintFromImage(visionAPI, image);
      const response = {
        product: {
          name: item,
        },
        carbonFootprintPerKg,
      };
      console.log({ 'Returning': response });
      return response;
    },
    postBarcode: async (parent, { barcode }, context) => {
      console.log({ context, parent });
      console.log(`Received barcode: ${barcode}`);
      const { item, carbonFootprintPerKg } = await getCarbonFootprintFromBarcode(barcode)
      const response = {
        product: {
          name: item,
        },
        carbonFootprintPerKg,
      };
      console.log({ 'Returning': response });
      return response
    },
    postCorrection: async (parent, { name }) => {
      console.log({ 'Received correction': name });
      const { item, carbonFootprintPerKg } = await getCarbonFootprintFromName(name);
      const response = {
        product: {
          name: item,
        },
        carbonFootprintPerKg,
      };
      console.log({ 'Returning': response });
      return response;
    },
  },
};

module.exports = resolvers;
