const express = require('express');
const Stock = require('../models/stock');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const router = new express.Router();

router.get('/inStock', (req, res) => {
    Stock.find().sort({ createdAt: -1 }).
        populate('product', 'description')
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            console.log(err);
        });
})

router.get('/inStock/:id', (req, res) => {
    const id = req.params.id
    Stock.findById(id).sort({ createdAt: -1 }).
        populate('product', 'description')
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            console.log(err);
        });
})

router.post('/addStock', (req, res) => {
    const stock = new Stock({ ...req.body, status: true });
    stock.save()
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            console.log(err);
        });
})

router.put('/updateStock/:id', (req, res) => {
    const id = req.params.id
    Stock.findByIdAndUpdate(id, req.body)
        .then((result) => {
            res.send('Registro actulizado satisfactoriamente')
        }).catch((err) => {
            console.log(err);
            res.send('Error actualizando el stock').sendStatus(500)
        });
})

router.delete('/updateStock/:id', (req, res) => {
    const id = req.params.id
    Stock.findByIdAndUpdate(id, { status: false })
        .then((result) => {
            res.send('Registro eliminado satisfactoriamente')
        }).catch((err) => {
            console.log(err);
            res.send('Error eliminando el stock').sendStatus(500)
        });
})

module.exports = router;