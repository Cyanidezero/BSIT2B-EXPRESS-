import React, { useEffect, useState } from "react";
import axios from "axios";


const API_URL = "http://localhost:5000/api/items";

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  // fetch items from API

  useEffect(() => {
    axios
      .get(API_URL)
      .then(response => setItems(response.data))
      .catch(error => console.error("Error Fetching Item:", error));
  }, []);

  // Add a new item

  const addItem = () => {
    axios
      .post(API_URL, { name: newItem })
      .then(response => setItems(...items, response.data))
      .catch(error => console.error("Error Adding Item:", error));
  };




   // Update an item
   const updateItem = (id, name) => {
    axios.put(`${API_URL}/${id}`, { name })
        .then(response => {
            setItems(items.map(item => (item.id === id ? response.data : item)));
        })
        .catch(error => console.error("Error updating item:", error));
};
  // Delete

  const deleteItem = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        setItems(items.filter(item => item.id !== id));
      })
      .catch((error) => console.error("Error Deleting Item:", error));
  };




  return (
    <div>
      <h1>React + Express Rest API</h1>
      <input type="text" value={newItem} onChange={(e) => setNewItem(e.target.value)} placeholder="Add Item" />
      <button onClick={addItem}>Add Item</button>
      <ul>
                {items.map(item => (
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