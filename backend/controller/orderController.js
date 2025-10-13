import Order from "../models/orderModel.js";
import Item from "../models/itemModel.js";
import User from "../models/userModel.js";


// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { userId } = req.params;
    const { items, subtotal, deliveryFee, grandTotal, deliveryInfo } = req.body;

    const userExists = await User.findById(userId);
    if (!userExists) return res.status(404).json({ message: "User not found" });

    for (let orderItem of items) {
      const itemExists = await Item.findById(orderItem.item);
      if (!itemExists)
        return res.status(404).json({ message: `Item ${orderItem.item} not found` });
    }

    const newOrder = new Order({
      userId,
      items,
      subtotal,
      deliveryFee,
      grandTotal,
      deliveryInfo,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Get all orders of a specific user
export const getOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const userExists = await User.findById(userId);
    if (!userExists) return res.status(404).json({ message: "User not found" });

    const orders = await Order.find({ userId })
      .populate("items.item")
      .populate("userId", "name email");

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Get all orders (no user filter)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("items.item")
      .populate("userId", "name email");

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Get a single order by ID for a specific user
export const getOrderById = async (req, res) => {
  try {
    const { userId, orderId } = req.params;

    const order = await Order.findOne({ _id: orderId, userId })
      .populate("items.item")
      .populate("userId", "name email");

    if (!order) return res.status(404).json({ message: "Order not found for this user" });

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an order for a specific user
export const updateOrder = async (req, res) => {
  try {
    const { userId, orderId } = req.params;
    const { items, subtotal, deliveryFee, grandTotal, deliveryInfo } = req.body;

    const order = await Order.findOne({ _id: orderId, userId });
    if (!order) return res.status(404).json({ message: "Order not found for this user" });

    order.items = items || order.items;
    order.subtotal = subtotal ?? order.subtotal;
    order.deliveryFee = deliveryFee ?? order.deliveryFee;
    order.grandTotal = grandTotal ?? order.grandTotal;
    order.deliveryInfo = deliveryInfo || order.deliveryInfo;

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an order for a specific user
export const deleteOrder = async (req, res) => {
  try {
    const { userId, orderId } = req.params;

    const order = await Order.findOne({ _id: orderId, userId });
    if (!order) return res.status(404).json({ message: "Order not found for this user" });

    await order.deleteOne();
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};