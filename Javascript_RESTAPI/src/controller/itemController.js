const db = require('../config/db');

// Create a new item
exports.createItem = (req, res) => {
    const { name } = req.body;
    const query = 'INSERT INTO items (name) VALUES (?)';

    db.query(query, [name], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, name });
    });
};

// Get all items
exports.getAllItems = (req, res) => {
    const query = 'SELECT * FROM items';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Get a single item by ID
exports.getItemById = (req, res) => {
    const query = 'SELECT * FROM items WHERE id = ?';
    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) return res.status(404).send('Item not found');
        res.json(results[0]);
    });
};

// Update an item by ID
exports.updateItem = (req, res) => {
    const { name } = req.body;
    const query = 'UPDATE items SET name = ? WHERE id = ?';

    db.query(query, [name, req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) return res.status(404).send('Item not found');
        res.json({ id: req.params.id, name });
    });
};

// Delete an item by ID
exports.deleteItem = (req, res) => {
    const query = 'DELETE FROM items WHERE id = ?';

    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) return res.status(404).send('Item not found');
        res.status(204).send(); // No content to send back
    });
};
