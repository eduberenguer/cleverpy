import style from './footer.module.scss';
import { FaXTwitter } from 'react-icons/fa6';
import { AiFillLinkedin } from 'react-icons/ai';
import { RiAdminLine, RiUserHeartLine } from 'react-icons/ri';
import { FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useUsers } from '../../hooks/use.users';

export function Footer() {
  const { currentUser } = useUsers();

  return (
    <footer className={style.footer}>
      <main>
        <section className={style['social-icons']}>
          <a
            href="https://github.com/inviolableviolets"
            target="_blank"
            aria-label="GitHub social icon"
          >
            <FaGithub />
          </a>
          <a
            href="https://twitter.com/CleverpyML"
            target="_blank"
            aria-label="Twitter/X social icon"
          >
            <FaXTwitter />
          </a>
          <a
            href="https://www.linkedin.com/company/cleverpy/"
            target="_blank"
            aria-label="LinkedIn social icon"
          >
            <AiFillLinkedin />
          </a>
        </section>
        <section className={style.admin}>
          <address>CLEVERPY © 2023</address>

          {currentUser ? (
            <i>
              <RiUserHeartLine />
            </i>
          ) : (
            <Link to="/login" aria-label="Access to admin features">
              <RiAdminLine />
            </Link>
          )}
        </section>
      </main>
    </footer>
  );
}
