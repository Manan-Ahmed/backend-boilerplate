import mongoose from 'mongoose';
const { Schema } = mongoose;

const BlogSchema = new Schema({
    title: String,
    description: String,
    tag: String,
    image: String,
    user: {
        type: mongoose.Types.ObjectId
    }
})

const Blog = mongoose.model('Blog', BlogSchema);
export default Blog