import Cart from "../models/cartItemModel.js";
import Item from "../models/itemModel.js";



// Add items to cart
export const addCartItem = async (req, res) => {
  try {
    const { userId, items } = req.body;

    if (!userId || !items || !Array.isArray(items) || items.length === 0)
      return res.status(400).json({ message: "userId and items array are required" });

    const itemIds = items.map(i => i.itemId);
    const foundItems = await Item.find({ _id: { $in: itemIds } });

    if (foundItems.length !== items.length)
      return res.status(404).json({ message: "Some items not found" });

    const cartItems = items.map(i => {
      const product = foundItems.find(f => f._id.toString() === i.itemId);
      return {
        item: i.itemId,
        quantity: i.quantity,
        total: product.Price * i.quantity,
      };
    });

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: cartItems });
    } else {
      cartItems.forEach(newItem => {
        const existingItem = cart.items.find(i => i.item === newItem.item);
        if (existingItem) {
          existingItem.quantity += newItem.quantity;
          existingItem.total += newItem.total;
        } else {
          cart.items.push(newItem);
        }
      });
    }

    await cart.save();
    res.status(200).json({ message: "Items added to cart successfully", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding items to cart", error: error.message });
  }
};




// Get user cart
export const getCartItem = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId }).populate("items.item");
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching cart", error: error.message });
  }
};





// Update item quantity
export const updateCartItem = async (req, res) => {
  try {
    const { userId, itemId, quantity } = req.body;

    if (!userId || !itemId || quantity == null)
      return res.status(400).json({ message: "userId, itemId and quantity are required" });

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    const cartItem = cart.items.find(i => i.item === itemId);
    if (!cartItem) return res.status(404).json({ message: "Item not found in cart" });

    cartItem.quantity = quantity;
    cartItem.total = item.Price * quantity;
    cart.subtotal = cart.items.reduce((sum, i) => sum + i.total, 0);

    await cart.save();
    res.status(200).json({ message: "Cart item updated successfully", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating cart item", error: error.message });
  }
};






// Delete item from cart
export const deleteCartItem = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex(i => i.item === itemId);
    if (itemIndex === -1) return res.status(404).json({ message: "Item not found in cart" });

    cart.items.splice(itemIndex, 1);
    cart.subtotal = cart.items.reduce((sum, i) => sum + i.total, 0);

    await cart.save();
    res.status(200).json({ message: "Item removed from cart", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting item from cart", error: error.message });
  }
};