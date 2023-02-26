import { Box, Heading, Container, Text, Button, Stack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <Container maxW={'1xl'}>
      <Stack
        as={Box}
        textAlign={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 24 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}
        >
          Welcome to
          <br />
          <Text as={'span'} color={'green.400'}>
            Social Blocks!
          </Text>
        </Heading>
        <Stack
          direction={'column'}
          spacing={3}
          align={'center'}
          alignSelf={'center'}
          position={'relative'}
        >
          <Button
            as={Link}
            to="/login"
            height="50px"
            colorScheme={'green'}
            bg={'green.400'}
            rounded={'full'}
            px={6}
            textDecoration="none"
            fontSize="xl"
            _hover={{
              bg: 'green.500',
            }}
            w="200px"
          >
            Get Started
            <i style={{ marginLeft: '12px' }} className="fas fa-sign-in"></i>
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
