import type { Route } from './+types/home';
import { Welcome } from '../welcome/welcome';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Learn Lingo' }, { name: 'description', content: 'Welcome to LearnLingo!' }];
}

export default function Home() {
  return <Welcome />;
}
