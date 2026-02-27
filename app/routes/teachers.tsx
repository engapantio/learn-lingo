import { useState } from 'react';
import type { Route } from './+types/home';
import CardsList from '~/components/cardsList/cardsList';
import Header from '~/components/header/header';
import Modal from '~/components/modal/modal';
import Registration from '~/components/registration/registration';
import Login from '~/components/login/login';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Learn Lingo. Teachers' },
    { name: 'description', content: 'Here is the list of our teachers!' },
  ];
}

export default function Teachers() {
    const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);
  return (
    <html className="bg-[rgb(248,248,248)]">
      <body className="px-16 py-8 m-auto w-360 bg-[rgb(248,248,248)]">
        <Header
        openLogin={() => {
          setIsLogin(true);
          openModal();
        }}
        openRegistration={() => {
          setIsLogin(false);
          openModal();
        }}
      />
      {isModalOpen && <Modal onClose={closeModal}>{isLogin ? <Login /> : <Registration />}</Modal>}
        <main className="py-6 flex flex-col justify-center gap-16">
          <CardsList />
        </main>
      </body>
    </html>
  );
}
