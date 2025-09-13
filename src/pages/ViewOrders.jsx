import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase.jsx";
import Cards from "../components/Card";
import { Spinner, Container } from "react-bootstrap";

const ViewOrders = () => {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (firebase.isLoggedIn) {
      setLoading(true);
      firebase.fetchMyBooks(firebase.user.uid).then((books) => {
        setBooks(books.docs);
        setLoading(false);
      });
    }
  }, [firebase]);

  // Not logged in
  if (!firebase.isLoggedIn)
    return (
      <Container className="text-center mt-5">
        <h2 className="fw-bold">🔑 Please login to view your orders</h2>
      </Container>
    );

  // Loading state
  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center mt-5">
        <Spinner animation="border" role="status" />
        <span className="ms-2">Loading your books...</span>
      </div>
    );

  // Empty state
  if (books.length === 0)
    return (
      <Container className="text-center mt-5">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4076/4076507.png"
          alt="No Books"
          style={{ maxWidth: "200px", opacity: 0.8 }}
        />
        <h3 className="fw-bold mt-3">No Books Published Yet 🤞</h3>
        <p className="text-muted">
          Start publishing books and your orders will appear here.
        </p>
      </Container>
    );

  return (
    <Container className="mt-5">
      <h2 className="fw-bold mb-4 text-center">📦 Your Book Listings</h2>

      {/* Responsive grid for books */}
      <div
        className="d-grid gap-4 justify-content-center"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        }}
      >
        {books.map((book) => (
          <div
            key={book.id}
            className="shadow rounded p-2 bg-white"
            style={{
              maxWidth: "300px",
              margin: "0 auto",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow =
                "0 8px 20px rgba(0, 0, 0, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 12px rgba(0, 0, 0, 0.05)";
            }}
          >
            <Cards link={`/books/orders/${book.id}`} {...book.data()} />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default ViewOrders;
