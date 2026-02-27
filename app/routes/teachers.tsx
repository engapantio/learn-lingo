import type { Route } from './+types/home';
import CardsList from '~/components/cardsList/cardsList';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Learn Lingo. Teachers' },
    { name: 'description', content: 'Here is the list of our teachers!' },
  ];
}

export default function Teachers() {
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
