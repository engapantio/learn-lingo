import { type Teacher } from '~/types/teacher';
import useTeachersPagination from '~/hooks/usePaginatedTeachers';
import Card from '../card/card';
// interface CardsListProps {
//   teachers: Teacher[];
// }

const CardsList = () => {
  const { teachers, loadMore, hasMore, loading } = useTeachersPagination();
  return (
    <>
      <ul className="flex flex-col gap-8">
        {teachers.map((teacher, i) => (
          <li key={i}>
            <Card teacher={teacher} />
          </li>
        ))}
      </ul>
      {hasMore && (
        <button
          onClick={loadMore}
          disabled={loading}
          className="rounded-xl outline-none bg-primary-green hover:bg-primary-green/75 py-4 mx-auto font-[inherit] w-45.75 h-15 font-bold  text-lg text-bg-dark text-center cursor-pointer"
        >
          {loading ? 'Loading...' : 'Load more'}
        </button>
      )}
    </>
  );
};

export default CardsList;
