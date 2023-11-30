import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { usePosts } from '../../hooks/use.posts';
import { useUsers } from '../../hooks/use.users';
import style from './details.module.scss';
import { User } from '../../models/user.model';
import { Comment } from '../../models/comment.model';
import { TfiCommentAlt } from 'react-icons/tfi';
import { API_URL } from '../../config';
import Reveal from '../../utils/reveal';

export default function Details() {
  const { id } = useParams();
  const [commentsData, setCommentsData] = useState<Comment[]>([]);
  const { loadUsers, users } = useUsers();
  const { posts, loadPosts } = usePosts();

  useEffect(() => {
    loadPosts();
    loadUsers();
  }, [loadPosts, loadUsers]);

  useEffect(() => {
    const fetchCommentsData = async (id: string) => {
      try {
        const response = await fetch(`${API_URL}posts/${id}/comments`);
        const data = (await response.json()) as Comment[];
        setCommentsData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCommentsData(id!);
  }, [id]);

  const postId = id && parseInt(id, 10);
  const item = posts.find((post) => post.id === postId);
  const userId = item?.userId;
  const author = userId && (users.find((user) => user.id === userId) as User);

  return (
    <>
      <main className={style.details}>
        {item && author && (
          <>
            <section className={style['details-card']}>
              <h2>{item.title}</h2>
              <div className={style.hr} />
              <p>{item.body}</p>
              <div className={style.user}>
                <span className={style.name}>{author.name}</span>
              </div>
            </section>
          </>
        )}
        <section className={style.comments}>
          <Reveal y={100}>
            <ul className={style['comments-list']} role="list">
              {commentsData.map((item) => (
                <li key={item.id}>
                  <h3>{item.name.toUpperCase()}</h3>
                  <span> {item.email.toLowerCase()}</span>
                  <p>{item.body}</p>
                </li>
              ))}
            </ul>
          </Reveal>
          <i>
            <Reveal delay={1.5}>
              <TfiCommentAlt />
            </Reveal>
          </i>
        </section>
      </main>
    </>
  );
}
