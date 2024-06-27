import express from "express";
import productsRouter from "./routes/products"
import reviewsRouter from "./routes/review";
import paymentsRouter from "./routes/payments";

const router = express.Router()

router.use("/products", productsRouter)
router.use("/reviews", reviewsRouter)
router.use("/payments", paymentsRouter)
export default router;