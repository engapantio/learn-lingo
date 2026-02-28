import { createContext, useContext, useEffect, useMemo, useCallback, useState } from 'react';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import AuthRequiredModal from '~/components/modal/authRequiredModal';

import type { User } from 'firebase/auth';

interface FavoritesContextType {
  favoriteIds: Set<string>;
  isFavorite: (teacherKey: string) => boolean;
  toggleFavorite: (teacherKey: string) => Promise<void>;
  loading: boolean;
  showAuthModal: boolean;
  closeAuthModal: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used within FavoritesProvider');
  return context;
};

interface Props {
user: User | null;
  children: React.ReactNode;
}

export const FavoritesProvider: React.FC<Props> = ({ user, children }) => {
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    if (!user?.uid) {
      setFavoriteIds(new Set());
      setLoading(false);
      return;
    }

    setLoading(true);
    const db = getDatabase();
    const favRef = ref(db, `userFavorites/${user.uid}`);

    const unsub = onValue(favRef, (snap) => {
      const data = snap.val() ?? {};
      setFavoriteIds(new Set(Object.keys(data)));
      setLoading(false);
    });

    return () => unsub();
  }, [user?.uid]);

  const toggleFavorite = useCallback(async (teacherId: string) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    const db = getDatabase();
    const pathRef = ref(db, `userFavorites/${user.uid}/${teacherId}`);
    const isCurrentlyFav = favoriteIds.has(teacherId);

    await set(pathRef, isCurrentlyFav ? null : true);
  }, [user, favoriteIds]);

  const closeAuthModal = () => setShowAuthModal(false);

  const value: FavoritesContextType = useMemo(() => ({
    favoriteIds,
    loading,
    isFavorite: (id: string) => favoriteIds.has(id),
    toggleFavorite,
    showAuthModal,
    closeAuthModal,
  }), [favoriteIds, loading, toggleFavorite, showAuthModal]);

  return (
    <FavoritesContext.Provider value={value}>
      {children}
      {showAuthModal && <AuthRequiredModal onClose={closeAuthModal} />}
    </FavoritesContext.Provider>
  );
};