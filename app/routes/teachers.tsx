import type { Route } from './+types/home';
import { Welcome } from '../welcome/welcome';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Learn Lingo. Teachers' },
    { name: 'description', content: 'Here is the list of our teachers!' },
  ];
}

export default function Teachers() {
  return <Welcome />;
}
