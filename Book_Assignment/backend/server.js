const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const ExcelJS = require("exceljs"); 
const path = require("path");

const app = express();
const port = 5001;

app.use(cors());
app.use(bodyParser.json());


const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error("Error connecting to SQLite database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});


db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      authorID TEXT NOT NULL,
      genreID TEXT NOT NULL,
      pages INTEGER NOT NULL,
      publishedDate TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      mobile TEXT NOT NULL,
      message TEXT NOT NULL
    )
  `);
});


app.get('/api/books', (req, res) => {
  db.all('SELECT * FROM books', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.get('/api/books/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM books WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(row);
  });
});

app.post('/api/books', (req, res) => {
  const { title, authorID, genreID, pages, publishedDate } = req.body;
  db.run(
    'INSERT INTO books (title, authorID, genreID, pages, publishedDate) VALUES (?, ?, ?, ?, ?)',
    [title, authorID, genreID, pages, publishedDate],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID });
    }
  );
});

app.put('/api/books/:id', (req, res) => {
  const { id } = req.params;
  const { title, authorID, genreID, pages, publishedDate } = req.body;
  db.run(
    'UPDATE books SET title = ?, authorID = ?, genreID = ?, pages = ?, publishedDate = ? WHERE id = ?',
    [title, authorID, genreID, pages, publishedDate, id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ updated: this.changes });
    }
  );
});

app.delete('/api/books/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM books WHERE id = ?', [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ deleted: this.changes });
  });
});


app.post('/api/contact', (req, res) => {
  const { name, mobile, message } = req.body;


  db.run(
    'INSERT INTO contacts (name, mobile, message) VALUES (?, ?, ?)',
    [name, mobile, message],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

    
      const workbook = new ExcelJS.Workbook();
      const filePath = './contacts.xlsx';

      
      workbook.xlsx.readFile(filePath).then(() => {
        const sheet = workbook.getWorksheet(1) || workbook.addWorksheet('Contacts');
        sheet.addRow([name, mobile, message]);
        return workbook.xlsx.writeFile(filePath);
      }).catch(() => {
       
        const sheet = workbook.addWorksheet('Contacts');
        sheet.addRow(['Name', 'Mobile', 'Message']); 
        sheet.addRow([name, mobile, message]);       
        return workbook.xlsx.writeFile(filePath);
      }).then(() => {
        res.json({ success: true });
      }).catch((excelErr) => {
        console.error("Error saving to Excel:", excelErr);
        res.status(500).json({ error: 'Failed to save to Excel' });
      });
    }
  );
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
