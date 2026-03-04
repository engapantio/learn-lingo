import { useCallback, useEffect, useState } from 'react';
import { type Teacher } from '~/types/teacher';
import { type TeachersFilters } from '~/hooks/usePaginatedTeachers';

const matchesFilters = (teacher: Teacher, filters: TeachersFilters): boolean => {
  const matchLang =
    !filters.language ||
    teacher.languages.some((l) =>
      l.toLowerCase().includes(filters.language.toLowerCase())
    );
  const matchLevel =
    !filters.level ||
    teacher.levels.some((l) =>
      l.toLowerCase().includes(filters.level.toLowerCase())
    );
  const matchPrice =
    !filters.price || teacher.price_per_hour === Number(filters.price);

  return matchLang && matchLevel && matchPrice;
};

const usePaginatedList = (
  sourceTeachers: Teacher[],  
  filters: TeachersFilters,
  pageSize = 4
) => {
  const [visibleCount, setVisibleCount] = useState(pageSize);


  useEffect(() => {
    setVisibleCount(pageSize);
  }, [filters, pageSize, sourceTeachers.length]);

  const filtered = sourceTeachers.filter((t) => matchesFilters(t, filters));
  const teachers = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => prev + pageSize);
  }, [pageSize]);

  return {
    teachers,
    loadMore,
    hasMore,
    loading: false,
    totalLoaded: teachers.length,
  };
};

export default usePaginatedList;