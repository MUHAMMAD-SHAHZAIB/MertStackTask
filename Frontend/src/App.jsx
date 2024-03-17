import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";

import {
  Header,
  Home,
  Checkout,
  All_Items,
  AddItems,
} from "./Components/index.js";

const App = () => {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/all_items" element={<All_Items />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/add-item" element={<AddItems />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
