import express from "express";
import { addCartItem, getCartItemByUserId, updateCartItem, deleteCartItem , clearCart } from "../controller/cartItemController.js";

const router = express.Router();

router.post("/add", addCartItem);
router.get("/:userId", getCartItemByUserId);
router.put("/update", updateCartItem);
router.delete("/delete", deleteCartItem);
router.delete("/delete-all", clearCart);

export default router;