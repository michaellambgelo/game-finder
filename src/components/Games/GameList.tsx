import { useEffect, useState } from 'react';
import { Box, Grid, Text, Image } from '@chakra-ui/react';
import { db } from '../../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuthStore } from '../../store/authStore';

interface Game {
  id: string;
  name: string;
  imageUrl: string;
}

export const GameList = () => {
  const [games, setGames] = useState<Game[]>([]);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const fetchGames = async () => {
      if (!user) return;

      const gamesRef = collection(db, 'games');
      const q = query(gamesRef, where('users', 'array-contains', user.uid));
      
      const snapshot = await getDocs(q);
      const gamesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Game[];

      setGames(gamesData);
    };

    fetchGames();
  }, [user]);

  return (
    <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
      {games.map((game) => (
        <Box key={game.id} borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Image src={game.imageUrl} alt={game.name} />
          <Box p={4}>
            <Text fontWeight="bold">{game.name}</Text>
          </Box>
        </Box>
      ))}
    </Grid>
  );
};