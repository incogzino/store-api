import { model } from "mongoose"
import productSchema from "../schemas/productSchema"

const Product = model('products', productSchema)

export default Product;