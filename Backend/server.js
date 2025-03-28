const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json()); // Allows parsing of JSON request Bodies

const items = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
  { id: 3, name: "Item 3" },
];

// GET: retriev all items
app.get("/api/items", (req, res) => {
  res.json(items);
});

// POST: Add a new item
app.post("/api/items", (req, res) => {
  const newItem = { id: items.length + 1, name: req.body.name };
  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT: Update an Item
app.put('/api/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ message: "Item not found" });
  item.name = req.body.name;
  res.json(item);
});

// Delete: remove an Item
app.delete('/api/items/:id', (req, res) => {
  const index = items.findIndex(i => i.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Item not found" });

  items.splice(index, 1);
  res.json({ message: "Item deleted" });
});
const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));