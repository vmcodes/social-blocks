import { Box, useColorModeValue } from '@chakra-ui/react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <Box
        h="100%"
        minH="100vh"
        pb="64px"
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        {children}
      </Box>
      <Footer />
    </>
  );
}
