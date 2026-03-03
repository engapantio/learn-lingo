import { useCallback, useEffect, useState } from 'react';
import {
  getDatabase,
  ref,
  query,
  orderByKey,
  startAfter,
  limitToFirst,
  get,
} from 'firebase/database';
import { type Teacher } from '~/types/teacher';

export interface TeachersFilters {
  language: string;
  level: string;
  price: string;
}

const BATCH_SIZE = 20; 
const PAGE_SIZE = 4;   

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

const useTeachersPagination = (filters: TeachersFilters, pageSize = PAGE_SIZE) => {
  const [rawTeachers, setRawTeachers] = useState<Teacher[]>([]);
   const [visibleCount, setVisibleCount] = useState(pageSize);
  const [lastKey, setLastKey] = useState<string | null>(null);
  const [hasMoreInDb, setHasMoreInDb] = useState(true);
  const [loading, setLoading] = useState(false);


  const filteredTeachers = rawTeachers.filter((t) => matchesFilters(t, filters));
  const visibleTeachers = filteredTeachers.slice(0, visibleCount);
    const hasMore = visibleCount < filteredTeachers.length || hasMoreInDb;

    const fetchBatch = useCallback(async (afterKey: string | null): Promise<{
    items: Teacher[];
    keys: string[];
    isLast: boolean;
  }> => {
    let q;
    if (afterKey) {
      q = query(
        ref(getDatabase(), 'teachers'),
        orderByKey(),
        startAfter(afterKey),
        limitToFirst(BATCH_SIZE)
      );
    } else {
      q = query(
        ref(getDatabase(), 'teachers'),
        orderByKey(),
        limitToFirst(BATCH_SIZE)
      );
    }
         const snapshot = await get(q);
    if (!snapshot.exists()) return { items: [], keys: [], isLast: true };

    const rawData: Record<string, Teacher> = snapshot.val() || {};
    return {
      items: Object.values(rawData),
      keys: Object.keys(rawData),
      isLast: Object.keys(rawData).length < BATCH_SIZE,
    };
  }, []);


  useEffect(() => {
    const init = async () => {
      setLoading(true);
      setRawTeachers([]);
      setLastKey(null);
      setVisibleCount(pageSize);
      setHasMoreInDb(true);

      try {
        const { items, keys, isLast } = await fetchBatch(null);
        setRawTeachers(items);
        setLastKey(isLast ? null : keys[keys.length - 1]);
        setHasMoreInDb(!isLast);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []); 

 
  useEffect(() => {
    setVisibleCount(pageSize);
  }, [filters, pageSize]);

  
  const loadMore = useCallback(async () => {
    if (loading) return;

    const filtered = rawTeachers.filter((t) => matchesFilters(t, filters));
    const nextVisible = visibleCount + pageSize;

   
    if (nextVisible <= filtered.length) {
      setVisibleCount(nextVisible);
      return;
    }

  
    if (!hasMoreInDb) {
      setVisibleCount(nextVisible); // 
      return;
    }

    setLoading(true);
    try {
      const { items, keys, isLast } = await fetchBatch(lastKey);

      const updatedRaw = [...rawTeachers, ...items];
      setRawTeachers(updatedRaw);
      setLastKey(isLast ? null : keys[keys.length - 1]);
      setHasMoreInDb(!isLast);
      setVisibleCount(nextVisible);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [loading, rawTeachers, filters, visibleCount, pageSize, hasMoreInDb, lastKey, fetchBatch]);

  return {
    teachers: visibleTeachers,     
    loadMore,
    hasMore,
    loading,
    totalLoaded: visibleTeachers.length,
    applyFilters: () => {},     
  };
};

export default useTeachersPagination;
