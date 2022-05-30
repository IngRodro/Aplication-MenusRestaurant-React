import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const baseUrl = `${process.env.REACT_APP_API_URL}/v1`;

const useQuery = (url, paramPage) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [errors, setErrors] = useState(null);

  const getData = useCallback(async () => {
    const token = cookies.get('token');
    setLoading(true);
    try {
      const { data } = await axios.get(`${baseUrl}${url}`, {
        headers: { 'auth-token': token },
        params: { page: paramPage },
      });
      console.log(data);
      setData(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setErrors(err);
      setLoading(false);
      throw new Error(err);
    }
  }, [url, paramPage]);

  useEffect(() => {
    getData().then();
  }, [getData]);

  return { loading, data, errors, refresh: getData };
};

export default useQuery;
