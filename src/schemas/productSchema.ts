import { Schema } from "mongoose"

interface IProducts {

    Item: string
    productName: string
    Available: boolean
    releaseDate: Date
    productId: Number
}

const productSchema = new Schema<IProducts>({
    Item: { type: String, required: true},
    productName: { type: String, required: true},
    Available: {type: Boolean, default: false},
    releaseDate: {type: Date, required: true},
    productId: {type: Number, required: true, unique: true}
})

 
export default productSchema;