import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { PropagateLoader } from 'react-spinners';
import { useEffect, useState } from 'react';
import { usePosts } from '../../hooks/use.posts';
import { PostCard } from '../post.card/post.card';
import style from './posts.module.scss';
import { useUsers } from '../../hooks/use.users';
import { Filter } from '../filter/filter';
import Reveal from '../../utils/reveal';

export default function Posts() {
  const { posts, loadPosts } = usePosts();
  const { loadUsers, users } = useUsers();
  const { postsState } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    loadPosts();
    loadUsers();
  }, [loadPosts, loadUsers]);

  const [filterText, setFilterText] = useState('');
  const { currentUser } = useUsers();

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(filterText.toLowerCase())
  );
  return (
    <>
      <Reveal duration={1.5} delay={0.2}>
        <section className={style.user}>
          <h2>Welcome {currentUser && currentUser.name}!</h2>
        </section>
      </Reveal>
      <div className={style.filter}>
        <Reveal duration={1}>
          <Filter
            value={filterText}
            onChange={(event) => setFilterText(event.target.value)}
          />
        </Reveal>
      </div>

      {postsState === 'idle' && (
        <PropagateLoader
          color="black"
          className={style.spinner}
          data-testid="spinner"
        />
      )}
      {postsState === 'loaded' && (
        <main className={style.list}>
          <Reveal duration={1} y={100} delay={0}>
            <ul role="list">
              {filteredPosts.length !== 0 ? (
                filteredPosts.map((item) => (
                  <PostCard
                    key={item.id}
                    item={item}
                    userName={
                      users.find((user) => user.id === item.userId)?.username ||
                      'Unknown'
                    }
                  ></PostCard>
                ))
              ) : (
                <li>There are no results that match your search.</li>
              )}
            </ul>
          </Reveal>
        </main>
      )}
    </>
  );
}
