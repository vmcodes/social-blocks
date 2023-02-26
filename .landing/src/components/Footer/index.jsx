import {
  Box,
  Container,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
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
        <Image src={Logo} alt="logo" height="60px" borderRadius="50%" />
        <Text>© 2023 Social Blocks. All rights reserved</Text>
        <Stack direction={'row'} spacing={6}>
          <a
            href="https://nowpayments.io/donation?api_key=9YJ1KW7-Z88MTZD-G188HA6-7GKANVH"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src="https://nowpayments.io/images/embeds/donation-button-black.svg"
              alt="Crypto donation button by NOWPayments"
              height="60px"
            />
          </a>
        </Stack>
      </Container>
    </Box>
  );
}
