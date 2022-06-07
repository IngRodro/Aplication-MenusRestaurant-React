import Layout from 'components/Organisms/Layout';
import { Col, Row } from 'react-grid-system';
import useQuery from 'hooks/useQuery';
import HeaderPage from 'components/Molecules/HeaderPage';
import CardMenu from 'components/Molecules/Cards/CardMenus';
import { useParams } from 'react-router-dom';
import CreateOrUpdateMenu from 'components/Molecules/Modals/CreateorUpdateMenusOptions/CreateorUpdateMenu';
import useModal from 'hooks/useModal';

function Menus() {
  const { id } = useParams();
  const { data, loading, refresh } = useQuery(`/menu/${id}`);
  const { visible, onToggle } = useModal();
  const { visible: isUpdate, onHidden, onVisible } = useModal();

  return (
    <Layout>
      <HeaderPage title="Menu" onRefresh={refresh} onAdd={onToggle} />
      {loading ? (
        <p>
          <b>Loading...</b>
        </p>
      ) : (
        <Row>
          {data?.menus?.map(({ id, name, products, type }) =>
            type === 'Product' ? (
              <Col key={id} xs={12} md={6} lg={4}>
                <CardMenu
                  name={name}
                  products={products}
                  action={() => alert('action')}
                />
              </Col>
            ) : (
              <Col key={id} xs={12} md={6} lg={4}>
                <CardMenu name={name} products={products} />
              </Col>
            )
          )}
        </Row>
      )}
      <CreateOrUpdateMenu isOpen={visible} onCancel={onToggle} />
    </Layout>
  );
}

export default Menus;
