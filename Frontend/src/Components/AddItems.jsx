import React, { useState } from "react";
import {
  Form,
  FormGroup,
  FormControl,
  FormLabel,
  Button,
} from "react-bootstrap";
import axios from "axios";

function AddItems() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    img: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === "img" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("img", formData.img);

      const response = await axios.post(
        "http://localhost:3000/items/",
        formDataToSend
      );
      alert("Item added successfully");
      setFormData({ name: "", price: "", img: null });
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Failed to add item. Please try again.");
    }
  };

  return (
    // <form onSubmit={handleSubmit}>
    //   <label>
    //     Name:
    //     <input
    //       type="text"
    //       name="name"
    //       value={formData.name}
    //       onChange={handleChange}
    //     />
    //   </label>
    //   <label>
    //     Price:
    //     <input
    //       type="text"
    //       name="price"
    //       value={formData.price}
    //       onChange={handleChange}
    //     />
    //   </label>
    //   <label>
    //     Image:
    //     <input type="file" name="img" onChange={handleChange} />
    //   </label>
    //   <button type="submit">Add Item</button>
    // </form>
    <div className="form-wrapper mt-5">
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel>Name:</FormLabel>
          <FormControl
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Price:</FormLabel>
          <FormControl
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Image:</FormLabel>
          <FormControl type="file" name="img" onChange={handleChange} />
        </FormGroup>
        <Button type="submit" className="mt-4">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default AddItems;
