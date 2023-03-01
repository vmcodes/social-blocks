import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  useColorModeValue,
} from '@chakra-ui/react';
import Decentralized from '../../assets/images/decentralized.jpg';

const Feature = ({ text, icon, iconBg }) => {
  return (
    <Stack direction={'row'} align={'center'}>
      <Flex
        w={8}
        h={8}
        align={'center'}
        justify={'center'}
        rounded={'full'}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};

export default function Features() {
  return (
    <Container maxW={'5xl'}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stack spacing={4}>
          <Text
            textTransform={'uppercase'}
            color={'green.400'}
            fontWeight={600}
            fontSize={'sm'}
            bg={useColorModeValue('green.50', 'green.900')}
            p={2}
            alignSelf={'flex-start'}
            rounded={'md'}
          >
            Our Story
          </Text>
          <Heading>Decentralized Social Links</Heading>
          <Text color={'gray.500'} fontSize={'lg'}>
            Our decentralized social links allow you to share your content,
            while knowing that your data and personal information is not being
            sold.
          </Text>
          <Text color={'gray.500'} fontSize={'lg'}>
            Keep you and your audience safe from third parties.
          </Text>
          <Stack
            py="12px"
            spacing={4}
            divider={
              <StackDivider
                borderColor={useColorModeValue('gray.100', 'gray.700')}
              />
            }
          >
            <Feature
              icon={<i className="fas fa-lock"></i>}
              iconBg={useColorModeValue('yellow.100', 'yellow.900')}
              text={'Private'}
            />
            <Feature
              icon={<i className="fas fa-shield"></i>}
              iconBg={useColorModeValue('green.100', 'green.900')}
              text={'Secure'}
            />
            <Feature
              icon={<i className="fas fa-fingerprint"></i>}
              iconBg={useColorModeValue('purple.100', 'purple.900')}
              text={'Decentralized'}
            />
          </Stack>
        </Stack>
        <Flex pb="64px">
          <Image
            shadow="2xl"
            rounded={'xl'}
            alt={'feature image'}
            src={Decentralized}
            objectFit={'cover'}
          />
        </Flex>
      </SimpleGrid>
    </Container>
  );
}
