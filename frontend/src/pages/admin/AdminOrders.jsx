import { useContext, useState } from "react";
import { MyContext } from "../../Context/MyContext";
import "./AdminOrders.css";

const AdminOrders = () => {
  const { orders, updateOrderStatus } = useContext(MyContext);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // filter Orders
  const filteredOrders = orders.filter(
    (order) =>
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      <div className="orders-table">
        <div className="table-header">
          <div className="table-cell">Order ID</div>
          <div className="table-cell">User</div>
          <div className="table-cell">Order Date</div>
          <div className="table-cell">Status</div>
          <div className="table-cell">Grand Total</div>
          <div className="table-cell">Actions</div>
        </div>

        {filteredOrders.map((order) => (
          <div key={order._id} className="table-row">
            <div className="table-cell clickable" onClick={() => setSelectedOrder(order)}>
              {order._id}
            </div>
            <div className="table-cell">{order.userId?.name}</div>
            <div className="table-cell">{new Date(order.createdAt).toLocaleDateString()}</div>
            <div className="table-cell">
              <select
                value={order.status}
                onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                className={`status-select ${order.status}`}
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="table-cell">Rs {order.grandTotal}</div>

            <div className="table-cell actions">
              <button className="btn view" onClick={() => setSelectedOrder(order)}>View</button>
            </div>
          </div>
        ))}
      </div>

      {selectedOrder && (
        <div className="modal-overlay">
          <div className="modal order-details">
            <h2>Order Details</h2>
            <div className="details-content">
              <p><strong>Order ID:</strong> {selectedOrder._id}</p>
              <p><strong>User:</strong> {selectedOrder.userId?.name} ({selectedOrder.userId?.email})</p>
              <p><strong>Status:</strong> {selectedOrder.status}</p>
              <p><strong>Order Date:</strong> {new Date(selectedOrder.orderDate).toLocaleString()}</p>

              <h2 className="padding-top">Delivery Info</h2>
              <p><strong>Name:</strong> {selectedOrder.deliveryInfo.firstName} {selectedOrder.deliveryInfo.lastName}</p>
              <p><strong>Address:</strong> {selectedOrder.deliveryInfo.address}</p>
              <p><strong>Postal Code:</strong> {selectedOrder.deliveryInfo.postalCode}</p>
              <p><strong>Phone:</strong> {selectedOrder.deliveryInfo.phoneNumber}</p>

              <h2 className="padding-top">Items</h2>
              {selectedOrder.items.map((item, index) => (
                <div key={index} className="order-item">
                  <p><strong>ID:</strong> {item.item._id}</p>
                  <p><strong>Item:</strong> {item.item.Name}</p>
                  <p><strong>Quantity:</strong> {item.quantity}</p>
                  <p><strong>Total:</strong> Rs {item.total}</p>
                  <hr />
                </div>
              ))}

              <h2 className="padding-top">Totals</h2>
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
