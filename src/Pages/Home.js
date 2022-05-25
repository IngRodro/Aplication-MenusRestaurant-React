import Button from '../components/Atoms/Button';
import Title from '../components/Atoms/Title';
import Layout from '../components/Organisms/Layout';
import CardRestaurants from '../components/Molecules/CardRestaurants';
import { Col, Row } from 'react-grid-system';
import useQuery from '../hooks/useQuery';
import { useEffect } from 'react';
import styled from 'styled-components';
import { Refresh } from '@styled-icons/heroicons-solid/Refresh';
import { DarkTheme } from '@styled-icons/fluentui-system-regular/DarkTheme';

function Home() {
  const params = {};
  const { data, loading, refresh } = useQuery(
    '/products/6260c52105e6594d65d2c885/'
  );

  useEffect(() => {
    console.log({ data, loading });
  }, [loading, data]);

  return (
    <Layout>
      <Container>
        <Title htmlTag="h1" size={50}>
          Products
        </Title>
        <Button onClick={refresh}>
          {' '}
          <StyleRefreshIcon size={40} />{' '}
        </Button>
      </Container>

      {loading ? (
        <p>
          <b>Loading...</b>
        </p>
      ) : (
        <Row>
          {data.products?.map(({ id, name, image }) => (
            <Col key={id} xs={12} md={6} lg={4}>
              <CardRestaurants name={name} image={image.secure_url} />
            </Col>
          ))}
        </Row>
      )}
      <div style={{ minHeight: '100vh' }} />
    </Layout>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  Button {
    margin: 20px;
    height: 50px;
    width: 50px;
  }
  Title {
    margin: 20px;

    box-sizing: border-box;
  }
`;

const StyleRefreshIcon = styled(Refresh)`
  color: ${({ theme }) => theme.colors.buttonText};
`;

export default Home;
