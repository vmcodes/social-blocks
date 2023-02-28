import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  VStack,
  InputGroup,
  InputLeftAddon,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuthDispatch } from '../contexts';
import { getAccount, updateProfile } from '../services';
import { logout } from '../contexts/actions';
import FileUpload from '../components/FileUpload';
import { slugify } from '../utils';

export default function Account() {
  const toast = useToast();
  const [profile, setProfile] = useState(null);
  const [hash, setHash] = useState(null);
  const dispatch = useAuthDispatch();
  const { address } = useParams();

  const fetchProfile = async () => {
    await getAccount(address)
      .then((response) => {
        if (response?.address === address) {
          setProfile(response);
          setHash(response?.ipfsHash);
        } else {
          setProfile(false);
          window.location.assign('/');
        }
      })
      .catch(() => {
        setProfile(false);
        window.location.assign('/');
      });
  };

  useEffect(() => {
    if (profile === null && address) {
      fetchProfile();
    }
    //eslint-disable-next-line
  }, [profile, address]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (address) {
      try {
        await updateProfile({
          ...profile,
          ipfsHash: hash ? hash : profile?.ipfsHash,
        });

        await logout(dispatch);

        window.location.assign(`/${profile.slug}`);
      } catch (e) {
        console.log(e);
        toast({
          title: 'Username exists!',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Account | Social Blocks</title>
      </Helmet>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack spacing={8} mx={'auto'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Welcome.
            </Heading>
            <Text fontSize={'lg'} color={'gray.500'}>
              Add your social links here.
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <VStack
              spacing={4}
              w={{ base: '100%', md: 'container.sm' }}
              as="form"
              onSubmit={(e) => handleSubmit(e)}
            >
              <VStack id="photo" textAlign="center" mx="auto" mb="12px">
                <FileUpload setHash={setHash} hash={hash} />
              </VStack>

              <FormControl isRequired id="username">
                <FormLabel>
                  <i className="fas fa-user right-12"></i> Username
                </FormLabel>

                <Input
                  type="text"
                  placeholder="Username"
                  defaultValue={profile?.username}
                  value={profile?.username}
                  onChange={(e) =>
                    setProfile((prevState) => ({
                      ...prevState,
                      username: e.target.value,
                      slug: slugify(e.target.value),
                    }))
                  }
                />
              </FormControl>

              <FormControl id="slug">
                <FormLabel>
                  <i className="fas fa-link right-12"></i> Link
                </FormLabel>

                <InputGroup>
                  <InputLeftAddon children="socialblocks.io/" />
                  <Input
                    readOnly
                    type="text"
                    placeholder="Link"
                    defaultValue={profile?.slug}
                    value={profile?.slug}
                  />
                </InputGroup>
              </FormControl>

              <FormControl isRequired id="location">
                <FormLabel>
                  <i className="fas fa-map-marker right-12"></i> Location
                </FormLabel>
                <Input
                  type="text"
                  placeholder="Location"
                  defaultValue={profile?.location}
                  value={profile?.location}
                  onChange={(e) =>
                    setProfile((prevState) => ({
                      ...prevState,
                      location: e.target.value,
                    }))
                  }
                />
              </FormControl>

              <FormControl isRequired id="bio">
                <FormLabel>
                  <i className="fas fa-book right-12"></i> Bio
                </FormLabel>
                <Input
                  type="text"
                  placeholder="Bio"
                  defaultValue={profile?.bio}
                  value={profile?.bio}
                  onChange={(e) =>
                    setProfile((prevState) => ({
                      ...prevState,
                      bio: e.target.value,
                    }))
                  }
                />
              </FormControl>

              <FormControl id="email">
                <FormLabel>
                  <i className="fas fa-envelope right-12"></i> Email
                </FormLabel>
                <Input
                  type="email"
                  placeholder="Email"
                  defaultValue={profile?.email}
                  value={profile?.email}
                  onChange={(e) =>
                    setProfile((prevState) => ({
                      ...prevState,
                      email: e.target.value,
                    }))
                  }
                />
              </FormControl>

              <FormControl id="Website">
                <FormLabel>
                  <i className="fas fa-globe right-12"></i> Website
                </FormLabel>
                <Input
                  type="url"
                  placeholder="Website"
                  defaultValue={profile?.website}
                  value={profile?.website}
                  onChange={(e) =>
                    setProfile((prevState) => ({
                      ...prevState,
                      website: e.target.value,
                    }))
                  }
                />
              </FormControl>

              <FormControl id="github">
                <FormLabel>
                  <i className="fa-brands fa-github right-12"></i> GitHub
                </FormLabel>
                <Input
                  type="url"
                  placeholder="GitHub"
                  defaultValue={profile?.github}
                  value={profile?.github}
                  onChange={(e) =>
                    setProfile((prevState) => ({
                      ...prevState,
                      github: e.target.value,
                    }))
                  }
                />
              </FormControl>

              <FormControl id="twitter">
                <FormLabel>
                  <i className="fa-brands fa-twitter right-12"></i> Twitter
                </FormLabel>
                <Input
                  type="url"
                  placeholder="Twitter"
                  defaultValue={profile?.twitter}
                  value={profile?.twitter}
                  onChange={(e) =>
                    setProfile((prevState) => ({
                      ...prevState,
                      twitter: e.target.value,
                    }))
                  }
                />
              </FormControl>

              <FormControl id="youtube">
                <FormLabel>
                  <i className="fa-brands fa-youtube right-12"></i> YouTube
                </FormLabel>
                <Input
                  type="url"
                  placeholder="YouTube"
                  defaultValue={profile?.youtube}
                  value={profile?.youtube}
                  onChange={(e) =>
                    setProfile((prevState) => ({
                      ...prevState,
                      youtube: e.target.value,
                    }))
                  }
                />
              </FormControl>

              <FormControl id="instagram">
                <FormLabel>
                  <i className="fa-brands fa-instagram right-12"></i> Instagram
                </FormLabel>
                <Input
                  type="url"
                  placeholder="Instagram"
                  defaultValue={profile?.instagram}
                  value={profile?.instagram}
                  onChange={(e) =>
                    setProfile((prevState) => ({
                      ...prevState,
                      instagram: e.target.value,
                    }))
                  }
                />
              </FormControl>

              <FormControl id="facebook">
                <FormLabel>
                  <i className="fa-brands fa-facebook right-12"></i> Facebook
                </FormLabel>
                <Input
                  type="url"
                  placeholder="Facebook"
                  defaultValue={profile?.facebook}
                  value={profile?.facebook}
                  onChange={(e) =>
                    setProfile((prevState) => ({
                      ...prevState,
                      facebook: e.target.value,
                    }))
                  }
                />
              </FormControl>

              <FormControl isRequired id="qrcode">
                <FormLabel>
                  <i className="fas fa-qrcode right-12"></i> QR Code Link
                </FormLabel>
                <Input
                  type="url"
                  placeholder="QR Code Link"
                  defaultValue={profile?.qrcode}
                  value={profile?.qrcode}
                  onChange={(e) =>
                    setProfile((prevState) => ({
                      ...prevState,
                      qrcode: e.target.value,
                    }))
                  }
                />
              </FormControl>

              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  colorScheme={'green'}
                  bg={'green.400'}
                  rounded={'full'}
                  px={6}
                  textDecoration="none"
                  fontSize="xl"
                  _hover={{
                    bg: 'green.500',
                  }}
                  type="submit"
                >
                  Submit{' '}
                  <i
                    style={{ marginLeft: '12px' }}
                    className="fa fa-upload right-12"
                  ></i>
                </Button>
              </Stack>
            </VStack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
