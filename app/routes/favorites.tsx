import type { Route } from './+types/home';
import CardsList from '~/components/cardsList/cardsList';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Learn Lingo. Favorites' },
    { name: 'description', content: 'Refresh yourself on the list of your favorite teachers!' },
  ];
}

export default function Favorites() {
  return (
    <html className="bg-[rgb(248,248,248)]">
      <body className="px-16 py-8 m-auto w-360 bg-[rgb(248,248,248)]">
        <main className="py-6 flex flex-col justify-center gap-16">
          <CardsList />
        </main>
      </body>
    </html>
  );
}
