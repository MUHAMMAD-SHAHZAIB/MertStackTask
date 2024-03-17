import { FaShoppingCart } from "react-icons/fa";
import {
  Badge,
  Container,
  FormControl,
  Nav,
  Navbar,
  ButtonGroup,
} from "react-bootstrap";
import { useProduct } from "../Context/Context";

const Header = () => {
  const { cart, dispatch } = useProduct();

  console.log(cart.length);
  return (
    <div>
      <Navbar bg="dark" variant="dark" style={{ height: 80 }}>
        <Container>
          <Navbar.Brand>Shopping Cart</Navbar.Brand>

          <Navbar.Text className="search">
            <FormControl
              style={{ width: 500 }}
              type="search"
              placeholder="Search a product..."
              className="m-auto"
              aria-label="Search"
              onChange={(e) => {
                dispatch({
                  type: "FILTER_BY_SEARCH",
                  payload: e.target.value,
                });
              }}
            />
          </Navbar.Text>

          <ButtonGroup variant="success">
            <FaShoppingCart color="white" fontSize="25px" />
            <Badge>{cart.length}</Badge>
          </ButtonGroup>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
