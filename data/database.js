import mongoose from "mongoose";

export const connectDB = () => {
    mongoose
    ?.connect(process.env.MONGO_URI, {
      dbName: "backendapi",
    })
    .then(() => {
      console.log("conectct ed data bsse ");
    })
    .catch((e) => {
      console.log("databse connected error", e);
    });  
};