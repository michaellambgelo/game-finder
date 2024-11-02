import { ChakraProvider, Container, VStack } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DiscordLogin } from './components/Auth/DiscordLogin';
import { SteamLink } from './components/Steam/SteamLink';
import { GameList } from './components/Games/GameList';
import { PlayerSearch } from './components/Players/PlayerSearch';
import { useAuthStore } from './store/authStore';

function App() {
  const user = useAuthStore((state) => state.user);

  return (
    <ChakraProvider>
      <Router>
        <Container maxW="container.xl" py={8}>
          <VStack spacing={8}>
            {!user ? (
              <DiscordLogin />
            ) : (
              <>
                <SteamLink />
                <GameList />
                <PlayerSearch />
              </>
            )}
          </VStack>
        </Container>
      </Router>
    </ChakraProvider>
  );
}

export default App;