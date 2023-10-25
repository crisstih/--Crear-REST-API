import { pool } from "./database.js";

class LibroController {
  //traer todo lo que tengo en la base de datos. Ej: http://localhost:3000/libros

  async getAll(req, res) {
    try {
      const [result] = await pool.query("SELECT * FROM libros");
      res.json(result);
    } catch (error) {
      console.error('Error al obtener todos los libros: ', error);
      res.status(500).json({ message: 'Error en el servidor al obtener todos los libros' });
    }
  }

  //obtener un libro por id. Ej: http://localhost:3000/libro/3
  async getOne(req, res, id) {
    try {
      const [result] = await pool.query("SELECT * FROM libros WHERE id = ?", [id]);
      if (result.length === 0) {
        return res.status(404).json({ message: "Libro no encontrado" });
      }
      res.json(result[0]);
    } catch (error) {
      console.error('Error al obtener el libro por ID: ', error);
      res.status(500).json({ message: 'Error en el servidor al obtener el libro por ID' });
    }
  }

  //se coloca http://localhost:3000/libro luego en postman se pone los datos del libro a insertar. 
  //ej: {"nombre": "Don Quijote","autor": "Miguel de Cervantes","categoria": "Novela Clasica","año-publicacion": "1605","ISBN": "978-84-376"}

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
    try {
      const libro = req.body;
      const [result] = await pool.query(`DELETE FROM Libros WHERE ISBN=(?)`, [libro.ISBN]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Libro no encontrado" });
      }
      res.json({ "Libro eliminado": result.affectedRows });
    } catch (error) {
      console.error('Error al eliminar el libro: ', error);
      res.status(500).json({ message: 'Error en el servidor al eliminar el libro' });
    }
  }



  async update(req, res){
    const libro = req.body;
    const [result] = await pool.query("UPDATE Libros SET nombre=(?), autor=(?), categoria=(?), `año-publicacion`=(?), ISBN=(?) WHERE id=(?)",[
      libro.nombre,
      libro.autor,
      libro.categoria,
      `libro.año-publicacion`,
      libro.ISBN,
      libro.id
    ]);
    res.json({"Registros actualizados": result.changedRows});
  }


}
export const libro = new LibroController();
