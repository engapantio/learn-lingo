import type { Route } from './+types/home';
import CardsList from '~/components/cardsList/cardsList';
import { useFavorites } from '~/services/context/favoritesContext';
import { useAuth } from '~/services/context/authContext';
import { type Teacher } from '~/types/teacher';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Learn Lingo. Favorites' },
    { name: 'description', content: 'Refresh yourself on the list of your favorite teachers!' },
  ];
}

export default function Favorites() {
    const { favoriteIds } = useFavorites();
  const { teachers } = useAuth() as any;
  const teacherKey = (t: Teacher) =>
  `t-${t.name}-${t.surname}-${t.price_per_hour}`;
  const favoriteTeachers = (teachers ?? []).filter((t: Teacher) =>
  favoriteIds.has(teacherKey(t))
);

  return (
    <html className="bg-[rgb(248,248,248)]">
      <body className="px-16 py-8 m-auto w-360 bg-[rgb(248,248,248)]">
        <main className="py-6 flex flex-col justify-center gap-16">
          <CardsList teachers={favoriteTeachers} />
        </main>
      </body>
    </html>
  );
}
