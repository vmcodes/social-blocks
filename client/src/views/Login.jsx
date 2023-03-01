import {
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { Connect, ThemeProvider } from '@did-connect/react';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { createProfile } from '../services';
import { useAuthDispatch } from '../contexts';
import { login } from '../contexts/actions';
import ArcBlock from '../assets/images/arcblock.png';
import MetaMask from '../assets/images/metamask.png';
if (typeof window.ethereum !== 'undefined') {
  console.log('MetaMask is installed!');
}

export default function Login() {
  const [open, setOpen] = useState(false);
  const dispatch = useAuthDispatch();
  const toast = useToast();

  const handleClose = () => {
    setOpen(false);
  };

  const handleApprove = async (ctx, event) => {
    console.log(event);
  };

  const handleConnect = async (ctx, event) => {
    console.log(event);
  };

  const handleComplete = async (ctx, event) => {
    console.log(event);

    try {
      await createProfile(ctx.currentConnected.userDid);

      await login(dispatch, ctx.currentConnected.userDid);

      window.location.assign(`/account/${ctx.currentConnected.userDid}`);
    } catch (e) {
      console.log(e);
      toast({
        title: 'Login error!',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const getAccount = async () => {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    const account = accounts[0];

    try {
      await createProfile(account);

      await login(dispatch, account);

      window.location.assign(`/account/${account}`);
    } catch (e) {
      console.log(e);
      toast({
        title: 'Login error!',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Login | Social Blocks</title>
      </Helmet>

      <Flex h="100%" minH={'100vh'} align={'center'} justify={'center'}>
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}
          transform="translateY(-50%)"
        >
          <Heading
            lineHeight={1.1}
            fontSize={{ base: '2xl', md: '3xl' }}
            color={useColorModeValue('black', 'white')}
          >
            Continue to your account.
          </Heading>
          <Text
            fontSize={{ base: 'sm', sm: 'md' }}
            color={useColorModeValue('black', 'white')}
          >
            Only one wallet can be used per an account.
          </Text>

          <Stack spacing={6} pt="12px">
            <Button
              height="50px"
              rounded={'full'}
              px={12}
              fontSize="xl"
              border="transparent"
              cursor="pointer"
              colorScheme={'green'}
              bg={'green.400'}
              _hover={{
                bg: 'green.500',
              }}
              justifyContent="space-between"
              onClick={() => setOpen(true)}
            >
              <span>Connect DID</span>
              <img
                src={ArcBlock}
                alt="DID Wallet"
                style={{
                  height: '40px',
                  borderRadius: '50%',
                }}
              />
            </Button>
          </Stack>

          <Stack spacing={6} pt="12px">
            <Button
              height="50px"
              rounded={'full'}
              px={12}
              fontSize="xl"
              border="transparent"
              cursor="pointer"
              colorScheme={'green'}
              bg={'green.400'}
              _hover={{
                bg: 'green.500',
              }}
              justifyContent="space-between"
              onClick={getAccount}
            >
              <span>Connect MetaMask</span>
              <img
                src={MetaMask}
                alt="MetaMask"
                style={{
                  height: '40px',
                  marginLeft: '12px',
                  borderRadius: '50%',
                }}
              />
            </Button>
          </Stack>
        </Stack>

        <WrappedConnect
          popup
          open={open}
          onlyConnect
          messages={{
            title: 'Connect DID Wallet',
            scan: 'You will always see the app connection screen on DID Wallet when scan follow qrcode',
            confirm: 'Confirm operation on your DID Wallet',
            success: 'You have successfully connected!',
          }}
          onClose={handleClose}
          onConnect={handleConnect}
          onApprove={handleApprove}
          onComplete={handleComplete}
          relayUrl="/.well-known/service/api/connect/relay"
        />
      </Flex>
    </>
  );
}

function WrappedConnect(props) {
  return (
    <ThemeProvider>
      <Connect {...props} />
    </ThemeProvider>
  );
}
