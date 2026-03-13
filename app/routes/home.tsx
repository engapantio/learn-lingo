import type { Route } from './+types/home';
import PageLayout from '~/components/layout/pageLayout';
import Hero from '~/components/hero/hero';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Learn Lingo' }, { name: 'description', content: 'Welcome to LearnLingo!' }];
}

export default function Home() {
  return (
    // <body className="bg-white px-16 py-8 m-auto w-360">
    <div className="bg-white min-h-screen -mx-16 -mt-8 px-16 py-8">
      {/* <Header
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
      )} */}
      <PageLayout>
        <main className="bg-white">
          <Hero />
        </main>
      </PageLayout>

      {/* </body> */}
    </div>
  );
}
