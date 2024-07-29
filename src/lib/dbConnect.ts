import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: boolean;
}

const connection: ConnectionObject = {}


export default async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("✅ Already connected to Database")
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI!);

        connection.isConnected = !!db.connections[0].readyState;
        console.log("✅ DB Connected");
    } catch (error) {
        console.log("❌ Error connecting to DB", error);
        process.exit(1);
    }
}