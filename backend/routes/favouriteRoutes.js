import express from "express";
import { addFavouriteItem, getFavouriteItems, removeFavouriteItem, } from "../controller/favouriteController.js";

const router = express.Router();

router.post("/add", addFavouriteItem);
router.get("/:userId", getFavouriteItems);
router.delete("/remove", removeFavouriteItem);

export default router;