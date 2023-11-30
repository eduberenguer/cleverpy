import { PropagateLoader } from 'react-spinners';
import { useEffect } from 'react';
import style from './users.module.scss';
import { useUsers } from '../../hooks/use.users';
import { UserCard } from '../user.card/user.card';
import Reveal from '../../utils/reveal';

export default function Users() {
  const { loadUsers, users, usersState } = useUsers();

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return (
    <>
      {usersState === 'idle' && (
        <PropagateLoader
          color="black"
          className={style.spinner}
          data-testid="spinner"
        />
      )}
      {usersState === 'loaded' && (
        <Reveal delay={0.2}>
          <ul className={style.list} role="list">
            {users.map((item) => (
              <UserCard key={item.id} item={item}></UserCard>
            ))}
          </ul>
        </Reveal>
      )}
    </>
  );
}
