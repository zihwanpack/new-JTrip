import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import { delay } from '../utils/delay.ts';
import toast from 'react-hot-toast';

export const useLoginPageEffect = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!loading && user) {
      (async () => {
        await delay(() => {}, 200);
        navigate('/', { replace: true });
      })();
    }
  }, [loading, user, navigate]);

  useEffect(() => {
    if (location.state?.message) {
      toast.error(location.state.message);
    }
  }, [location.state]);
};
