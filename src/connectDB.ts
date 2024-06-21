import mongoose from "mongoose";
import Product from "./models/productsModel";
import Review from "./models/reviewModel";
import { IProducts } from "./schemas/productSchema";

const DB_URI = "mongodb://localhost:27017/OutOfOrder"

async function createNewProduct(Item: string, productName: string, Available: boolean, releaseDate: Date, productId: number) {
    const newProduct = new Product({
        Item,
        productName,
        Available,
        releaseDate,
        productId
    });

    return newProduct;
}

export async function createNewReview(productId:number,customer: string, comment: string) {
    console.log(productId, customer, comment)
    const existingReviews = await Review.findOne().sort({reviewId: -1 }).exec()
    const reviewId = (existingReviews?.reviewId ?? 0) + 1

    const product = await Product.findOne({productId:productId})
    if (product === null) {
        throw new Error ("No product found wit this id")
    }
    const productName = product.productName
        
    const review = new Review({
        reviewId,
        customer,
        productName,
        comment,
        productId
    });
    const newReview = await review.save()
    console.log(newReview)
    return newReview;
}

async function main() {
    await mongoose.connect(DB_URI)



}

main()
    .catch(e => console.error(e))