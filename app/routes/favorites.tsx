import { useState } from 'react';
import type { Route } from './+types/home';
import CardsList from '~/components/cardsList/cardsList';
import { useFavorites } from '~/services/context/favoritesContext';
import { useAuth } from '~/services/context/authContext';
import { type Teacher } from '~/types/teacher';
import PageLayout from '~/components/layout/pageLayout';
import usePaginatedList from '~/hooks/usePaginatedList';
import TeachersFilter from '~/components/filter/filter';
import { type TeachersFilters } from '~/hooks/usePaginatedTeachers';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Learn Lingo. Favorites' },
    { name: 'description', content: 'Refresh yourself on the list of your favorite teachers!' },
  ];
}

export default function Favorites() {
  const [filters, setFilters] = useState<TeachersFilters>({
    language: '',
    level: '',
    price: '',
  });

  const { favoriteIds } = useFavorites();
  const { teachers: allTeachers } = useAuth() as any;
  const teacherKey = (t: Teacher) => `t-${t.name}-${t.surname}-${t.price_per_hour}`;
  const favoriteTeachers: Teacher[] = (allTeachers ?? []).filter((t: Teacher) =>
    favoriteIds.has(teacherKey(t))
  );

  const { teachers, loadMore, hasMore, loading } = usePaginatedList(favoriteTeachers, filters, 4);

  return (
    // <html className="bg-[rgb(248,248,248)]">
    //   <body className="px-16 py-8 m-auto w-360 bg-[rgb(248,248,248)]">
    <PageLayout className="bg-[hsl(0,0%,97%)]">
      <main className="py-6 flex flex-col justify-center gap-16">
        <TeachersFilter onFiltersChange={setFilters} />
        <CardsList teachers={teachers} loadMore={loadMore} hasMore={hasMore} loading={loading} />
      </main>
      {/* </body>
    </html > */}
    </PageLayout>
  );
}
