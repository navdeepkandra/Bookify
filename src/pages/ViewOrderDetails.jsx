import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase.jsx";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const ViewOrderDetails = () => {
  const firebase = useFirebase();
  const params = useParams();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    firebase.getOrders(params.bookId).then((orders) => {
      setOrders(orders.docs);
      setLoading(false);
    });
  }, [firebase, params.bookId]);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center mt-5">
        <Spinner animation="border" />
        <span className="ms-2">Fetching orders...</span>
      </div>
    );

  if (orders.length === 0)
    return (
      <div className="container text-center mt-5">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4275/4275497.png"
          alt="No Orders"
          style={{ maxWidth: "180px", opacity: 0.8 }}
        />
        <h3 className="fw-bold mt-3">No Orders Yet 🤞</h3>
        <p className="text-muted">
          Orders for this book will appear here once someone purchases it.
        </p>
      </div>
    );

  return (
    <div className="container mt-5">
      <h2 className="fw-bold mb-4 text-center">📋 Orders for this Book</h2>

      <div
        className="d-grid gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}
      >
        {orders.map((order) => {
          const data = order.data();
          return (
            <div
              key={order.id}
              className="shadow rounded p-4 bg-white"
              style={{
                borderLeft: "5px solid #0d6efd",
                wordWrap: "break-word", // ✅ Wraps long words
                overflowWrap: "break-word", // ✅ Prevent overflow
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 20px rgba(0, 0, 0, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(0, 0, 0, 0.05)";
              }}
            >
              <h5 className="fw-bold mb-3">
                <i className="bi bi-person-fill me-2 text-primary"></i>
                {data.displayName}
              </h5>
              <p className="mb-2">
                <i className="bi bi-cart-fill me-2 text-success"></i>
                <strong>Quantity:</strong> {data.qty}
              </p>
              <p
                className="mb-0 text-break"
                style={{ fontSize: "0.9rem", color: "#555" }}
              >
                <i className="bi bi-envelope-fill me-2 text-secondary"></i>
                <strong>Email:</strong>{" "}
                <span style={{ wordBreak: "break-all" }}>{data.userEmail}</span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewOrderDetails;
