import React, { useEffect, useState } from "react";
import axios from 'axios';

const API_URL = "http://localhost:5000/api/items";

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    axios.get(API_URL)
      .then(response => setItems(response.data))
      .catch(error => console.error("Error Fetching Item:", error));
  }, []);

  const addItem = () => {
    if (newItem.trim() === "") return;
    const newItemObject = { id: Date.now(), name: newItem };
    setItems([...items, newItemObject]);
    setNewItem("");
  };

  const updateItem = (id, value) => {
    setItems(items.map(item => (item.id === id ? { ...item, name: value } : item)));
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div>
      <h1>React + Express REST API</h1>
      <input 
        type="text" 
        value={newItem} 
        onChange={(e) => setNewItem(e.target.value)} 
        placeholder="Add item"
      />
      <button onClick={addItem}>Add Item</button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <input 
              type="text" 
              value={item.name} 
              onChange={(e) => updateItem(item.id, e.target.value)}
            />
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
