import express from "express";
import logger from "./middlewares/logger";
import router from "./router";
import cors from "cors";

const app = express()
app.use(cors())
app.use(express.json())
app.use(logger)
app.use(router)


export default app;