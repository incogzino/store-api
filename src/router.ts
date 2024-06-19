import express from "express";
import productsRouter from "./routes/products"
import reviewsRouter from "./routes/review";

const router = express.Router()

router.use("/products", productsRouter)
router.use("/reviews", reviewsRouter)

export default router;