import type { Route } from './+types/home';
import Header from '~/components/header/header';
import Modal from '~/components/modal/modal';
import Registration from '~/components/registration/registration';
import Login from '~/components/login/login';
import Hero from '~/components/hero/hero';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Learn Lingo' }, { name: 'description', content: 'Welcome to LearnLingo!' }];
}

export default function Home() {
  return (
    <body className="px-16 py-8 m-auto w-360">
      <Hero />
    </body>
  );
}
