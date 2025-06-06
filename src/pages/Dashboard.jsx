import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'context/AuthContext';
import { getItems, createItem, deleteItem, updateItem } from 'api/items';

function Dashboard() {
  const navigate = useNavigate();
  const { setToken, token } = useAuth();

  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 3;

  const fetchItems = async () => {
    try {
      const data = await getItems(token);
      setItems(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleLogout = () => {
    setToken(null);
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('purchase_date', purchaseDate);

    if (image instanceof File) {
      formData.append('image', image);
    }

    try {
      if (editingId) {
        await updateItem(token, editingId, formData);
      } else {
        await createItem(token, formData);
      }

      resetForm();
      fetchItems();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (item) => {
    setName(item.name);
    setPrice(item.price);
    setPurchaseDate(item.purchase_date);
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteItem(token, id);
      fetchItems();
    } catch (err) {
      setError(err.message);
    }
  };

  const resetForm = () => {
    setName('');
    setPrice('');
    setPurchaseDate('');
    setImage(null);
    setEditingId(null);
  };

  const paginatedItems = items.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white p-6 rounded shadow w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">{editingId ? 'Edit Item' : 'Add New Item'}</h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
            >
              Logout
            </button>
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="grid gap-4">
            <input
              type="text"
              placeholder="Item name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 rounded"
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border p-2 rounded"
              required
            />
            <input
              type="date"
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
              className="border p-2 rounded"
              required
            />
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="border p-2 rounded"
              accept="image/*"
            />

            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                {editingId ? 'Update Item' : 'Add Item'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Items List */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Items</h2>
          {paginatedItems.length === 0 ? (
            <p>No items yet.</p>
          ) : (
            <ul className="flex flex-col gap-4">
              {paginatedItems.map((item) => (
                <li key={item.id} className="border p-4 rounded shadow flex items-start gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">£{item.price}</p>
                    <p className="text-sm text-gray-600">Purchased: {item.purchase_date}</p>
                    <p className="text-sm text-gray-700">
                      Cost per day: £{Number(item.cost_per_day).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-yellow-400 text-white text-sm px-2 py-1 rounded hover:bg-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 text-white text-sm px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === i + 1
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
