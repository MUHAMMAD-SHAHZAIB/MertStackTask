import React from "react";
import Button from "react-bootstrap/Button";
import { Link, Outlet } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="d-flex justify-content-center  gap-5 mt-5">
        <Link to="/all_items">
          <Button variant="primary">All Item</Button>
        </Link>
        <Link to="/add-item">
          <Button variant="primary">Add Item</Button>
        </Link>
        <Link to="/checkout">
          <Button variant="primary">CheckOut</Button>
        </Link>
      </div>
      <Outlet />
    </>
  );
};

export default Home;
