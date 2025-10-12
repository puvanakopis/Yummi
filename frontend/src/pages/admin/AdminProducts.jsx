import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './AdminProducts.css';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    Name: '',
    desc: '',
    Price: '',
    Stock: '', // 🔹 Added Stock
    Brand: '',
    Flavour: '',
    DietType: '',
    Weight: '',
    Speciality: '',
    Info: '',
    Img: null,
  });

  const modalRef = useRef(null);
  const API_URL = 'http://localhost:4000/api/items';

  // -------- Fetch all products --------
  const fetchProducts = async () => {
    try {
      const res = await axios.get(API_URL);
      setProducts(res.data.items);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // -------- Scroll modal into view --------
  useEffect(() => {
    if (showForm && modalRef.current) {
      modalRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [showForm]);

  // -------- Handle input change --------
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'Img') {
      setFormData((prev) => ({ ...prev, Img: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // -------- Add or update product --------
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      for (let key in formData) {
        if (formData[key]) data.append(key, formData[key]);
      }

      if (editingProduct) {
        const res = await axios.put(`${API_URL}/${editingProduct._id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setProducts(products.map((p) => (p._id === editingProduct._id ? res.data.item : p)));
        setEditingProduct(null);
      } else {
        const res = await axios.post(API_URL, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setProducts([...products, res.data.item]);
      }

      setFormData({
        Name: '',
        desc: '',
        Price: '',
        Stock: '', // 🔹 Reset Stock
        Brand: '',
        Flavour: '',
        DietType: '',
        Weight: '',
        Speciality: '',
        Info: '',
        Img: null,
      });
      setShowForm(false);
    } catch (error) {
      console.error(error);
      alert('Error saving product');
    }
  };

  // -------- Edit product --------
  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      Name: product.Name,
      desc: product.desc,
      Price: product.Price,
      Stock: product.Stock || '', // 🔹 Added Stock
      Brand: product.Brand || '',
      Flavour: product.Flavour || '',
      DietType: product.DietType || '',
      Weight: product.Weight || '',
      Speciality: product.Speciality || '',
      Info: product.Info || '',
      Img: null,
    });
    setShowForm(true);
  };

  // -------- Delete product --------
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      console.error(error);
      alert('Failed to delete product');
    }
  };

  // -------- View product details --------
  const handleViewDetails = async (id) => {
    try {
      const res = await axios.get(`${API_URL}/${id}`);
      setSelectedProduct(res.data.item);
    } catch (error) {
      console.error('Failed to load product details:', error);
    }
  };

  // -------- Filtered Products --------
  const filteredProducts = products.filter(
    (product) =>
      product.Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.Brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.Flavour?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="admin-products">
      <div className="header">
        <h1>Product Management</h1>
        <p>Manage all food products and inventory</p>
      </div>

      {/* Controls */}
      <div className="products-controls">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-box"
        />
        <button className="add-product-btn" onClick={() => setShowForm(true)}>
          + Add New Product
        </button>
      </div>

      {/* Product Table */}
      <div className="products-table">
        <div className="table-header">
          <div className="table-cell">Name</div>
          <div className="table-cell">Price</div>
          <div className="table-cell">Stock</div> {/* 🔹 Added column */}
          <div className="table-cell">Image</div>
          <div className="table-cell">Actions</div>
        </div>

        {filteredProducts.map((product) => (
          <div key={product._id} className="table-row">
            <div className="table-cell clickable" onClick={() => handleViewDetails(product._id)}>
              {product.Name}
            </div>
            <div className="table-cell">Rs {product.Price}</div>
            <div className="table-cell">{product.Stock || 0}</div> {/* 🔹 Show Stock */}
            <div className="table-cell">
              {product.Img && (
                <img src={`http://localhost:4000/${product.Img}`} alt={product.Name} width="50" />
              )}
            </div>
            <div className="table-cell actions">
              <button className="btn view" onClick={() => handleViewDetails(product._id)}>View</button>
              <button className="btn edit" onClick={() => handleEdit(product)}>Edit</button>
              <button className="btn delete" onClick={() => handleDelete(product._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Product Form Modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal" ref={modalRef}>
            <h2>{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <label>Name</label>
              <input name="Name" value={formData.Name} onChange={handleChange} required />

              <label>Description</label>
              <textarea name="desc" value={formData.desc} onChange={handleChange} required />

              <label>Price</label>
              <input name="Price" type="number" value={formData.Price} onChange={handleChange} required />

              <label>Stock</label>
              <input name="Stock" type="number" value={formData.Stock} onChange={handleChange} required /> {/* 🔹 Stock input */}

              <label>Brand</label>
              <input name="Brand" value={formData.Brand} onChange={handleChange} />

              <label>Flavour</label>
              <input name="Flavour" value={formData.Flavour} onChange={handleChange} />

              <label>Diet Type</label>
              <input name="DietType" value={formData.DietType} onChange={handleChange} />

              <label>Weight</label>
              <input name="Weight" value={formData.Weight} onChange={handleChange} />

              <label>Speciality</label>
              <input name="Speciality" value={formData.Speciality} onChange={handleChange} />

              <label>Info</label>
              <input name="Info" value={formData.Info} onChange={handleChange} />

              <label>Image</label>
              <input type="file" name="Img" onChange={handleChange} />

              <div className="modal-actions">
                <button type="submit" className="btn">
                  {editingProduct ? 'Save Changes' : 'Add Product'}
                </button>
                <button
                  type="button"
                  className="btn delete"
                  onClick={() => {
                    setShowForm(false);
                    setEditingProduct(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="modal-overlay">
          <div className="modal product-details">
            <h2>Product Details</h2>
            <img
              src={`http://localhost:4000/${selectedProduct.Img}`}
              alt={selectedProduct.Name}
              className="details-img"
            />
            <div className="details-content">
              <p><strong>Name:</strong> {selectedProduct.Name}</p>
              <p><strong>Description:</strong> {selectedProduct.desc}</p>
              <p><strong>Price:</strong> Rs {selectedProduct.Price}</p>
              <p><strong>Stock:</strong> {selectedProduct.Stock}</p> {/* 🔹 Added Stock */}
              <p><strong>Brand:</strong> {selectedProduct.Brand || 'N/A'}</p>
              <p><strong>Flavour:</strong> {selectedProduct.Flavour || 'N/A'}</p>
              <p><strong>Diet Type:</strong> {selectedProduct.DietType || 'N/A'}</p>
              <p><strong>Weight:</strong> {selectedProduct.Weight || 'N/A'}</p>
              <p><strong>Speciality:</strong> {selectedProduct.Speciality || 'N/A'}</p>
              <p><strong>Info:</strong> {selectedProduct.Info || 'N/A'}</p>
              <p><strong>Rating:</strong> {selectedProduct.Rating || 0} ⭐</p>
              <p><strong>Reviews:</strong> {selectedProduct.Reviews || 0}</p>
            </div>
            <div className="modal-actions">
              <button className="btn" onClick={() => setSelectedProduct(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;