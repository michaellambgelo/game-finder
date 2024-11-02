import { Button, Input, VStack, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { db } from '../../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useAuthStore } from '../../store/authStore';

export const SteamLink = () => {
  const [steamId, setSteamId] = useState('');
  const user = useAuthStore((state) => state.user);
  const toast = useToast();

  const handleLink = async () => {
    if (!user) return;

    try {
      await setDoc(doc(db, 'users', user.uid), {
        steamId,
        discordId: user.uid,
      }, { merge: true });

      toast({
        title: 'Steam ID linked successfully',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Error linking Steam ID',
        status: 'error',
        duration: 3000,
      });
    }
  };

  return (
    <VStack spacing={4}>
      <Input
        placeholder="Enter Steam ID"
        value={steamId}
        onChange={(e) => setSteamId(e.target.value)}
      />
      <Button colorScheme="blue" onClick={handleLink}>
        Link Steam Account
      </Button>
    </VStack>
  );
};