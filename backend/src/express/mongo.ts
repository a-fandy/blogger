import mongoose from "mongoose";

const connectMongoDB = async () => {
	try {
		const mongoURI:string = process.env.MONGO_URI!;
		const mongoDBName:string = process.env.MONGO_DBNAME!;
		const conn = await mongoose.connect(mongoURI, { dbName: mongoDBName });
		console.log(`MongoDB connected: ${conn.connection.host}`);
	} catch (error) {
		if (error instanceof Error) {
			console.error(`Error connection to mongoDB: ${error.message}`);
		} else {
			console.error(`An unexpected error occurred`);
		}
		process.exit(1);
	}
};

export { connectMongoDB };
