import { Link } from 'react-router-dom';
import styles from './login.module.scss';
import { useUsers } from '../../hooks/use.users';
import { SyntheticEvent, useEffect } from 'react';
import { MdOutlinePassword } from 'react-icons/md';
import { AiOutlineMail } from 'react-icons/ai';
import Reveal from '../../utils/reveal';

export default function Login() {
  const { loginUser, loadUsers } = useUsers();

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const loginFormElement = event.target as HTMLFormElement;
    const loggedUser = {
      email: (loginFormElement.elements.namedItem('email') as HTMLInputElement)
        .value,
      password: (
        loginFormElement.elements.namedItem('password') as HTMLInputElement
      ).value,
    };

    loginUser(loggedUser);
    loginFormElement.reset();
  };

  return (
    <>
      {
        <main className={styles.login}>
          <Reveal delay={0} blur={5}>
            <form className={styles.form} role="form" onSubmit={handleSubmit}>
              <div className={styles['email-container']}>
                <label htmlFor="email">
                  <AiOutlineMail />
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Enter your corporate email"
                  autoComplete="true"
                  required
                />
              </div>
              <div className={styles['password-container']}>
                <label htmlFor="password">
                  <MdOutlinePassword />
                </label>
                <input
                  type="password"
                  name="password"
                  autoComplete="true"
                  id="password"
                  placeholder="Enter your given username"
                  required
                />
              </div>
              <div className={styles.button}>
                <button className={styles.button} type="submit">
                  Sign In
                </button>
              </div>
            </form>
          </Reveal>

          <div className={styles.contact}>
            <span>Have you forgotten your credentials?</span>
            <Link to={'mailto:cleverpy-management@gmail.com'}>
              Please reach out to management for assistance.
            </Link>
          </div>
        </main>
      }
    </>
  );
}
