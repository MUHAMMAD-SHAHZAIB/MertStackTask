import React from "react";
import { Card, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { useProduct } from "../Context/Context";

const Checkout = () => {
  const { cart, isLoading, dispatch } = useProduct();
  // console.log(cart);


  // Its all AddToCart Item showing

  return (
    <Container>
      <h2>Cart Items</h2>

      {isLoading ? (
        <div className="d-flex justify-content-center mt-5">
          <Spinner animation="border" role="status"></Spinner>
          <span className="sr-only">Loading...</span>
        </div>
      ) : cart.length === 0 ? (
        <h3 className="d-flex justify-content-center mt-5">
          No items in the cart
        </h3>
      ) : (
        cart.map((item, index) => (
          <Card key={index} className="mb-3">
            <Card.Body>
              <Row>
                <Col md={1}>
                  <img
                    src={`http://localhost:3000/${item.img}`}
                    alt={item.name}
                    className="img-fluid"
                  />
                </Col>
                <Col md={3} className="d-flex align-items-center">
                  <div>
                    <h4>{item.name}</h4>
                    <p>Price: ${item.price}</p>
                  </div>
                </Col>
                <Col
                  md={3}
                  className="d-flex align-items-center justify-content-center text-center"
                >
                  <div className="price-section d-flex">
                    <p className="mb-0">Quantity:</p>

                    <button className="btn btn-sm btn-outline-secondary mx-2">
                      -
                    </button>
                    <h4 className="mb-0">1</h4>
                    <button className="btn btn-sm btn-outline-secondary mx-2">
                      +
                    </button>
                  </div>
                </Col>
                <Col
                  md={3}
                  className="d-flex align-items-center justify-content-end"
                >
                  <Button
                    variant="danger"
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: { id: item.id },
                      })
                    }
                  >
                    Delete
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};

export default Checkout;
