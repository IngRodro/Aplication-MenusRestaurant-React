import Layout from 'components/Organisms/Layout';
import CardRestaurants from 'components/Molecules/Cards/CardProducts';
import { Col, Row } from 'react-grid-system';
import useQuery from 'hooks/useQuery';
import HeaderPage from 'components/Molecules/HeaderPage';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from 'hooks/useAuth';
import { useState } from 'react';
import { PaginationContainer, StyledPagination } from './style';
import CreateorUpdateProduct from 'components/Molecules/Modals/CreateorUpdateProduct/CreateorUpdateProduct';
import useModal from 'hooks/useModal';
import useMutation from '../../hooks/useMutation';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

function Products() {
  const { visible, onToggle } = useModal();
  const [searchParams] = useSearchParams();
  const [productEdit, setProductEdit] = useState(null);
  const { visible: isUpdate, onHidden, onVisible } = useModal();
  const { token } = useAuth().checkAuth();
  const paramPage = searchParams.get('page');
  const navigate = useNavigate();
  const { data, loading, refresh } = useQuery(`/products`, paramPage);
  const [DeleteProduct, { loading: loadingAddOrUpdatePet }] = useMutation(
    `/products`,
    {
      method: 'delete',
      refresh: async () => {
        await refresh();
      },
      headers: {
        'auth-token': token,
      },
    }
  );

  const onEdit = (prod) => {
    onVisible();
    setProductEdit(prod);
    onToggle();
  };

  const onClose = () => {
    onHidden();
    setProductEdit(null);
    onToggle();
  };

  const onDelete = async (id) => {
    await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this product!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.value) {
        await DeleteProduct({ idDelete: id });
        await Toast.fire({
          icon: 'success',
          title: 'Product deleted',
          position: 'bottom-end',
        });
      }
    });
  };

  let totalPages = data?.totalPages || 1;

  return (
    <Layout>
      <HeaderPage title="Products" onRefresh={refresh} onAdd={onToggle} />
      {loading ? (
        <p>
          <b>Loading...</b>
        </p>
      ) : (
        <Row>
          {data?.products?.map((prod) => (
            <Col key={prod.id} xs={12} md={6} lg={4}>
              <CardRestaurants
                name={prod.name}
                image={prod.image.secure_url}
                isActionButtons={true}
                onDelete={() => onDelete(prod.id)}
                onUpdate={async () => onEdit(prod)}
              />
            </Col>
          ))}
        </Row>
      )}
      <PaginationContainer>
        <StyledPagination
          count={totalPages}
          variant="outlined"
          shape="rounded"
          size="large"
          page={parseInt(paramPage, 10)}
          onChange={(e, page) => {
            navigate(`/products?page=${page}`);
          }}
        />
      </PaginationContainer>
      <CreateorUpdateProduct
        product={productEdit}
        isOpen={visible}
        isUpdate={isUpdate}
        onRefresh={refresh}
        onCancel={onClose}
      />
    </Layout>
  );
}

export default Products;
