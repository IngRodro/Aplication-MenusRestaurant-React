import Layout from '../components/Organisms/Layout';
import CardRestaurants from '../components/Molecules/CardRestaurants';
import { Col, Row } from 'react-grid-system';
import useQuery from '../hooks/useQuery';
import HeaderPage from '../components/Molecules/HeaderPage';
import { Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import styled from 'styled-components';
import Cookies from 'universal-cookie';
import { useState } from 'react';

const cookies = new Cookies();
const baseUrl = `${process.env.REACT_APP_API_URL}/v1`;

function Products() {
  const [paramPage, setParamPage] = useState(1);
  const navigate = useNavigate();
  const { data, loading, refresh } = useQuery(`/products`, paramPage);

  const AddProduct = async () => {
    await Swal.fire({
      title: 'Aggregate Product',
      html:
        '<input id="name" class="swal2-input" placeholder="Nombre">' +
        '<input id="image" type="file" class="swal2-file" placeholder="Image" size="500px">',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Add',
      cancelButtonText: 'Cancel',
      preConfirm: () => {
        let name = document.getElementById('name').value;
        let image = document.getElementById('image').files[0];
        if (!name || !image) {
          Swal.showValidationMessage('All fields are required');
        }
        let bodyFormData = new FormData();
        bodyFormData.append('name', name);
        bodyFormData.append('image', image);
        axios({
          method: 'post',
          url: `${baseUrl}/products`,
          data: bodyFormData,
          headers: {
            'Content-Type': 'multipart/form-data',
            'auth-token': cookies.get('token'),
          },
        })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (response) {
            console.log(response);
          });
      },
    });
  };

  const handleClick = (id, name) => {
    alert(id + ' ' + name);
  };

  let totalPages = data?.totalPages || 0;

  return (
    <Layout>
      <HeaderPage title="Products" onRefresh={refresh} onAdd={AddProduct} />
      {loading ? (
        <p>
          <b>Loading...</b>
        </p>
      ) : (
        <Row>
          {data.products?.map(({ id, name, image }) => (
            <Col key={id} xs={12} md={6} lg={4}>
              <CardRestaurants
                name={name}
                image={image.secure_url}
                action={() => handleClick(id, name)}
              />
            </Col>
          ))}
        </Row>
      )}
      <PaginationContainer>
        <Pagination
          count={totalPages}
          variant="outlined"
          shape="rounded"
          color={'primary'}
          onChange={(e, page) => {
            navigate(`/products?page=${page}`);
            setParamPage(page);
          }}
        />
      </PaginationContainer>
    </Layout>
  );
}

export default Products;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.background};
  padding: 20px 0;
`;
