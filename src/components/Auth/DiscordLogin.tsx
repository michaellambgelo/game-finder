import { Button } from '@chakra-ui/react';
import { FaDiscord } from 'react-icons/fa';
import { auth } from '../../lib/firebase';
import { signInWithPopup, GithubAuthProvider } from 'firebase/auth';

export const DiscordLogin = () => {
  const handleLogin = async () => {
    const provider = new GithubAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error signing in with Discord:', error);
    }
  };

  return (
    <Button
      leftIcon={<FaDiscord />}
      colorScheme="purple"
      onClick={handleLogin}
    >
      Sign in with Discord
    </Button>
  );
};