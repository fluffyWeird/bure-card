const mongoose = require('mongoose');

// Replace with your MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://xeureka:admin123@cluster0.1fjjwed.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

async function resetDatabase() {
    try {
        await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        const collections = await mongoose.connection.db.collections();

        for (let collection of collections) {
            await collection.deleteMany({});
            console.log(`Cleared collection: ${collection.collectionName}`);
        }

        console.log('Database reset complete.');
        await mongoose.disconnect();
    } catch (error) {
        console.error('Error resetting database:', error);
        process.exit(1);
    }
}

// Run the reset when this script is executed
resetDatabase();