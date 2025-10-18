import express from 'express';
import multer from 'multer';
import { addItems, getItems, getOneItem, updateItem, deleteItem } from '../controller/itemController.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

// Routes
router.get('/', getItems);
router.post('/', upload.single('Img'), addItems);
router.get('/:id', getOneItem);
router.put('/:id', upload.single('Img'), updateItem);
router.delete('/:id', deleteItem);

export default router;