import axios from 'axios';
import config from 'config';
import { useCallback, useEffect, useState } from 'react';
import { useAuth } from 'Context/AuthContext';

const { baseUrl } = config;

const useQuery = (url, paramPage, needAuth = true) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [errors, setErrors] = useState(null);
  const { token } = useAuth();

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const config = paramPage
        ? {
            headers: needAuth ? { 'auth-token': token } : {},
            params: { page: paramPage },
          }
        : { headers: needAuth ? { 'auth-token': token } : {} };

      const { data } = await axios.get(`${baseUrl}${url}`, config);
      console.log(data);
      setData(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setErrors(err);
      setLoading(false);
      throw new Error(err);
    }
  }, [url, paramPage, token, needAuth]);

  useEffect(() => {
    getData().then();
  }, [getData]);

  return { loading, data, errors, refresh: getData };
};

export default useQuery;
