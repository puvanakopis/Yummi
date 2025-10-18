import Cart from "../models/cartItemModel.js";
import Item from "../models/itemModel.js";

// Add items to cart
export const addCartItem = async (req, res) => {
  try {
    const { userId, items } = req.body;

    if (!userId || !items?.length) {
      return res.status(400).json({ message: "userId and items array required" });
    }

    const itemIds = items.map(i => i.itemId);
    const foundItems = await Item.find({ _id: { $in: itemIds } });

    if (foundItems.length !== items.length) {
      return res.status(404).json({ message: "Some items not found" });
    }

    const cartItems = items.map(i => {
      const product = foundItems.find(f => f._id.toString() === i.itemId);
      return {
        item: product._id.toString(),
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
    res.status(200).json({ message: "Items added to cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Error adding items", error: error.message });
  }
};

// Get cart by user ID
export const getCartItemByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId }).populate("items.item");
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error: error.message });
  }
};

// Update cart item quantity
export const updateCartItem = async (req, res) => {
  try {
    const { userId, itemId, quantity } = req.body;
    if (!userId || !itemId || quantity < 1) return res.status(400).json({ message: "Invalid input" });

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const cartItem = cart.items.find(i => i.item === itemId);
    if (!cartItem) return res.status(404).json({ message: "Item not in cart" });

    const item = await Item.findById(itemId);
    cartItem.quantity = quantity;
    cartItem.total = item.Price * quantity;

    cart.subtotal = cart.items.reduce((sum, i) => sum + i.total, 0);

    await cart.save();
    res.status(200).json({ message: "Cart updated", cart });
  } catch (error) {
    res.status(500).json({ message: "Error updating cart", error: error.message });
  }
};

// Delete single item
export const deleteCartItem = async (req, res) => {
  try {
    const { userId, itemId } = req.body;
    if (!userId || !itemId) return res.status(400).json({ message: "Missing params" });

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(i => i.item !== itemId);
    cart.subtotal = cart.items.reduce((sum, i) => sum + i.total, 0);

    await cart.save();
    res.status(200).json({ message: "Item removed", cart });
  } catch (error) {
    res.status(500).json({ message: "Error deleting item", error: error.message });
  }
};

// Clear all items
export const clearCart = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: "Missing userId" });

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = [];
    cart.subtotal = 0;
    await cart.save();

    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ message: "Error clearing cart", error: error.message });
  }
};