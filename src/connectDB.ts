import mongoose from "mongoose";
import Product from "./models/productsModel";
import Review from "./models/reviewModel";

const DB_URI = "mongodb://localhost:27017/OutOfOrder"

async function createNewProduct(Item, productName, Available, releaseDate, productId) {
    const newProduct = new Product({
        Item,
        productName,
        Available,
        releaseDate,
        productId
    });

    return newProduct;
}

async function createNewReview(reviewId, customer, productName, comment, productId) {
    const newReview = new Review({
        reviewId,
        customer,
        productName,
        comment,
        productId
    });

    return newReview;
}

async function main() {
    await mongoose.connect(DB_URI)



}

main()
    .catch(e => console.error(e))