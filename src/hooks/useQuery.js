import axios from 'axios';
import config from 'config';
import { useCallback, useEffect, useState } from 'react';
import useAuth from './useAuth';

const { baseUrl } = config;

const useQuery = (url, paramPage) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [errors, setErrors] = useState(null);
  const { token } = useAuth().checkAuth();

  const getData = useCallback(async () => {
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
  }, [url, paramPage, token]);

  useEffect(() => {
    getData().then();
  }, [getData]);

  return { loading, data, errors, refresh: getData };
};

export default useQuery;
