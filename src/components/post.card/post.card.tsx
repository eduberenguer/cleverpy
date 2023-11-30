import { Link } from 'react-router-dom';
import { Post } from '../../models/post.model';
import { User } from '../../models/user.model';
import { MdDeleteOutline } from 'react-icons/md';
import style from './post.card.module.scss';
import { usePosts } from '../../hooks/use.posts';
import { useUsers } from '../../hooks/use.users';

type PropsType = {
  item: Post;
  userName: User['name'];
};

export function PostCard({ item, userName }: PropsType) {
  const { deletePost } = usePosts();
  const { token } = useUsers();

  return (
    <li data-testid="post-card" className={style.card}>
      <div className={style['user-info']}>
        <img
          src={`https://robohash.org/${userName}`}
          alt={`${userName} profile picture`}
        />
        <span className={style.user}>posted by @{userName}</span>
        {token && (
          <button
            className={style.delete}
            onClick={() => {
              deletePost(item.id);
            }}
          >
            <MdDeleteOutline />
          </button>
        )}
      </div>
      <div className={style.title}>
        <h2>{item.title}</h2>
      </div>
      <div className={style.hr}></div>

      <p className={style.body}>{item.body}</p>
      <Link to={`details/${item.id}`}>
        <span>Read More</span>
      </Link>
    </li>
  );
}
