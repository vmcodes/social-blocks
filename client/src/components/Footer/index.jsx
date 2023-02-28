import {
  Box,
  Container,
  Image,
  Stack,
  Text,
  useColorModeValue,
  chakra,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Link to="/">
          <Image
            src={Logo}
            alt="logo"
            height="60px"
            borderRadius="50%"
            _hover={{ background: 'transparent', opacity: 0.8 }}
          />
        </Link>

        <Text>
          © 2023{' '}
          <chakra.span
            as={Link}
            to="/"
            color="green.400"
            _hover={{ textDecoration: 'underline' }}
          >
            Social Blocks
          </chakra.span>
        </Text>
      </Container>
    </Box>
  );
}
