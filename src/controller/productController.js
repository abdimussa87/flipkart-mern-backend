import ProductCollection from '../models/productModel.js';
import slugify from 'slugify';
import CategoryCollection from '../models/categoryModel.js'

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

export const getProducts = async (req, res) => {
    const products = await ProductCollection.find({})
        .select('_id name price quantity slug description productPictures category')
        .populate({ path: 'category', select: '_id name' })
        .exec();
    res.status(200).json(products);
}

export const getProductsBySlug = (req, res) => {
    const { slug } = req.params;
    CategoryCollection.findOne({ slug: slug }).select('_id').exec((err, categoryId) => {
        if (err) {
            res.status(500).json({ error })
        } else if (categoryId) {
            ProductCollection.find({ category: categoryId }).exec((req, products) => {
                if (err) {
                    res.status(500).json({ error })
                } else if (products.length > 0) {
                    res.status(200).json({
                        products,
                        productsByPrice: {
                            under5k: products.filter(prod => prod.price < 5000),
                            under10k: products.filter(prod => prod.price >= 5000 && prod.price < 10000),
                            under15k: products.filter(prod => prod.price >= 10000 && prod.price < 15000),
                            under20k: products.filter(prod => prod.price >= 15000 && prod.price < 20000),
                            under30k: products.filter(prod => prod.price >= 20000 && prod.price <= 30000)
                        }
                    })
                } else {
                    res.status(404).json('No products yet')
                }
            })
        } else {
            res.status(404).json({ message: "Not found" })
        }
    })
}