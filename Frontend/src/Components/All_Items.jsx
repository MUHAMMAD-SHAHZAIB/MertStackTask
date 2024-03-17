import React, { useEffect } from "react";
import { Card, Button, Container, Col, Row, Spinner } from "react-bootstrap";
import { useProduct } from "../Context/Context";

const All_Items = () => {
  const { products, cart, isLoading, dispatch, getSingleItem } = useProduct();

  // This line return the True because it check the object in cart
  const isItemInCart = (Id) => cart.some((item) => item.id === Id);

  // HandleAddToCart its pass single item id in getSingleItem
  const handleAddToCart = (itemId, e) => {
    e.preventDefault();
    getSingleItem(itemId);
  };

  // HandleRemoveFromCart its dispatch the id to remove item from single item.
  const handleRemoveFromCart = (itemId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { id: itemId } });
  };

  // useEffect run getSingleItem function bydefault rending
  useEffect(() => {}, [getSingleItem]);

  return (
    <>
      {isLoading ? (
        <div className="d-flex flex-column justify-content-center align-items-center mt-5">
          <Spinner animation="border" role="status"></Spinner>
          <span className=" text-black">Loading...</span>
        </div>
      ) : (
        <Container className="mt-5">
          <Row className="g-4">
            {products.map((item, index) => (
              <Col key={index} md={3}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img
                    variant="top"
                    src={`http://localhost:3000/${item.img}`}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>Price: ${item.price}</Card.Text>
                    {isItemInCart(item.id) ? (
                      <Button
                        variant="danger"
                        onClick={() => handleRemoveFromCart(item.id)}
                      >
                        REMOVE
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        onClick={(e) => handleAddToCart(item.id, e)}
                      >
                        Add To Cart
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
};

export default All_Items;
