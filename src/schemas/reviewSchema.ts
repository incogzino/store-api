import { Schema } from "mongoose"

interface IReview {
    customer: string,
    image: string,
    productName: string,
    comment: string,
    reviewId: number,
    productId: number,
    price: string

}

const reviewSchema = new Schema<IReview>({
    customer: { type: String, required: true},
    image: {type: String, required:true},
    productName: { type: String, required: true},
    comment: {type: String, required: true},
    reviewId: {type: Number, required: true, unique: true},
    productId: {type: Number, required: true},
    price: { type: String, required: true}

    
})

 
export default reviewSchema;