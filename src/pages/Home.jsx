import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import Cards from "../components/Card";
import { Container, Row, Col, Spinner, Button } from "react-bootstrap";

const Home = () => {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase.getAllDocs().then((books) => {
      setBooks(books.docs);
      setLoading(false);
    });
  }, [firebase]);

  if (loading) {
    return (
      <Container className="mt-5 d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <>
      {/* 🔹 Hero Section */}
      <div
        style={{
          background: "linear-gradient(135deg, #007bff, #6610f2)",
          color: "white",
          padding: "4rem 1rem",
          textAlign: "center",
          borderRadius: "0 0 20px 20px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
        }}
      >
        <h1 className="fw-bold display-5">Welcome to Bookify</h1>
        <p className="lead mt-3 mb-4">
          Discover, buy, and sell books easily. Your next favorite read is just a click away 📚
        </p>
        <Button href="/books/list" variant="light" size="lg" className="fw-bold">
          + Add Your Book
        </Button>
      </div>

      {/* 🔹 Book List Section */}
      <Container className="mt-5">
        <h2 className="text-center fw-bold mb-4">Available Books</h2>

        {books.length > 0 ? (
          <Row className="g-4">
            {books.map((book) => (
              <Col xs={12} sm={6} md={4} lg={3} key={book.id}>
                <Cards link={`/books/view/${book.id}`} id={book.id} {...book.data()} />
              </Col>
            ))}
          </Row>
        ) : (
          <div className="text-center mt-5">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
              alt="No books"
              style={{ width: "180px", opacity: 0.8 }}
            />
            <p className="text-muted mt-3">
              No books are available right now. Be the first one to list a book!
            </p>
            <Button href="/books/list" variant="primary">
              Add Listing
            </Button>
          </div>
        )}
      </Container>
    </>
  );
};

export default Home;
