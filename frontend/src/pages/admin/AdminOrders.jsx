import { useState } from "react";
import "./AdminOrders.css";

const sampleOrders = [
  {
    _id: "order_01",
    userId: "user_01",
    items: [
      { item: "item_01", quantity: 2, total: 500 },
      { item: "item_02", quantity: 1, total: 250 },
    ],
    subtotal: 750,
    deliveryFee: 100,
    grandTotal: 850,
    deliveryInfo: {
      firstName: "John",
      lastName: "Doe",
      address: "123 Main St, Colombo",
      postalCode: "10000",
      phoneNumber: "0771234567",
    },
    status: "pending",
    orderDate: new Date("2025-10-15T10:00:00"),
  },
  {
    _id: "order_02",
    userId: "user_02",
    items: [
      { item: "item_03", quantity: 3, total: 900 },
    ],
    subtotal: 900,
    deliveryFee: 150,
    grandTotal: 1050,
    deliveryInfo: {
      firstName: "Jane",
      lastName: "Smith",
      address: "456 High St, Kandy",
      postalCode: "20000",
      phoneNumber: "0719876543",
    },
    status: "confirmed",
    orderDate: new Date("2025-10-14T14:30:00"),
  },
];

const AdminOrders = () => {
  const [orders] = useState(sampleOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Filtered orders based on search
  const filteredOrders = orders.filter(
    (order) =>
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-orders">
      <div className="header">
        <h1>Order Management</h1>
        <p>View and manage all orders</p>
      </div>

      {/* Controls */}
      <div className="orders-controls">
        <input
          type="text"
          placeholder="Search orders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-box"
        />
      </div>

      {/* Orders Table */}
      <div className="orders-table">
        <div className="table-header">
          <div className="table-cell">Order ID</div>
          <div className="table-cell">User ID</div>
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
            <div className="table-cell">{order.userId}</div>
            <div className="table-cell">{order.status}</div>
            <div className="table-cell">Rs {order.grandTotal}</div>
            <div className="table-cell actions">
              <button className="btn view" onClick={() => setSelectedOrder(order)}>
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="modal-overlay">
          <div className="modal order-details">
            <h2>Order Details</h2>

            <div className="details-content">
              <p><strong>Order ID:</strong> {selectedOrder._id}</p>
              <p><strong>User ID:</strong> {selectedOrder.userId}</p>
              <p><strong>Status:</strong> {selectedOrder.status}</p>
              <p><strong>Order Date:</strong> {selectedOrder.orderDate.toLocaleString()}</p>

              <h3>Delivery Info</h3>
              <p>
                <strong>Name:</strong> {selectedOrder.deliveryInfo.firstName}{" "}
                {selectedOrder.deliveryInfo.lastName}
              </p>
              <p><strong>Address:</strong> {selectedOrder.deliveryInfo.address}</p>
              <p><strong>Postal Code:</strong> {selectedOrder.deliveryInfo.postalCode}</p>
              <p><strong>Phone:</strong> {selectedOrder.deliveryInfo.phoneNumber}</p>

              <h3>Items</h3>
              {selectedOrder.items.map((item, index) => (
                <div key={index} className="order-item">
                  <p><strong>Item ID:</strong> {item.item}</p>
                  <p><strong>Quantity:</strong> {item.quantity}</p>
                  <p><strong>Total:</strong> Rs {item.total}</p>
                  <hr />
                </div>
              ))}

              <h3>Totals</h3>
              <p><strong>Subtotal:</strong> Rs {selectedOrder.subtotal}</p>
              <p><strong>Delivery Fee:</strong> Rs {selectedOrder.deliveryFee}</p>
              <p><strong>Grand Total:</strong> Rs {selectedOrder.grandTotal}</p>
            </div>

            <div className="modal-actions">
              <button className="btn" onClick={() => setSelectedOrder(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;