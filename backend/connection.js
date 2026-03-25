import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI

async function connectDB(){
    try{
        const client = new MongoClient(MONGODB_URI);
        await client.connect();
        console.log("Connected To MONGODB");
        const db = client.db("localrag");
        const collection = db.collection("vectors");
        return collection;
    } catch(error){
        console.log("Error occured in connecting to mongodb "+error);
    }
}

export default connectDB;

