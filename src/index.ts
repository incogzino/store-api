import mongoose from "mongoose";
import app from "./app";

const port = 8080

const DB_URI = "mongodb://localhost:27017/OutOfOrder"

async function main() {
    await mongoose.connect(DB_URI)

    app.listen(port, () => {
        console.log('Server started! ')
    })
}

main()
    .catch(e => console.error(e))
    