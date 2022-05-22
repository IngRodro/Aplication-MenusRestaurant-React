import { useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Organisms/Navbar';
import Login from './Login';

function Home() {
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + '/v1/pets')
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Navbar />
      <Login />
    </>
  );
}

export default Home;
