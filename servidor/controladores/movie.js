const db = require("../lib/conexionbd");

const getAllMovies = (req, res) => {
  const sql = `SELECT * FROM pelicula`;

  const sqlTotal = `SELECT COUNT(id) as total FROM pelicula`;

  const sqlFilter = [];

  let where = " WHERE id > 0";

  const {
    genero,
    anio,
    titulo,
    columna_orden,
    tipo_orden,
    page,
    cantidad
  } = req.query;

  if (genero) {
    where = `${where} AND genero_id = ?`;
    sqlFilter.push(genero);
  }
  if (anio) {
    where = `${where} AND anio = ?`;
    sqlFilter.push(anio);
  }
  if (titulo) {
    where = `${where} AND titulo LIKE ?`;
    sqlFilter.push(`${titulo}%`);
  }

  const orderBy = columna_orden
    ? `ORDER BY ${columna_orden} ${tipo_orden}`
    : "";
  const limit = cantidad ? `LIMIT ${cantidad}` : "";
  let pagination = "";
  if (page && page > 1) pagination = `OFFSET ${(page - 1) * cantidad}`;

  db.query(
    `${sql} ${where} ${orderBy} ${limit} ${pagination}`,
    sqlFilter,
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Error" });
      }
      console.log(`${sql} ${where} ${orderBy} ${limit} ${pagination}`);

      finalResult = { peliculas: results, total: 0 };
      db.query(`${sqlTotal}${where}`, sqlFilter, (err, countResults) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Internal Error" });
        }
        finalResult.total = countResults[0].total;
        res.send(finalResult);
      });
    }
  );
};

const getAllGenres = (req, res) => {
  let sql = `SELECT id,nombre FROM genero`;
  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
    }

    console.log("generos enviados");
    res.send({ generos: results });
  });
};

module.exports = {
  getAllMovies,
  getAllGenres
};
