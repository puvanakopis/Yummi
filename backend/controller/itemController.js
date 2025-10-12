import Item from '../models/itemModel.js';


// ----------- Create new item -----------
export const createItem = async (req, res) => {
    try {
        const { Name, desc, Price, Brand, Flavour, DietType, Weight, Speciality, Info } = req.body;

        if (!req.file) return res.status(400).json({ success: false, message: 'Image is required' });

        const item = new Item({
            Name,
            Img: req.file.path, 
            desc,
            Price,
            Brand,
            Flavour,
            DietType,
            Weight,
            Speciality,
            Info,
        });

        await item.save();
        res.status(201).json({ success: true, item });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};




// ----------- Get all items -----------
export const getItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.json({ success: true, items });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};




// ----------- Get single item by ID -----------
export const getItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
        res.json({ success: true, item });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};




// ----------- Update item -----------
export const updateItem = async (req, res) => {
    try {
        const updateData = { ...req.body };
        if (req.file) updateData.Img = req.file.path; 

        const updatedItem = await Item.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updatedItem) return res.status(404).json({ success: false, message: 'Item not found' });

        res.json({ success: true, item: updatedItem });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};




// ----------- Delete item -----------
export const deleteItem = async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).json({ success: false, message: 'Item not found' });
        res.json({ success: true, message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};