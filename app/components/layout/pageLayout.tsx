import { useState } from 'react';
import Header from '~/components/header/header';
import Modal from '~/components/modal/modal';
import Login from '~/components/login/login';
import Registration from '~/components/registration/registration';

export default function PageLayout({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={`min-h-screen ${className}`}>
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
      {isModalOpen && (
        <Modal onClose={closeModal}>
          {isLogin ? <Login onSuccess={closeModal} /> : <Registration onSuccess={closeModal} />}
        </Modal>
      )}
      {children}
    </div>
  );
}
