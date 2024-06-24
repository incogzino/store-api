import mongoose from "mongoose";
import Product from "./models/productsModel";
import Review from "./models/reviewModel";
import { IProducts } from "./schemas/productSchema";

const DB_URI = "mongodb+srv://mongo_db_service_user:D2OG2mRC445X7pfd@outoforder.p4idpea.mongodb.net/OutOfOrder?retryWrites=true&w=majority&appName=OutOfOrder"

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

