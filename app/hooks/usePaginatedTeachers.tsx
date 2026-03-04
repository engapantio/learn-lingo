import { useCallback, useEffect, useState, useRef } from 'react';
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

const useTeachersPagination = (filters: TeachersFilters, pageSize = 4) => {
  const [rawTeachers, setRawTeachers] = useState<Teacher[]>([]);
   const [visibleCount, setVisibleCount] = useState(pageSize);
  const [lastKey, setLastKey] = useState<string | null>(null);
  const [hasMoreInDb, setHasMoreInDb] = useState(true);
  const [loading, setLoading] = useState(false);

  const rawTeachersRef = useRef(rawTeachers);
  const lastKeyRef = useRef(lastKey);
  const hasMoreInDbRef = useRef(hasMoreInDb);
  const visibleCountRef = useRef(visibleCount);
  const filtersRef = useRef(filters);

 useEffect(() => { rawTeachersRef.current = rawTeachers; }, [rawTeachers]);
  useEffect(() => { lastKeyRef.current = lastKey; }, [lastKey]);
  useEffect(() => { hasMoreInDbRef.current = hasMoreInDb; }, [hasMoreInDb]);
  useEffect(() => { visibleCountRef.current = visibleCount; }, [visibleCount]);
  useEffect(() => { filtersRef.current = filters; }, [filters]);


  useEffect(() => {
    setVisibleCount(pageSize);
  }, [filters, pageSize]);

  const fetchBatch = useCallback(async (afterKey: string|null) => {
 
 
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



  const loadMore = useCallback(async () => {
      const currentRaw = rawTeachersRef.current;
    const currentFilters = filtersRef.current;
    const currentVisible = visibleCountRef.current;
    const currentHasMoreInDb = hasMoreInDbRef.current;
    const currentLastKey = lastKeyRef.current;

    const filtered = currentRaw.filter((t) => matchesFilters(t, currentFilters));
    const nextVisible = currentVisible + pageSize;

    if (nextVisible <= filtered.length) {
      setVisibleCount(nextVisible);
      return;
    }

    if (!currentHasMoreInDb) {
      setVisibleCount(nextVisible); 
      return;
    }

    setLoading(true);
    try {
      const { items, keys, isLast } = await fetchBatch(currentLastKey);
      const updatedRaw = [...currentRaw, ...items];

      setRawTeachers(updatedRaw);
      setLastKey(isLast ? null : keys[keys.length - 1]);
      setHasMoreInDb(!isLast);
      setVisibleCount(nextVisible);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [pageSize, fetchBatch]); 
  const filtered = rawTeachers.filter((t) => matchesFilters(t, filters));
  const teachers = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length || hasMoreInDb;

  return {
    teachers,
    loadMore,
    hasMore,
    loading,
    totalLoaded: teachers.length,
    applyFilters: () => {},
  };
};

export default useTeachersPagination;