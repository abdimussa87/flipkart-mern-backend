import ProductCollection from '../models/productModel.js';
import slugify from 'slugify';

export const createProduct = (req, res) => {
    const { name, description, price, category, quantity } = req.body;
    let productPictures = []
    if (req.files.length > 0) {
        productPictures = req.files.map(file => {
            return { img: file.filename };
        })
    }


    ProductCollection.create({
        name: name,
        slug: slugify(name),
        price,
        description,
        productPictures,
        category,
        createdBy: req.userId,
        quantity,
    }, (err, product) => {
        if (err) res.status(500).json({ error: err });
        else res.status(201).json({ product })
    })
}

export const getProducts = (req, res) => { }