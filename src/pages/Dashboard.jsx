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
      fetchItems();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6 py-12">
      <div className="w-full max-w-7xl bg-white rounded-xl shadow-lg p-8 flex flex-col md:flex-row gap-10">
        {/* Form Column */}
        <div className="md:w-1/3">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Your Dashboard</h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
            >
              Logout
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Item name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded-md p-3"
              required
            />
            <input
              type="number"
              placeholder="Price (£)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border border-gray-300 rounded-md p-3"
              required
            />
            <input
              type="date"
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
              className="border border-gray-300 rounded-md p-3"
              required
            />
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="border border-gray-300 rounded-md p-3"
              accept="image/*"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded"
            >
              Add Item
            </button>
          </form>

          {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
        </div>

        {/* Items Column */}
        <div className="md:w-2/3">
          <h2 className="text-xl font-semibold mb-6">Your Items</h2>
          {items.length === 0 ? (
            <p className="text-gray-500">No items yet.</p>
          ) : (
            <ul className="flex flex-col gap-6">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-4 items-center bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div>
                    <p className="font-bold text-lg text-gray-800">{item.name}</p>
                    <p className="text-gray-700">£{Number(item.price).toFixed(2)}</p>
                    <p className="text-sm text-gray-500">Purchased: {item.purchase_date}</p>
                    <p className="text-sm text-gray-600">
                      Cost per day: £{Number(item.cost_per_day).toFixed(2)}
                    </p>
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
