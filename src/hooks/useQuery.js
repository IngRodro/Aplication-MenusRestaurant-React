import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import Cookies from 'universal-cookie';

const baseUrl = `${process.env.REACT_APP_API_URL}/v1`;

const useQuery = (url) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [errors, setErrors] = useState(null);
  const cookies = new Cookies();

  const getData = useCallback(async () => {
    setLoading(true);
    console.log(cookies.get('token'));
    try {
      const { data } = await axios.get(`${baseUrl}${url}`, {
        headers: { 'auth-token': cookies.get('token') },
        params: {
          municipality: 'San Salvador',
          department: 'San Salvador',
          page: 1,
        },
      });
      setData(data);
      console.log(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setErrors(err);
      setLoading(false);
      throw new Error(err);
    }
  }, [url]);

  useEffect(() => {
    getData().then();
  }, [getData]);

  return { loading, data, errors, refresh: getData };
};

export default useQuery;
