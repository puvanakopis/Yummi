import Favourite from "../models/favouriteItemModel.js";


// Add item to favourites
export const addFavouriteItem = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        if (!userId || !itemId) {
            return res.status(400).json({ message: "userId and itemId are required" });
        }

        let favourite = await Favourite.findOne({ userId });

        if (!favourite) {
            favourite = new Favourite({ userId, items: [{ item: itemId }] });
        } else {
            const alreadyExists = favourite.items.some(
                (fav) => fav.item.toString() === itemId
            );

            if (alreadyExists) {
                return res.status(400).json({ message: "Item already in favourites" });
            }

            favourite.items.push({ item: itemId });
        }

        await favourite.save();
        res.status(200).json({ message: "Item added to favourites", favourite });
    } catch (error) {
        console.error("Add Favourite Error:", error);
        res.status(500).json({ message: "Server Error", error });
    }
};



// Get all favourite items
export const getFavouriteItems = async (req, res) => {
    try {
        const { userId } = req.params;

        const favourite = await Favourite.findOne({ userId })
            .populate("items.item")
            .exec();

        if (!favourite) {
            return res.status(404).json({ message: "No favourites found" });
        }

        res.status(200).json(favourite);
    } catch (error) {
        console.error("Get Favourite Error:", error);
        res.status(500).json({ message: "Server Error", error });
    }
};




// Remove item
export const removeFavouriteItem = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        const favourite = await Favourite.findOne({ userId });
        if (!favourite) {
            return res.status(404).json({ message: "Favourite list not found" });
        }

        favourite.items = favourite.items.filter(
            (fav) => fav.item.toString() !== itemId
        );

        await favourite.save();
        res.status(200).json({ message: "Item removed", favourite });
    } catch (error) {
        console.error("Remove Favourite Error:", error);
        res.status(500).json({ message: "Server Error", error });
    }
};