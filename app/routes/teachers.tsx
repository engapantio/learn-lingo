import { useState } from 'react';
import type { Route } from './+types/home';
import useTeachersPagination from '~/hooks/usePaginatedTeachers';
import { type TeachersFilters } from '~/hooks/usePaginatedTeachers';
import PageLayout from '~/components/layout/pageLayout';
import CardsList from '~/components/cardsList/cardsList';
import TeachersFilter from '~/components/filter/filter';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Learn Lingo. Teachers' },
    { name: 'description', content: 'Here is the list of our teachers!' },
  ];
}

export default function Teachers() {
    const [filters, setFilters] = useState<TeachersFilters>({
    language: "",
    level: "",
    price: "",
  });


  const {
    teachers,
    loadMore,
    hasMore,
    loading
  } = useTeachersPagination(filters, 4);

  return (
    // <html className="bg-[rgb(248,248,248)]">
    //   <body className="px-16 py-8 m-auto w-360 bg-[rgb(248,248,248)]">
    <PageLayout className="bg-[rgb(248,248,248)]">
        <main className="py-6 flex flex-col justify-center gap-8">
          <TeachersFilter onFiltersChange={setFilters}/>
          <CardsList teachers={teachers} loadMore={loadMore} hasMore={hasMore} loading={loading} />
        </main>
      {/* </body>
    </html > */}
      </PageLayout>
  );
}
