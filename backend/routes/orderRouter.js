import express from "express";
import { createOrder, getAllOrders, getOrders, getOrderById, updateOrder, deleteOrder, updateOrderStatus } from "../controller/orderController.js";

const router = express.Router();

router.get("/", getAllOrders);
router.put("/status/:orderId", updateOrderStatus);
router.post("/:userId", createOrder);
router.get("/:userId", getOrders);
router.get("/:userId/:orderId", getOrderById);
router.put("/:userId/:orderId", updateOrder);
router.delete("/:userId/:orderId", deleteOrder);

export default router;