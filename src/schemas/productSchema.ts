import { Schema } from "mongoose"

export interface IProducts {

    Item: string
    image: string
    productName: string
    Available: boolean
    releaseDate: Date
    productId: Number
    price: string
}

const productSchema = new Schema<IProducts>({
    Item: { type: String, required: true},
    image: {type: String, required:true},
    productName: { type: String, required: true},
    Available: {type: Boolean, default: false},
    releaseDate: {type: Date, required: true},
    productId: {type: Number, required: true, unique: true},
    price: { type: String, required: true}
})

 
export default productSchema;