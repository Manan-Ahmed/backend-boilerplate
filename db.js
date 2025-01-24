import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("===========DB Connection Successfull=========")
    } catch (error) {
        console.log("===========DB Connection Error=========")
    }
}

export default connectDb