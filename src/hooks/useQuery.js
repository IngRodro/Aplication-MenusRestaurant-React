import axios from 'axios';
import config from 'config';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAuth } from 'Context/AuthContext';

const { baseUrl } = config;

const useQuery = (
  url,
  page = 1,
  department = '',
  municipality = '',
  needAuth = true
) => {
  const paramsResolve = useMemo(() => {
    return {
      page,
      department,
      municipality,
    };
  }, [page, department, municipality]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [errors, setErrors] = useState(null);
  const { token } = useAuth();

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${baseUrl}${url}`, {
        headers: needAuth ? { 'auth-token': token } : {},
        params: { ...paramsResolve },
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
  }, [url, token, needAuth, paramsResolve]);

  useEffect(() => {
    getData().then();
  }, [getData]);

  return { loading, data, errors, refresh: getData };
};

export default useQuery;
