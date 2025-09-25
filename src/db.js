import mongoose from 'mongoose';

export const initMongoConnection = async (uri) => {
  await mongoose.connect(uri);
  console.log('Mongo connection successfully established');
};
