import { SyntheticEvent, useEffect } from 'react';
import { usePosts } from '../../hooks/use.posts';
import style from './filter.module.scss';
import { PiListMagnifyingGlass } from 'react-icons/pi';
import { useUsers } from '../../hooks/use.users';
import { ChangeEvent } from 'react';

type Props = {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function Filter({ value, onChange }: Props) {
  const { loadPosts } = usePosts();
  const { loadUsers, users } = useUsers();

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleFilter = (event: SyntheticEvent<HTMLSelectElement>) => {
    const filter = event.currentTarget.value;
    loadPosts(filter);
  };

  return (
    <section className={style.filter}>
      <input
        type="text"
        placeholder="Filter by title"
        value={value}
        onChange={onChange}
      />
      <PiListMagnifyingGlass />
      <select defaultValue={''} onChange={handleFilter}>
        <option value="" disabled>
          Filter by author ▾
        </option>
        <option value="">All posts</option>
        {users.map((user) => (
          <option value={user.id} key={user.id}>
            {`${user.name}`}
          </option>
        ))}
      </select>
    </section>
  );
}
