/* ENVIRONMENT */
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

/* DATABASE */
let urlDB;

// if (process.env.NODE_ENV === "dev") {
//     urlDB = process.env.MONGO_URI;
// } else {
urlDB = process.env.MONGO_URI_DB;
// }

process.env.URLDB = urlDB;
