import { Box } from '@chakra-ui/react';
import Hero from '../components/Hero';
import Features from '../components/Features';

export default function Home() {
  return (
    <Box minH="120vh">
      <Hero />
      <Features />
    </Box>
  );
}
