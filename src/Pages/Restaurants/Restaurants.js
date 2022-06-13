import Layout from '../../components/Organisms/Layout';
import { Col, Row } from 'react-grid-system';
import useQuery from '../../hooks/useQuery';
import HeaderPage from '../../components/Molecules/HeaderPage';
import Card from '../../components/Molecules/Cards/CardProducts';
import { useNavigate } from 'react-router-dom';

function Restaurants() {
  const { data, loading, refresh } = useQuery(
    '/restaurants/byUser',
    null,
    true
  );
  const navigate = useNavigate();

  return (
    <Layout>
      <HeaderPage
        title="Restaurants"
        onRefresh={refresh}
        onAdd={() => console.log('')}
      />
      {loading ? (
        <p>
          <b>Loading...</b>
        </p>
      ) : (
        <Row>
          {data?.map(({ id, name, image }) => (
            <Col key={id} xs={12} md={6} lg={4}>
              <Card
                name={name}
                image={image.secure_url}
                action={() => navigate(`/app/menus/${id}`)}
                isActionButtons={true}
              />
            </Col>
          ))}
        </Row>
      )}
    </Layout>
  );
}

export default Restaurants;
