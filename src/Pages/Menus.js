import Layout from 'components/Organisms/Layout';
import { Col, Row } from 'react-grid-system';
import useQuery from 'hooks/useQuery';
import HeaderPage from 'components/Molecules/HeaderPage';
import CardMenu from 'components/Molecules/Cards/CardMenus';
import { useParams } from 'react-router-dom';
import CreateOrUpdateMenu from 'components/Molecules/Modals/CreateorUpdateMenusOptions/CreateorUpdateMenu';
import useModal from 'hooks/useModal';
import { useState } from 'react';

function Menus() {
  const { id } = useParams();
  const { data, loading, refresh } = useQuery(`/menu/${id}`);
  const { visible, onToggle } = useModal();
  const [menuEdit, setMenuEdit] = useState(null);
  const { visible: isUpdate, onHidden, onVisible } = useModal();

  const onEdit = (menu) => {
    onVisible();
    setMenuEdit(menu);
    onToggle();
  };

  return (
    <Layout>
      <HeaderPage title="Menu" onRefresh={refresh} onAdd={onToggle} />
      {loading ? (
        <p>
          <b>Loading...</b>
        </p>
      ) : (
        <Row>
          {data?.menus?.map((menu) => (
            <Col key={menu.id} xs={12} md={6} lg={4}>
              <CardMenu
                name={menu.name}
                products={menu.products}
                isActionButtons={true}
                onUpdate={async () => onEdit(menu)}
                isUpdate={isUpdate}
              />
            </Col>
          ))}
        </Row>
      )}
      <CreateOrUpdateMenu
        isOpen={visible}
        onCancel={onToggle}
        idRestaurant={id}
        onRefresh={refresh}
        isUpdate={isUpdate}
        menu={menuEdit}
      />
    </Layout>
  );
}

export default Menus;
