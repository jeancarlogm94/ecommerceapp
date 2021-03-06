import axios from 'axios';
import '../styles/home.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  filterCategory,
  filterHeadline,
  getProducts,
} from '../store/slices/products.slices';
import {
  Card,
  Col,
  FormControl,
  InputGroup,
  ListGroup,
  Row,
} from 'react-bootstrap';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);

  const products = useSelector((state) => state.products);

  useEffect(() => {
    // window.scrollTo(0, 0);
    dispatch(getProducts());
    axios
      .get(
        'https://ecommerce-api-react.herokuapp.com/api/v1/products/categories'
      )
      .then((res) => setCategories(res.data.data.categories));
  }, [dispatch]);

  const filterProducts = () => {
    dispatch(filterHeadline(search));
  };

  // console.log(products);

  const selectCategory = (id) => {
    dispatch(filterCategory(id));
  };

  return (
    <div>
      <Row>
        <Col>
          <ListGroup className="mt-3" style={{ cursor: 'pointer' }}>
            {categories.map((category) => (
              <ListGroup.Item
                key={category.id}
                onClick={() => selectCategory(category.id)}
              >
                {category.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>

      <Row>
        <Col>
          <InputGroup styles={{ margin: '15px' }} className="my-3">
            <FormControl
              placeholder="Search by Product"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              style={{ borderRadius: '10px' }}
            />

            <i
              style={{
                cursor: 'pointer',
                backgroundColor: '#4582ec',
                padding: '14px',
                borderRadius: '50%',
                color: 'white',
              }}
              class="mx-2 fa-solid fa-1x fa-magnifying-glass"
              onClick={filterProducts}
            ></i>
          </InputGroup>
        </Col>
      </Row>

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {products.map((productItem) => (
          <Col key={productItem.id}>
            <Card
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 'auto',
                height: '300px',
                maxWidth: '300px',
                cursor: 'pointer',
              }}
              onClick={() => navigate(`/products/${productItem.id}`)}
            >
              <Card.Img
                id="product-1"
                className="mx-auto"
                style={{
                  width: 'auto',
                  height: 'auto',
                  maxHeight: '200px',
                  maxWidth: '200px',
                }}
                src={productItem.productImgs?.[0]}
              />
            </Card>

            <Card
              className="my-2"
              style={{
                width: 'auto',
                height: '100px',
                maxWidth: '300px',
                cursor: 'pointer',
                padding: '10px',
              }}
              onClick={() => navigate(`/products/${productItem.id}`)}
            >
              <Card.Title>{productItem.title}</Card.Title>
              <Card.Text>Price ${productItem.price}</Card.Text>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;
