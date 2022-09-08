const express = require('express');
const Product = require('../models/product');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const router = new express.Router()

router.get('/products', (req, res) => {
    Product.find({status: true}).sort({ createdAt: -1 })
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            console.log(err);
        });
})

router.get('/products/:id', (req, res) => {
    const id = req.params.id
    Product.findById(id).sort({ createdAt: -1 })
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            console.log(err);
        });
})

router.post('/products', (req, res) => {
    Product.exists({ productCode: req.body.productCode }, (err, doc) => {
        if (doc) {
            res.send('Ya existe este producto')
        }
        else {
            const product = new Product({ ...req.body, status: true });
            product.save()
                .then((result) => {
                    res.send(result)

                }).catch((err) => {
                    res.statusCode = 400
                    res.send(err)
                });
        }
    })




})

router.put('/products/:id', (req, res) => {
    const id = req.params.id
    Product.findByIdAndUpdate(id, req.body)
        .then((result) => {
            res.send('Registro actualizado satisfactoriamente')
        }).catch((err) => {
            console.log(err);
            res.send('Error actualizando el producto').sendStatus(500)
        });
})

router.delete('/products/:id', (req, res) => {
    const id = req.params.id
    Product.findByIdAndUpdate(id, { status: false })
        .then((result) => {
            res.send('Registro eliminado satisfactoriamente')
        }).catch((err) => {
            console.log(err);
            res.send('Error eliminando el producto').sendStatus(500)
        });
})


module.exports = router;