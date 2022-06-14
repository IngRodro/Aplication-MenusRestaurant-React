import Layout from '../../components/Organisms/Layout';
import { Col, Row } from 'react-grid-system';
import useQuery from '../../hooks/useQuery';
import HeaderPage from '../../components/Molecules/HeaderPage';
import Card from '../../components/Molecules/Cards/CardProducts';
import { useNavigate, useSearchParams } from 'react-router-dom';
import dataJson from 'data/data.json';
import { useEffect, useMemo, useState } from 'react';
import Select from '../../components/Atoms/Select';
import { PaginationContainer, StyledPagination } from '../style';

function RestaurantsHome() {
  const [page, setPage] = useState(1);
  const [department, setDepartment] = useState('San Salvador');
  const [municipality, setMunicipality] = useState('San Salvador');
  const [totalPages, setTotalPages] = useState(0);
  const { data, loading, refresh } = useQuery(
    '/restaurants/',
    page,
    department,
    municipality,
    true
  );
  const navigate = useNavigate();

  const dataDepartment = useMemo(() => {
    console.log(dataJson);
    if (!dataJson?.deptos) return [];
    return dataJson?.deptos?.map((item) => {
      const { name = '' } = item;

      return {
        value: name,
        label: name,
      };
    });
  }, [dataJson]);

  const dataMunicipality = useMemo(() => {
    if (!dataJson?.deptos) return [];
    const dataMunicipality = dataJson?.deptos?.find(
      (item) => item.name === department
    );
    if (!dataMunicipality?.municipios) return [];
    return dataMunicipality?.municipios?.map((item) => {
      return {
        value: item,
        label: item,
      };
    });
  }, [department, dataJson]);

  const onchangeDepartment = async (e) => {
    setDepartment(e.value);
  };

  const onchangeMunicipality = async (e) => {
    setMunicipality(e.value);
  };
  useEffect(() => {
    setTotalPages(data?.totalPages || 0);
  }, [data?.totalPages]);

  return (
    <Layout>
      <HeaderPage title="Restaurants" onRefresh={refresh} />
      <div
        className="container-select"
        style={{
          textAlign: 'left',
          display: 'inline-block',
          marginRight: '15px',
        }}
      >
        <Select
          required
          type="text"
          name="Department"
          options={dataDepartment}
          placeholder="Department"
          onChange={(e) => onchangeDepartment(e)}
        />
        <Select
          required
          type="text"
          name="Municipality"
          options={dataMunicipality}
          placeholder="Municipality"
          onChange={(e) => onchangeMunicipality(e)}
        />
      </div>
      {loading ? (
        <p>
          <b>Loading...</b>
        </p>
      ) : data.length === 0 ? (
        <h1>Not Found</h1>
      ) : (
        <Row>
          {data?.restaurants?.map(({ id, name, image }) => (
            <Col key={id} xs={12} md={6} lg={4}>
              <Card
                name={name}
                image={image.secure_url}
                action={() => navigate(`/home/menus/${id}`)}
                isActionButtons={true}
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
          page={parseInt(page, 10)}
          onChange={(e, page) => {
            setPage(page);
          }}
        />
      </PaginationContainer>
    </Layout>
  );
}

export default RestaurantsHome;
