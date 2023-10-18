import {pool} from './database.js';

class LibroController{
    //traer todo lo que tengo en la base de datos. Ej: http://localhost:3000/libros

   async  getAll(req, res){
        const [result] = await pool.query('SELECT * FROM libros');
        res.json(result);
    } 

    //obtener un libro por id. Ej: http://localhost:3000/libros/3
    async getOne(req, res, id) {
            const [result] = await pool.query('SELECT * FROM libros WHERE id = ?', [id]);
            if (result.length === 0) {
                return res.status(404).json({ message: 'Libro no encontrado' });
            }
            res.json(result[0]);
    }
  }

export const libro = new LibroController();