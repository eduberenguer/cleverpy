/* eslint-disable @typescript-eslint/no-unused-vars */
import style from './header.module.scss';
import { Link } from 'react-router-dom';
import { FaRegUserCircle } from 'react-icons/fa';
import { MdOutlineArticle } from 'react-icons/md';
import { useUsers } from '../../hooks/use.users';
import { IoMdLogOut } from 'react-icons/io';
import { CreateForm } from '../create.form/create.form';

export function Header() {
  const { currentUser, logoutUser } = useUsers();

  return (
    <>
      <header className={style.header} id="header">
        <Link to="/" className={style.logo}>
          <img src="/logo.png" alt="Cleverpy Logo" />
          <h1>CLEVERPY TECHNICAL ASSESMENT</h1>
        </Link>

        <div className={style.routes}>
          <Link to="/" className={style.posts} aria-label="All posts lists">
            <MdOutlineArticle />
          </Link>{' '}
          <Link
            to="/users"
            className={style.users}
            aria-label="All users lists"
          >
            <FaRegUserCircle />
          </Link>
          <CreateForm></CreateForm>
          {currentUser && (
            <div className={style.logout} role="button" onClick={logoutUser}>
              <button>
                <IoMdLogOut />
              </button>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
