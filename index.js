const express = require('express');
const config = require('./config.json');

const listarProyectos = require("./db").listarProyectos;

const app = express();
const port = config.SERVER_PORT;

app.get('/projects/all', async (request, response) => {
    const page = request.query.page;
    const limit = request.query.limit;
    const datos = await listarProyectos(parseInt(limit), page);
    response.json(datos);
});

app.listen(port, () => {
    console.log(`Backend corriendo en puerto ${port}`);
});