import { Schema } from "mongoose"

interface IReview {
    customer: String,
    productName: String,
    comment: String,
    reviewId: Number,
    productId: Number

}

const reviewSchema = new Schema<IReview>({
    customer: { type: String, required: true},
    productName: { type: String, required: true},
    comment: {type: String, required: true},
    reviewId: {type: Number, required: true, unique: true},
    productId: {type: Number, required: true, unique: true}

    
})

 
export default reviewSchema;