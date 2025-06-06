import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'context/AuthContext';
import { getItems, createItem } from 'api/items';

function Dashboard() {
  const navigate = useNavigate();
  const { setToken, token } = useAuth();

  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  const handleLogout = () => {
    setToken(null);
    navigate('/login');
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('purchase_date', purchaseDate);
    if (image) formData.append('image', image);

    try {
      await createItem(token, formData);
      setName('');
      setPrice('');
      setPurchaseDate('');
      setImage(null);
      fetchItems(); // Refresh list
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded shadow w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Your Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded col-span-full hover:bg-blue-700"
          >
            Add Item
          </button>
        </form>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div>
          <h2 className="text-xl font-semibold mb-4">Your Items</h2>
          {items.length === 0 ? (
            <p>No items yet.</p>
          ) : (
            <ul className="grid grid-cols-1 gap-4">
              {items.map((item) => (
                <li key={item.id} className="flex items-center justify-between border p-4 rounded">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-600">£{item.price}</p>
                      <p className="text-sm text-gray-600">Purchased: {item.purchase_date}</p>
                      <p className="text-sm text-gray-700">
                        Cost per day: £{Number(item.cost_per_day).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
