import { model } from "mongoose"
import reviewSchema from "../schemas/reviewSchema"

const Review = model('reviews', reviewSchema)

export default Review;