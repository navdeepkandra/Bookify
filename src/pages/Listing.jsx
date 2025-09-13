import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/Firebase.jsx";
import { useNavigate } from "react-router-dom";

const Listing = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [isbnNum, setIsbnNum] = useState("");
  const [price, setPrice] = useState("");
  const [coverPic, setCoverPic] = useState();
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await firebase.handleNewListing(name, isbnNum, price, coverPic);
      alert("✅ Book listing created successfully!");
      setName("");
      setIsbnNum("");
      setPrice("");
      setCoverPic(null);
      setPreviewUrl(null);
      navigate("/");
    } catch (error) {
      alert("❌ Error creating listing: " + error.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div
        className="shadow p-4 rounded"
        style={{
          maxWidth: "500px",
          width: "100%",
          background: "#fff",
          borderRadius: "1rem",
        }}
      >
        <h2 className="text-center mb-4 fw-bold">📚 Create Book Listing</h2>

        <Form onSubmit={handleSubmit}>
          {/* Book Name */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Book Name</Form.Label>
            <Form.Control
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Enter book name"
              className="rounded-pill"
              required
            />
          </Form.Group>

          {/* ISBN Number */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">ISBN Number</Form.Label>
            <Form.Control
              onChange={(e) => setIsbnNum(e.target.value)}
              value={isbnNum}
              type="text"
              placeholder="Enter ISBN number"
              className="rounded-pill"
              required
            />
          </Form.Group>

          {/* Price */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Price (₹)</Form.Label>
            <Form.Control
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              type="number"
              min="1"
              placeholder="Enter price"
              className="rounded-pill"
              required
            />
          </Form.Group>

          {/* Cover Pic */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Cover Picture</Form.Label>
            <Form.Control
              onChange={(e) => {
                const file = e.target.files[0];
                setCoverPic(file);
                setPreviewUrl(URL.createObjectURL(file));
              }}
              type="file"
              accept="image/*"
              className="rounded"
              required
            />
          </Form.Group>

          {/* Live Preview */}
          {previewUrl && (
            <div className="mb-3 text-center">
              <p className="fw-semibold mb-2">Preview:</p>
              <img
                src={previewUrl}
                alt="Preview"
                style={{
                  maxWidth: "250px",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />
            </div>
          )}

          {/* Submit Button */}
          <Button
            variant="primary"
            type="submit"
            className="w-100 fw-bold rounded-pill"
            style={{ transition: "all 0.3s ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            ✅ Create Listing
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Listing;
