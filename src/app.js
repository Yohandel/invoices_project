const express = require('express');
require('./db/mongoose')
var cors = require('cors')
const productsRoutes = require('./routes/products');
const stockRoutes = require('./routes/stocks');
const app = express()
app.use(cors())
const port = process.env.PORT || 3001
app.use(express.json())
app.use(productsRoutes)
app.use(stockRoutes)


app.listen(port, () => {
    console.log('Servidor iniciado en el puerto: ' + port);
})