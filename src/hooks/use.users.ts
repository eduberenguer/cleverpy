import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { UsersRepository } from '../services/users.repository';
import { getUsersAsync } from '../redux/users.thunks';
import { API_URL } from '../config';
import { usersActions } from '../redux/users.slice';
import { useNavigate } from 'react-router-dom';
import { LoginCredentials } from '../types/loginCredentials';
import Swal from 'sweetalert2';
export function useUsers() {
  const repo = useMemo(() => new UsersRepository(API_URL), []);
  const navigate = useNavigate();

  const { users, usersState, currentUser, token } = useSelector(
    (state: RootState) => state.users
  );
  const dispatch = useDispatch<AppDispatch>();

  const loadUsers = useCallback(async () => {
    await dispatch(getUsersAsync(repo));
  }, [repo, dispatch]);

  const loginUser = async (credentials: LoginCredentials) => {
    try {
      const loginResponse = await repo.login(credentials);
      dispatch(usersActions.loginUser(loginResponse));
      Swal.fire({
        position: 'center',
        color: 'white',
        html: '<span>SUCCESSFULLY SIGNED IN<span/>',
        icon: 'success',
        background: 'transparent',
        showConfirmButton: false,
        iconColor: 'white',
        backdrop: '#000000cc',
        timer: 2000,
      });
      navigate('/');
    } catch (error) {
      Swal.fire({
        position: 'center',
        color: 'white',
        html: '<span>INVALID EMAIL OR USERNAME<span/>',
        icon: 'error',
        background: 'transparent',
        showConfirmButton: false,
        iconColor: 'white',
        backdrop: '#000000cc',
        timer: 2000,
      });
      dispatch(usersActions.loginError());
    }
  };

  const logoutUser = () => {
    dispatch(usersActions.logoutUser());
    navigate('/');
  };

  return {
    loadUsers,
    loginUser,
    logoutUser,
    users,
    usersState,
    currentUser,
    token,
  };
}
