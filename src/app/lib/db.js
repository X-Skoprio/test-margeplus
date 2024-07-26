// src/lib/db.js
import mongoose from 'mongoose';

const connection = {};

async function connect() {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose.connect(process.env.MONGODB_URI, {
    // The useNewUrlParser and useUnifiedTopology options are no longer needed
  });

  connection.isConnected = db.connections[0].readyState;
}

export default connect;
