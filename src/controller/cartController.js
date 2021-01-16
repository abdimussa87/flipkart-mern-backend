import CartCollection from '../models/cartModel.js';
import mongoose from 'mongoose'
const runUpdate = (filter, update) => {
    return new Promise((resolve, reject) => {
        CartCollection.findOneAndUpdate(filter, update, {
            new: true
        }, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result)
            }
        })
    })
}
export const addItemToCart = (req, res) => {
    const cartItemsFromRequest = req.body.cartItems
    const cartObject = {
        user: req.userId, cartItems: Object.keys(req.body.cartItems).map(key => ({ ...cartItemsFromRequest[key] }))
    }

    CartCollection.findOne({ user: req.userId }, (err, cart) => {
        if (err) {
            res.status(500).json(err)
        } else if (cart) {
            let promiseArray = [];
            cartObject.cartItems.forEach((cartItem) => {

                const item = cart.cartItems.find(itm => itm.product == cartItem.product);
                let filter
                let update
                if (item) {
                    filter = { user: req.userId, "cartItems.product": cartItem.product };
                    update = {
                        "$set": {
                            "cartItems.$": {
                                ...cartItem,
                                quantity: item.quantity + cartItem.quantity
                            }
                        }
                    };

                }
                else {
                    filter = { user: req.userId };
                    update = {
                        "$push": {
                            "cartItems": { ...cartItem }
                        }
                    };

                }
                promiseArray.push(runUpdate(filter, update));
            })
            Promise.all(promiseArray)
                .then(response => getCart(req, res))
                .catch(error => res.status(500).json(error));

        } else {
            CartCollection.create(cartObject, (err, cart) => {
                if (err) {
                    res.status(500).json(err)
                } else {
                    getCart(req, res)
                }
            })

        }
    })



}
export const getCart = (req, res) => {
    CartCollection.findOne({ user: req.userId })
        .populate('cartItems.product')
        .exec((err, cart) => {
            if (err) {
                res.status(500).json(err)
            } else {
                if (cart) {
                    res.status(200).json(cart.cartItems)
                } else {
                    res.status(404).json([])
                }
            }
        })

}

export const removeFromCart = (req, res) => {
    const item = req.params.id
    CartCollection.updateOne({ user: req.userId }, { $pull: { cartItems: { product: item } } }, (err, result) => {
        if (err) {
            res.status(500).json(err)
        } else {
            getCart(req, res)
        }
    })
}