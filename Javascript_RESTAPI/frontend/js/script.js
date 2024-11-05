// script.js

const itemForm = document.getElementById('itemForm');
const itemList = document.getElementById('itemList');
const apiUrl = 'http://localhost:3000/items'; // Adjust this URL to your API
let editingItemId = null; // Variable to store the ID of the item being edited

// Fetch items from the API
async function fetchItems() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const items = await response.json();
        itemList.innerHTML = ''; // Clear the list before adding items
        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item.name;

            // Create Edit Button
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.className = 'edit'; // Add class for styling
            editButton.onclick = () => editItem(item.id, item.name);
            li.appendChild(editButton);

            // Create Delete Button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'delete'; // Add class for styling
            deleteButton.onclick = () => deleteItem(item.id);
            li.appendChild(deleteButton);

            itemList.appendChild(li);
        });
    } catch (error) {
        console.error('Failed to fetch items:', error);
    }
}

// Add new item to the API
itemForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission

    const itemName = document.getElementById('itemName').value;

    if (editingItemId) {
        // Update existing item
        await updateItem(editingItemId, itemName);
    } else {
        // Create new item
        await createItem(itemName);
    }
});

// Create new item
async function createItem(name) {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name })
        });

        if (response.ok) {
            fetchItems(); // Refresh the item list
            itemForm.reset(); // Reset form input
        } else {
            console.error('Failed to add item');
        }
    } catch (error) {
        console.error('Error adding item:', error);
    }
}

// Edit item
function editItem(id, name) {
    editingItemId = id; // Set the ID of the item being edited
    document.getElementById('itemName').value = name; // Populate the input with the item name
}

// Update item
async function updateItem(id, name) {
    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name })
        });

        if (response.ok) {
            fetchItems(); // Refresh the item list
            itemForm.reset(); // Reset form input
            editingItemId = null; // Reset editing item ID
        } else {
            console.error('Failed to update item');
        }
    } catch (error) {
        console.error('Error updating item:', error);
    }
}

// Delete item
async function deleteItem(id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            fetchItems(); // Refresh the item list
        } else {
            console.error('Failed to delete item');
        }
    } catch (error) {
        console.error('Error deleting item:', error);
    }
}

// Initial fetch of items
fetchItems();
