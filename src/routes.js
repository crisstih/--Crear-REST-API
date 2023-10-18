import { Router } from 'express';
import {libro} from './controller.js';

export const router = Router();

router.get('/libros', libro.getAll);
router.get('/libros/:id', async (req, res) => {
    const libroId = req.params.id;
    await libro.getOne(req, res, libroId);
});