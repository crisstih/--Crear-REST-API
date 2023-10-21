import { pool } from "./database.js";

class LibroController {
  //traer todo lo que tengo en la base de datos. Ej: http://localhost:3000/libros

  async getAll(req, res) {
    const [result] = await pool.query("SELECT * FROM libros");
    res.json(result);
  }

  //obtener un libro por id. Ej: http://localhost:3000/libros/3
  async getOne(req, res, id) {
    const [result] = await pool.query("SELECT * FROM libros WHERE id = ?", [
      id,
    ]);
    if (result.length === 0) {
      return res.status(404).json({ message: "Libro no encontrado" });
    }
    res.json(result[0]);
  }

  //se coloca http://localhost:3000/libro luego en postman se pone los datos del libro a insertar. ej: {"nombre": "Don Quijote","autor": "Miguel de Cervantes","categoria": "Novela Clasica","año-publicacion": "1605","ISBN": "978-84-376"}
  async add(req, res) {
    const libro = req.body;
    const [result] = await pool.query(
      "INSERT INTO Libros(nombre, autor, categoria, `año-publicacion`, ISBN) VALUES (?, ?, ?, ?, ?)",
      [
        libro.nombre,
        libro.autor,
        libro.categoria,
        `libro.año-publicacion`,
        libro.ISBN,
      ]
    );
    res.json({ "Id insertado": result.insertId });
  }

  //Se coloca http://localhost:3000/libro en postman luego se ingresa el isbn a eliminar
  async delete(req, res) {
    const libro = req.body;
    const [result] = await pool.query(`DELETE FROM Libros WHERE ISBN=(?)`, [
      libro.ISBN,
    ]);
    res.json({ "Registros eliminados": result.affectedRows });
  }
}

export const libro = new LibroController();
