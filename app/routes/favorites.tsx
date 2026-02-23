import type { Route } from './+types/home';
import { Welcome } from '../components/welcome/welcome';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Learn Lingo. Favorites' },
    { name: 'description', content: 'Refresh yourself on the list of your favorite teachers!' },
  ];
}

export default function Favorites() {
  return <Welcome />;
}
