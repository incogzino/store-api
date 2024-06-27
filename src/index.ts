import mongoose from "mongoose";
import app from "./app";

const port = 8080



//MongoDB URL 
const DB_URI = "mongodb+srv://mongo_db_service_user:D2OG2mRC445X7pfd@outoforder.p4idpea.mongodb.net/OutOfOrder?retryWrites=true&w=majority&appName=OutOfOrder"






async function main() {
    await mongoose.connect(DB_URI)

    app.listen(port, () => {
        console.log('Server started! ')
    })
}

main()
    .catch(e => console.error(e))
    