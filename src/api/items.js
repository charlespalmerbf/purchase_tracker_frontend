const API_URL = process.env.REACT_APP_API_PATH || 'http://localhost:8000/api';

export async function getItems(token) {
    const res = await fetch(`${API_URL}/items/`, {
        headers: { Authorization: `Token ${token}` },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch items');
    }

    return await res.json();
}

export async function createItem(token, data) {
    console.log(token)
    const res = await fetch(`${API_URL}/items/`, {
        method: 'POST',
        headers: {
            Authorization: `Token ${token}`,
        },
        body: data,
    });

    if (!res.ok) {
        throw new Error('Failed to create item');
    }

    return await res.json();
}

export async function deleteItem(token, id) {
  const res = await fetch(`${API_URL}/items/${id}/`, {
    method: 'DELETE',
    headers: { Authorization: `Token ${token}` },
  });

  if (!res.ok) throw new Error('Failed to delete item');
}

export async function updateItem(token, id, formData) {
  const res = await fetch(`${API_URL}/items/${id}/`, {
    method: 'PUT',
    headers: { Authorization: `Token ${token}` },
    body: formData,
  });

  if (!res.ok) throw new Error('Failed to update item');
}