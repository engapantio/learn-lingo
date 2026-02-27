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

const useTeachersPagination = (pageSize = 4) => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [lastKey, setLastKey] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [totalLoaded, setTotalLoaded] = useState(0);

  const loadPage = async (afterKey: string | null) => {
    setLoading(true);

    const db = getDatabase();
    const teachersRef = ref(db, 'teachers');

    let q;
    if (afterKey) {
      q = query(teachersRef, orderByKey(), startAfter(afterKey), limitToFirst(pageSize + 1));
    } else {
      q = query(teachersRef, orderByKey(), limitToFirst(pageSize + 1));
    }

    try {
      const snapshot = await get(q);

      if (!snapshot.exists()) {
        setHasMore(false);
        setLoading(false);
        return;
      }

      const rawData = snapshot.val() as Record<string, Teacher>;
      const items: Teacher[] = Object.values(rawData);

      if (items.length > pageSize) {
        const displayItems = items.slice(0, pageSize);
        const keys = Object.keys(rawData);
        setTeachers(prev => (afterKey ? [...prev, ...displayItems] : displayItems));
        setLastKey(keys[pageSize]);
        setHasMore(true);
      } else {
        setTeachers(prev => (afterKey ? [...prev, ...items] : items));
        setHasMore(false);
      }

      setTotalLoaded(prev => prev + Math.min(items.length, pageSize));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPage(null);
  }, []);

  const loadMore = useCallback(async () => {
    if (!hasMore || loading || !lastKey) return;
    await loadPage(lastKey);
  }, [hasMore, loading, lastKey]);

  return { teachers, loadMore, hasMore, loading, totalLoaded };
};

export default useTeachersPagination;
