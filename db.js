const MongoClient = require('mongodb').MongoClient;
const config = require('./config.json');

const connectionURL = config.CONNECTION_URL;

let mongoDBClient = null;

const connectToMongoDB = async () => {
    try {
        console.log("Estableciendo la conexión...");
        mongoDBClient = new MongoClient(connectionURL);
        await mongoDBClient.connect();
        console.log("Conexión a MongoDB establecida.");
    }catch(e) {
        console.log("Error al intentar conectarnos a MongoDB.");
        console.log(e);
    }
}

const closeMongoDB = async () => {
    try {
        console.log("Cerrando la conexión...");
        await mongoDBClient.close();
        console.log("Conexión con MongoDB cerrada.");
    }catch (e) {
        console.log("Error al intentar conectarnos a MongoDB.");
        console.log(e);
    }
}

exports.listarProyectos = async (limit, page) => {
    if (!mongoDBClient) {
        await connectToMongoDB();
    }

    try {
        const cursor = mongoDBClient.db("DB1258").collection("Proyectos").find();
        return cursor.sort({ nombre: 1 })
                     .skip(page > 0 ? ((page-1) * limit) : 0)
                     .limit(limit)
                     .toArray();
    }catch(e) {
        console.log("Error extrayendo proyectos desde MongoDB.");
        console.log(e);
        await closeMongoDB();
    }
}