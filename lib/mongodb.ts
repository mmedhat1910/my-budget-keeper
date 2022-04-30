import mongoose from 'mongoose';

/** 
Source : 
https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/utils/connect.js 
**/

const DATABASE_URL = process.env.DATABASE_URL as string;

if (!DATABASE_URL) {
  throw new Error(
    'Please define the DATABASE_URL environment variable inside .env.local'
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    // const opts = {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   bufferCommands: false,
    //   bufferMaxEntries: 0,
    //   useFindAndModify: true,
    //   useCreateIndex: true
    // }
    console.log(DATABASE_URL);
    cached.promise = mongoose.connect(DATABASE_URL).then((mongoose) => {
      console.log('Database connection established');
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;

// import mongoose from 'mongoose';

// const DATABASE_URL = process.env.DATABASE_URL as string;

// if (!DATABASE_URL) {
//   throw new Error(
//     'Please define the DATABASE_URL environment variable inside .env.local'
//   );
// }
// const connect = async () => {
//   const conn = await mongoose
//     .connect(DATABASE_URL as string)
//     .catch((err) => console.log(err));
//   console.log('Mongoose Connection Established');

//   return conn;
// };
// export default connect;
