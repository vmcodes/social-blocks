import { Button, useColorMode } from '@chakra-ui/react';
// Custom Icons

export default function ColoModeSwitch() {
  // Chakra Color Mode
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button
      h="60px"
      w="60px"
      color="white"
      bg={'green.400'}
      _hover={{
        bg: 'green.500',
      }}
      position="fixed"
      right={'15px'}
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
  );
}
