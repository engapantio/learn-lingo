import { useState } from 'react';
import type { Route } from './+types/home';
import { Welcome } from '../components/welcome/welcome';
import Header from '~/components/header/header';
import Modal from '~/components/modal/modal';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Learn Lingo' }, { name: 'description', content: 'Welcome to LearnLingo!' }];
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  return (
    <body className="px-16 py-8 m-auto">
      <Header openLogin={openModal} openRegistration={openModal} />
      {isModalOpen && <Modal onClose={closeModal} />}
      <Welcome />
    </body>
  );
}
