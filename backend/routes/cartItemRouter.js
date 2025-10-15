import express from "express";
import { addCartItem, getCartItem, updateCartItem, deleteCartItem } from "../controller/cartItemController.js";

const router = express.Router();

router.post("/add", addCartItem);
router.get("/get/:userId", getCartItem);
router.put("/update", updateCartItem);
router.delete("/delete", deleteCartItem);

export default router;