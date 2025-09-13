import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import { useParams } from "react-router-dom";
import { Button, Container, Row, Col, Form, Spinner, Card } from "react-bootstrap";

const Details = () => {
  const params = useParams();
  const firebase = useFirebase();
  const [data, setData] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    firebase.getDocById(params.bookId).then((val) => setData(val.data()));
  }, [firebase, params.bookId]);

  if (data == null)
    return (
      <Container className="mt-5 d-flex justify-content-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );

  const placeOrder = () => {
    firebase.placeOrder(params.bookId, qty);
    alert("Order Placed 🎉");
  };

  return (
    <Container className="mt-5">
      <Row className="g-4">
        {/* Left Side - Book Image */}
        <Col xs={12} md={5} className="d-flex justify-content-center">
          <Card className="shadow-sm border-0">
            <Card.Img
              variant="top"
              src={data.coverUrl}
              className="img-fluid rounded"
              style={{ maxHeight: "500px", objectFit: "cover" }}
            />
          </Card>
        </Col>

        {/* Right Side - Book Details */}
        <Col xs={12} md={7}>
          <Card className="p-4 shadow-sm border-0 h-100">
            <h2 className="mb-3">{data.name}</h2>
            <p className="text-muted">
              This book is titled "<strong>{data.name}</strong>" and costs <strong>Rs.{data.price}</strong>. 
              It is written by <strong>{data.displayName}</strong>.
            </p>

            <p><strong>ISBN Number:</strong> {data.isbn}</p>
            <p><strong>Price:</strong> Rs.{data.price}</p>
            <p><strong>Contact:</strong> {data.userEmail}</p>

            <div className="d-flex align-items-center mb-3">
              <img
                src={data.photoURL}
                width="40px"
                height="40px"
                alt="User"
                className="rounded-circle me-2"
              />
              <strong>{data.displayName}</strong>
            </div>

            <Form.Group className="mb-3" controlId="formQty">
              <Form.Label><strong>Quantity</strong></Form.Label>
              <Form.Control
                type="number"
                min="1"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
              />
            </Form.Group>

            <Button onClick={placeOrder} variant="success" className="w-100">
              Buy Now
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Details;
