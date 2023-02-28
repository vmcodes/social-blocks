import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { getProfile } from '../services';
import { Button, Center, Heading, Image, Text, VStack } from '@chakra-ui/react';
import { QRCodeCanvas } from 'qrcode.react';
import Placeholder from '../assets/images/placeholder.png';
import { useParams } from 'react-router-dom';

export default function Profile() {
  const { slug } = useParams();
  const [profile, setProfile] = useState(null);

  const fetchProfile = async () => {
    await getProfile(slug)
      .then((response) => {
        if (response?.address) {
          setProfile(response);
        } else {
          window.location.assign('/');
        }
      })
      .catch(() => {
        window.location.assign('/');
      });
  };

  useEffect(() => {
    if (profile === null && slug) {
      fetchProfile();
    }
    // eslint-disable-next-line
  }, [profile, slug]);

  return (
    <>
      <Helmet>
        <title>
          {profile?.username && `${profile.username} | Social Blocks`}
        </title>
      </Helmet>

      {profile?.address && (
        <>
          <VStack minH="120vh">
            <Center
              width={{ base: '80%', md: '50%', lg: '30%' }}
              flexDirection="column"
              marginTop="24px"
            >
              {profile?.ipfsHash && (
                <Image
                  src={`https://gateway.pinata.cloud/ipfs/${profile.ipfsHash}`}
                  fallbackSrc={Placeholder}
                  alt="photo"
                  h="125px"
                  w="125px"
                  borderRadius="50%"
                  margin="auto"
                  marginBottom="24px"
                />
              )}

              <Heading>{profile?.name && profile.name}</Heading>

              {profile?.location && (
                <Text mt="12px" fontWeight="bold">
                  <i className="fas fa-map-marker right-12" />{' '}
                  {profile.location}
                </Text>
              )}

              <Text my="12px" fontWeight="bold">
                {profile?.bio && profile.bio}
              </Text>

              {profile?.email && (
                <Button
                  size="lg"
                  width="100%"
                  my="18px"
                  colorScheme={'green'}
                  bg={'green.400'}
                  _hover={{
                    bg: 'green.500',
                  }}
                  leftIcon={<i className="fa fa-envelope" />}
                  as="a"
                  href={`mailto:${profile.email}`}
                >
                  Email
                </Button>
              )}

              {profile?.website && (
                <Button
                  size="lg"
                  width="100%"
                  my="12px"
                  colorScheme={'green'}
                  bg={'green.400'}
                  _hover={{
                    bg: 'green.500',
                  }}
                  leftIcon={<i className="fa fa-globe" />}
                  as="a"
                  href={`${profile.website}`}
                  target="_blank"
                >
                  Website
                </Button>
              )}

              {profile?.github && (
                <Button
                  size="lg"
                  width="100%"
                  my="12px"
                  colorScheme={'green'}
                  bg={'green.400'}
                  _hover={{
                    bg: 'green.500',
                  }}
                  leftIcon={<i className="fa-brands fa-github" />}
                  as="a"
                  href={`${profile.github}`}
                  target="_blank"
                >
                  GitHub
                </Button>
              )}

              {profile?.twitter && (
                <Button
                  size="lg"
                  width="100%"
                  my="12px"
                  colorScheme={'green'}
                  bg={'green.400'}
                  _hover={{
                    bg: 'green.500',
                  }}
                  leftIcon={<i className="fa-brands fa-twitter" />}
                  as="a"
                  href={`${profile.twitter}`}
                  target="_blank"
                >
                  Twitter
                </Button>
              )}

              {profile?.youtube && (
                <Button
                  size="lg"
                  width="100%"
                  my="12px"
                  colorScheme={'green'}
                  bg={'green.400'}
                  _hover={{
                    bg: 'green.500',
                  }}
                  leftIcon={<i className="fa-brands fa-youtube" />}
                  as="a"
                  href={`${profile.youtube}`}
                  target="_blank"
                >
                  YouTube
                </Button>
              )}

              {profile?.instagram && (
                <Button
                  size="lg"
                  width="100%"
                  my="12px"
                  colorScheme={'green'}
                  bg={'green.400'}
                  _hover={{
                    bg: 'green.500',
                  }}
                  leftIcon={<i className="fa-brands fa-instagram" />}
                  as="a"
                  href={`${profile.instagram}`}
                  target="_blank"
                >
                  Instagram
                </Button>
              )}

              {profile?.facebook && (
                <Button
                  size="lg"
                  width="100%"
                  my="12px"
                  colorScheme={'green'}
                  bg={'green.400'}
                  _hover={{
                    bg: 'green.500',
                  }}
                  leftIcon={<i className="fa-brands fa-facebook" />}
                  as="a"
                  href={`${profile.facebook}`}
                  target="_blank"
                >
                  Facebook
                </Button>
              )}
            </Center>

            <br />

            <VStack
              spacing={3}
              align={'center'}
              alignSelf={'center'}
              position={'relative'}
              maxW="200px"
              mx="auto"
              className="qrcode"
              mb="64px"
            >
              {profile?.qrcode && (
                <QRCodeCanvas size="200" value={profile.qrcode} />
              )}
            </VStack>
          </VStack>
        </>
      )}
    </>
  );
}
