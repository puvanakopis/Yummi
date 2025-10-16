import Order from "../models/orderModel.js";
import Item from "../models/itemModel.js";
import User from "../models/userModel.js";


// ------------ Create a new order ------------
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

    const requiredFields = ["firstName", "lastName", "address", "postalCode", "phoneNumber"];
    for (const field of requiredFields) {
      if (!deliveryInfo?.[field]) {
        return res.status(400).json({ message: `Missing delivery info: ${field}` });
      }
    }

    const newOrder = new Order({
      userId,
      items,
      subtotal,
      deliveryFee,
      grandTotal,
      deliveryInfo,
      status: "pending", 
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// ------------ Get all orders ------------
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




// ------------ Get all orders ------------
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



// ------------ Get single order by ID ------------
export const getOrderById = async (req, res) => {
  try {
    const { userId, orderId } = req.params;

    const order = await Order.findOne({ _id: orderId, userId })
      .populate("items.item")
      .populate("userId", "name email");

    if (!order)
      return res.status(404).json({ message: "Order not found for this user" });

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// ------------ Update an order ------------
export const updateOrder = async (req, res) => {
  try {
    const { userId, orderId } = req.params;
    const { items, subtotal, deliveryFee, grandTotal, deliveryInfo, status } = req.body;

    const order = await Order.findOne({ _id: orderId, userId });
    if (!order)
      return res.status(404).json({ message: "Order not found for this user" });

    order.items = items || order.items;
    order.subtotal = subtotal ?? order.subtotal;
    order.deliveryFee = deliveryFee ?? order.deliveryFee;
    order.grandTotal = grandTotal ?? order.grandTotal;
    order.deliveryInfo = deliveryInfo || order.deliveryInfo;

    if (status && ["pending", "confirmed", "cancelled"].includes(status)) {
      order.status = status;
    }

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





// ------------ Delete an order ------------
export const deleteOrder = async (req, res) => {
  try {
    const { userId, orderId } = req.params;

    const order = await Order.findOne({ _id: orderId, userId });
    if (!order)
      return res.status(404).json({ message: "Order not found for this user" });

    await order.deleteOne();
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





// ------------ Update order status ------------
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!["pending", "confirmed", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    const updated = await order.save();

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};