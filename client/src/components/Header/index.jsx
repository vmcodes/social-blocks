import {
  Box,
  Button,
  Image,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';

export default function Header() {
  // Chakra Color Mode
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box h="80px" bg={useColorModeValue('gray.50', 'gray.800')} top={0}>
      <Button
        as={Link}
        to="/"
        bg="transparent"
        position="absolute"
        left={'10px'}
        top="25px"
        _hover={{ background: 'transparent', opacity: 0.8 }}
      >
        <Image src={Logo} alt="logo" height="60px" borderRadius="50%" />
      </Button>
      <Button
        h="60px"
        w="60px"
        color="white"
        bg={'green.400'}
        _hover={{
          bg: 'green.500',
        }}
        position="absolute"
        right={'25px'}
        top="15px"
        borderRadius="50px"
        boxShadow="3xl"
        onClick={toggleColorMode}
        fontSize="2xl"
      >
        {colorMode === 'dark' ? (
          <i className="fa-solid fa-sun"></i>
        ) : (
          <i className="fa-solid fa-moon"></i>
        )}
      </Button>
    </Box>
  );
}
