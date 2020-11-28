import CartCollection from '../models/cartModel.js';
export const addItemToCart = (req, res) => {

    const cartObject = {
        user: req.userId, cartItems: [req.body.cartItems]
    }

    CartCollection.findOne({ user: req.userId }, (err, cart) => {
        if (err) {
            res.status(500).json(err)
        } else if (cart) {
            const item = cart.cartItems.find(itm => itm.product == req.body.cartItems.product);
            let filter
            let update
            if (item) {
                console.log("Item is found")
                filter = { user: req.userId, "cartItems.product": req.body.cartItems.product };
                update = {
                    "$set": {
                        "cartItems.$": {
                            ...req.body.cartItems,
                            quantity: item.quantity + req.body.cartItems.quantity
                        }
                    }
                };

            }
            else {
                filter = { user: req.userId };
                update = {
                    "$push": {
                        "cartItems": req.body.cartItems
                    }
                };

            }
            CartCollection.findOneAndUpdate(filter, update, {
                new: true
            }, (err, result) => {
                if (err) {
                    res.status(500).json(err)
                } else {
                    res.status(201).json(result)
                }
            })

        } else {
            CartCollection.create(cartObject, (err, cart) => {
                if (err) {
                    res.status(500).json(err)
                } else {
                    res.status(201).json(cart)
                }
            })

        }
    })


}