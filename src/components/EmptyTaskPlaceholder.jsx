import React from "react";
import Card from "react-bootstrap/Card";

const EmptyTaskPlaceholder = ({ textToShow }) => {
  return (
    <Card
      style={{
        margin: "15px",
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
    >
      <Card.Body>
        <Card.Title>{textToShow}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default EmptyTaskPlaceholder;
