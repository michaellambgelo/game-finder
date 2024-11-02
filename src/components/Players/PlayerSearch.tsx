import { useState, useEffect } from 'react';
import { Input, VStack, Box, Avatar, Text, HStack } from '@chakra-ui/react';
import { db } from '../../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuthStore } from '../../store/authStore';

interface Player {
  id: string;
  displayName: string;
  avatarUrl: string;
  commonGames: string[];
}

export const PlayerSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [players, setPlayers] = useState<Player[]>([]);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const searchPlayers = async () => {
      if (!user || !searchTerm) return;

      const usersRef = collection(db, 'users');
      const q = query(
        usersRef,
        where('discordServerId', '==', user.uid) // Replace with actual Discord server ID
      );

      const snapshot = await getDocs(q);
      const playersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Player[];

      setPlayers(playersData);
    };

    searchPlayers();
  }, [searchTerm, user]);

  return (
    <VStack spacing={4}>
      <Input
        placeholder="Search players..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {players.map((player) => (
        <Box key={player.id} p={4} borderWidth="1px" borderRadius="lg" width="100%">
          <HStack>
            <Avatar src={player.avatarUrl} />
            <VStack align="start">
              <Text fontWeight="bold">{player.displayName}</Text>
              <Text fontSize="sm">
                {player.commonGames.length} games in common
              </Text>
            </VStack>
          </HStack>
        </Box>
      ))}
    </VStack>
  );
};