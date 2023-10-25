import { Router } from 'express';
import {libro} from './controller.js';

export const router = Router();

router.get('/libros', libro.getAll);
router.get('/libro/:id', async (req, res) => {
    const libroId = req.params.id;
    await libro.getOne(req, res, libroId);
});
router.post('/libro', libro.add);
router.delete('/libro', libro.delete);
router.put('/libro', libro.update);
