import { type Teacher } from '~/types/teacher';
import Card from '../card/card';

interface CardsListProps {
  teachers?: Teacher[]; 
  loadMore: () => void;
  hasMore: boolean;
  loading: boolean;
}

const CardsList = ({teachers, loadMore, hasMore, loading}: CardsListProps) => {
 

  return (
    <>
      <ul className="flex flex-col gap-8 px-16">
        {teachers?.map((teacher) => {
          const teacherKey = `t-${teacher.name}-${teacher.surname}-${teacher.price_per_hour}`;
          return(
          <li key={teacherKey}>
            <Card teacher={teacher} teacherKey={teacherKey} />
          </li>)
})}
      </ul>
      { hasMore && (
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
