import PageCollection from '../../models/Page.js'
export const createPage = (req, res) => {
    const { banners, products } = req.files;
    const structuredBanners = banners && banners.length > 0 && banners.map((banner => ({
        img: process.env.BASE_URL + '/public/' + banner.filename,
        navigateTo: `/bannerClicked?categoryId=${req.body.category}&type=${req.body.type}`
    })));
    const structuredProducts = products && products.length > 0 && products.map((product => ({
        img: process.env.BASE_URL + '/public/' + product.filename,
        navigateTo: `/productClicked?categoryId=${req.body.category}&type=${req.body.type}`
    })));

    const pageObject = { title: req.body.title, description: req.body.description, type: req.body.type, banners: structuredBanners, products: structuredProducts, createdBy: req.userId, category: req.body.category }

    PageCollection.findOne({ category: req.body.category }, (err, page) => {
        if (err) {
            res.status(500).send(err.message)
        } else if (page) {
            PageCollection.findOneAndUpdate({ category: req.body.category }, pageObject, { new: true }, (err, page) => {
                if (err) {
                    res.status(500).json(err)
                } else {
                    res.status(201).json({ message: 'Page updated succesfully', page: page })
                }
            })

        } else {
            PageCollection.create(pageObject, (err, page) => {
                if (err) {
                    res.status(500).send(err.message)
                } else {
                    res.status(201).json({ message: "Page created successfully", page: page });
                }
            });
        }
    })

}

export const getPage = (req, res) => {
    const { category, type } = req.params;
    PageCollection.findOne({ category: category }, (err, page) => {
        if (err) {
            res.status(500).send(err.message)
        } else if (page) {
            res.status(200).json(page)
        } else {
            res.status(404).json({ message: 'Page not found' })
        }
    })
}


