import type { Route } from './+types/home';
import { Welcome } from '../components/welcome/welcome';
import Header from '~/components/header/header';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Learn Lingo' }, { name: 'description', content: 'Welcome to LearnLingo!' }];
}

export default function Home() {
  return (
    <body className="px-16 py-8 m-auto">
      <Header />
      <Welcome />
    </body>
  );
}
