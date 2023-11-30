import { User } from '../../models/user.model';
import style from './user.card.module.scss';

type PropsType = {
  item: User;
};

export function UserCard({ item }: PropsType) {
  return (
    <li data-testid="user-card" className={style.card}>
      <img
        src={`https://robohash.org/${item.username}`}
        alt={`${item.username} profile picture`}
      />
      <section>
        <span className={style.username}>@{item.username}</span>
        <ul className={style.body}>
          <li>
            Full name: <span>{item.name}</span>
          </li>
          <li>
            City:
            <span>
              {item.address.city} ({item.address.zipcode})
            </span>
          </li>
          <li>
            Company: <span>{item.company.name}</span>
          </li>
          <li>
            Website: <span>{item.website}</span>
          </li>
          <li>
            Phone: <span>{item.phone}</span>
          </li>
          <li>
            Email: <span>{item.email}</span>
          </li>
        </ul>
      </section>
    </li>
  );
}
