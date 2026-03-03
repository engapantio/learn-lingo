import { useState } from 'react';
import type { Route } from './+types/home';
import useTeachersPagination from '~/hooks/usePaginatedTeachers';
import { type TeachersFilters } from '~/hooks/usePaginatedTeachers';
import CardsList from '~/components/cardsList/cardsList';
import Header from '~/components/header/header';
import Modal from '~/components/modal/modal';
import Registration from '~/components/registration/registration';
import Login from '~/components/login/login';
import TeachersFilter from '~/components/filter/filter';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Learn Lingo. Teachers' },
    { name: 'description', content: 'Here is the list of our teachers!' },
  ];
}

export default function Teachers() {
    const [filters, setFilters] = useState<TeachersFilters>({
    language: "",
    level: "",
    price: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const {
    teachers,
    loadMore,
    hasMore,
    loading
  } = useTeachersPagination(filters, 4);

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
        <main className="py-6 flex flex-col justify-center gap-8">
          <TeachersFilter onFiltersChange={setFilters}/>
          <CardsList teachers={teachers} loadMore={loadMore} hasMore={hasMore} loading={loading} />
        </main>
      </body>
    </html>
  );
}
