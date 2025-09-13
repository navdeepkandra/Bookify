import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

const Cards = (props) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const description = `This book has title "${props.name}" and this book costs around Rs.${props.price}, This book is written by ${props.displayName}`;

  return (
    <Card
      className="h-100 shadow-sm border-0"
      style={{
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px) scale(1.02)";
        e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
      }}
    >
      <Card.Img
        variant="top"
        src={props.coverUrl}
        alt={props.name}
        style={{
          height: "220px",
          objectFit: "cover",
          borderTopLeftRadius: "0.75rem",
          borderTopRightRadius: "0.75rem",
        }}
      />
      <Card.Body className="d-flex flex-column">
        {/* Title */}
        <Card.Title className="fw-bold mb-2">
          {truncateText(props.name, 40)}
        </Card.Title>

        {/* Description with toggle */}
        <Card.Text className="text-muted flex-grow-1" style={{ fontSize: "0.9rem" }}>
          {expanded ? description : truncateText(description, 100)}
        </Card.Text>

        {description.length > 100 && (
          <Button
            variant="link"
            size="sm"
            className="p-0 mb-2 text-decoration-none"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Read Less" : "Read More"}
          </Button>
        )}

        {/* CTA Button */}
        <Button
          onClick={() => navigate(props.link)}
          variant="primary"
          className="w-100 mt-auto fw-semibold"
        >
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Cards;
