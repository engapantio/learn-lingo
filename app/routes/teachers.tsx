import type { Route } from './+types/home';
import { useState } from 'react';
import Card from '~/components/card/card';
import Header from '~/components/header/header';
import Modal from '~/components/modal/modal';
import Login from '~/components/login/login';
import Registration from '~/components/registration/registration';

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
    <body className="px-16 py-8 m-auto w-360 bg-[#f8f8f8]">
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
      <main className="bg-[#f8f8f8] py-6">
        <Card />
      </main>
    </body>
  );
}
