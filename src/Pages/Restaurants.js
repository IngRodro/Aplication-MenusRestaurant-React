import Layout from '../components/Organisms/Layout';
import CardRestaurants from '../components/Molecules/CardRestaurants';
import { Col, Row } from 'react-grid-system';
import useQuery from '../hooks/useQuery';
import useModal from '../hooks/useModal';
import HeaderPage from '../components/Molecules/HeaderPage';
import { AddProductModal } from '../components/Molecules/Modals';

function Restaurants() {
  const { visible, onToggle } = useModal();
  const { data, loading, refresh } = useQuery('/restaurants/byUser');

  const handleClick = (id, name) => {
    alert(id + ' ' + name);
  };

  return (
    <Layout>
      <HeaderPage title="Products" onRefresh={refresh} />
      {loading ? (
        <p>
          <b>Loading...</b>
        </p>
      ) : (
        <Row>
          {data.restaurants?.map(({ id, name, image }) => (
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
      <AddProductModal isOpen={visible} onCancel={onToggle} />
    </Layout>
  );
}

export default Restaurants;
