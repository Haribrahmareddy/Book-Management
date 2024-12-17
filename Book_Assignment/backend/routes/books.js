const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./db/database.sqlite");


db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      authorID TEXT,
      genreID TEXT,
      pages INTEGER,
      publishedDate TEXT
    )
  `);
});


router.get("/", (req, res) => {
  db.all("SELECT * FROM books", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});


router.get("/:id", (req, res) => {
  db.get("SELECT * FROM books WHERE id = ?", [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row);
  });
});

router.post("/", (req, res) => {
  const { title, authorID, genreID, pages, publishedDate } = req.body;
  db.run(
    `INSERT INTO books (title, authorID, genreID, pages, publishedDate) VALUES (?, ?, ?, ?, ?)`,
    [title, authorID, genreID, pages, publishedDate],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});


router.put("/:id", (req, res) => {
  const { title, authorID, genreID, pages, publishedDate } = req.body;
  db.run(
    `UPDATE books SET title = ?, authorID = ?, genreID = ?, pages = ?, publishedDate = ? WHERE id = ?`,
    [title, authorID, genreID, pages, publishedDate, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ changes: this.changes });
    }
  );
});

router.delete("/:id", (req, res) => {
  db.run(`DELETE FROM books WHERE id = ?`, [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ changes: this.changes });
  });
});

module.exports = router;
