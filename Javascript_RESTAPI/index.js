const express = require('express');
const app = express();
const PORT = 3000;

const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',     
    password: '1234',   
    database: 'testnode'      
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to MySQL database.');
});


app.use(express.json()); // Middleware to parse JSON bodies

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// CREATE: POST /items
app.post('/items', (req, res) => {
  const { name } = req.body;
  const query = 'INSERT INTO items (name) VALUES (?)';

  db.query(query, [name], (err, results) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: results.insertId, name });
  });
});

// READ: GET /items
app.get('/items', (req, res) => {
  const query = 'SELECT * FROM items';
  db.query(query, (err, results) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.json(results);
  });
});

// READ (Single): GET /items/:id
app.get('/items/:id', (req, res) => {
  const query = 'SELECT * FROM items WHERE id = ?';
  db.query(query, [req.params.id], (err, results) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      if (results.length === 0) return res.status(404).send('Item not found');
      res.json(results[0]);
  });
});

// UPDATE: PUT /items/:id
app.put('/items/:id', (req, res) => {
  const { name } = req.body;
  const query = 'UPDATE items SET name = ? WHERE id = ?';

  db.query(query, [name, req.params.id], (err, results) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      if (results.affectedRows === 0) return res.status(404).send('Item not found');
      res.json({ id: req.params.id, name });
  });
});

// DELETE: DELETE /items/:id
app.delete('/items/:id', (req, res) => {
  const query = 'DELETE FROM items WHERE id = ?';

  db.query(query, [req.params.id], (err, results) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      if (results.affectedRows === 0) return res.status(404).send('Item not found');
      res.status(204).send(); // No content to send back
  });
});
