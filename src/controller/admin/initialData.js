import CategoryCollection from '../../models/categoryModel.js'
import ProductCollection from '../../models/productModel.js'
export const getInitialData = async (req, res) => {
    const categories = await CategoryCollection.find({}).exec();
    const products = await ProductCollection.find({})
        .select('_id name price quantity slug description productPictures category')
        .populate({ path: 'category', select: '_id name' })
        .exec();
    const sortedCategories = sortCategories(categories);
    res.status(200).json({ categories: sortedCategories, products })


}

function sortCategories(categories, parentId) {
    const categoriesList = [];
    let variyingCategoryList;
    if (parentId == null) {
        variyingCategoryList = categories.filter(cat => cat.parentId == undefined)
    } else {
        variyingCategoryList = categories.filter(cat => cat.parentId == parentId)
    }

    for (let cat of variyingCategoryList) {
        categoriesList.push({ id: cat._id, name: cat.name, parentId: cat.parentId, slug: cat.slug, image: cat.image, children: sortCategories(categories, cat._id) })
    }

    return categoriesList;
}