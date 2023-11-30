import { SyntheticEvent, useState } from 'react';
import { usePosts } from '../../hooks/use.posts';
import style from './create.form.module.scss';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../../hooks/use.users';

export function CreateForm() {
  const { createPost } = usePosts();
  const { currentUser } = useUsers();
  const navigate = useNavigate();

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  modal
    ? document.body.classList.add(style['active-modal'])
    : document.body.classList.remove(style['active-modal']);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const postForm = event.target as HTMLFormElement;
    const postData = {
      title: (postForm.elements.namedItem('title') as HTMLInputElement).value,
      body: (postForm.elements.namedItem('body') as HTMLInputElement).value,
      userId: currentUser!.id,
    };
    createPost(postData);
    setModal(!modal);
    navigate('/');
  };

  return (
    <>
      {currentUser && (
        <button onClick={toggleModal} className={style['modal-button']}>
          +
        </button>
      )}
      {modal && (
        <>
          <main className={style.modal}>
            <div onClick={toggleModal} className={style.overlay}></div>
            <form
              className={style.form}
              onSubmit={handleSubmit}
              aria-label="form"
            >
              <section>
                <div>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="TITLE"
                    autoComplete="off"
                  />
                </div>

                <div>
                  <textarea
                    name="body"
                    id="body"
                    rows={15}
                    cols={20}
                    maxLength={300}
                    minLength={10}
                    placeholder="Don't be shy! Tell us something in latin or another dead language of your choice."
                  />
                </div>
              </section>
              <section className={style.send}>
                <div className={style.button}>
                  <button type="submit">SEND</button>
                </div>
              </section>
              <button className={style['close-modal']} onClick={toggleModal}>
                X
              </button>
            </form>
          </main>
        </>
      )}
    </>
  );
}
