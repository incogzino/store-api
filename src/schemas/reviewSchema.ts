import { Schema } from "mongoose"

interface IReview {
    customer: string,
    productName: string,
    comment: string,
    reviewId: number,
    productId: number

}

const reviewSchema = new Schema<IReview>({
    customer: { type: String, required: true},
    productName: { type: String, required: true},
    comment: {type: String, required: true},
    reviewId: {type: Number, required: true, unique: true},
    productId: {type: Number, required: true}

    
})

 
export default reviewSchema;