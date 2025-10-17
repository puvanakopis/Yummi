import { useState, useEffect } from "react";
import axios from "axios";
import "./AdminOrders.css";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const API_URL = "http://localhost:4000/api/orders"; // adjust if needed

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL, { withCredentials: true });
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Filter orders based on search term
  const filteredOrders = orders.filter(
    (order) =>
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.userId?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log(selectedOrder)

  return (
    <div className="admin-orders">
      <div className="header">
        <h1>Order Management</h1>
        <p>View and manage all orders</p>
      </div>

      <div className="orders-controls">
        <input
          type="text"
          placeholder="Search orders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-box"
        />
      </div>

      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <div className="orders-table">
          <div className="table-header">
            <div className="table-cell">Order ID</div>
            <div className="table-cell">User</div>
            <div className="table-cell">Status</div>
            <div className="table-cell">Grand Total</div>
            <div className="table-cell">Actions</div>
          </div>

          {filteredOrders.map((order) => (
            <div key={order._id} className="table-row">
              <div
                className="table-cell clickable"
                onClick={() => setSelectedOrder(order)}
              >
                {order._id}
              </div>
              <div className="table-cell">{order.userId?.name}</div>
              <div className="table-cell">{order.status}</div>
              <div className="table-cell">Rs {order.grandTotal}</div>
              <div className="table-cell actions">
                <button
                  className="btn view"
                  onClick={() => setSelectedOrder(order)}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Order Details */}
      {selectedOrder && (
        <div className="modal-overlay">
          <div className="modal order-details">
            <h2>Order Details</h2>

            <div className="details-content">
              <p>
                <strong>Order ID:</strong> {selectedOrder._id}
              </p>
              <p>
                <strong>User:</strong> {selectedOrder.userId?.name} (
                {selectedOrder.userId?.email})
              </p>
              <p>
                <strong>Status:</strong> {selectedOrder.status}
              </p>
              <p>
                <strong>Order Date:</strong>{" "}
                {new Date(selectedOrder.orderDate).toLocaleString()}
              </p>

              <h2 className="padding-top">Delivery Info</h2>
              <p>
                <strong>Name:</strong>{" "}
                {selectedOrder.deliveryInfo.firstName}{" "}
                {selectedOrder.deliveryInfo.lastName}
              </p>
              <p>
                <strong>Address:</strong> {selectedOrder.deliveryInfo.address}
              </p>
              <p>
                <strong>Postal Code:</strong>{" "}
                {selectedOrder.deliveryInfo.postalCode}
              </p>
              <p>
                <strong>Phone:</strong> {selectedOrder.deliveryInfo.phoneNumber}
              </p>

              <h2 className="padding-top">Items</h2>
              {selectedOrder.items.map((item, index) => (
                <div key={index} className="order-item">
                  <p>
                    <strong>ID:</strong> {item.item._id}
                  </p>
                  <p>
                    <strong>Item:</strong> {item.item.Name }
                  </p>
                  <p>
                    <strong>Quantity:</strong> {item.quantity}
                  </p>
                  <p>
                    <strong>Total:</strong> Rs {item.total}
                  </p>
                  <hr />
                </div>
              ))}

              <h2 className="padding-top">Totals</h2>
              <p>
                <strong>Subtotal:</strong> Rs {selectedOrder.subtotal}
              </p>
              <p>
                <strong>Delivery Fee:</strong> Rs {selectedOrder.deliveryFee}
              </p>
              <p>
                <strong>Grand Total:</strong> Rs {selectedOrder.grandTotal}
              </p>
            </div>

            <div className="modal-actions">
              <button className="btn" onClick={() => setSelectedOrder(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;