import { Button, Image, Stack, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Placeholder from '../../assets/images/placeholder.png';
const PINATA_JWT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyZmJlNTZiYS0xODU4LTRjZGUtYTVmOC02MzQyNzI4ZjczNWQiLCJlbWFpbCI6ImNvZGVjcmF3bGVyc0Bwcm90b25tYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJjMDY1OGI2NWIzMGI0OWEyOGY1MCIsInNjb3BlZEtleVNlY3JldCI6ImI1YjYxNDYwYmJiNTFkMmQwNTE0ZTQwM2Y3Mzg4MzYwZDM0N2I2ZTQ5MjYwNmVkNmRjNzNmYzU1Y2RjODQzZTEiLCJpYXQiOjE2Nzc3NzQzNjR9.t7h_JcYkNHfkui-u7Wy13ZhOO6fkJ4fF54g0uGvrtCk';

export default function FileUpload({ setHash, hash }) {
  const [files, setFiles] = useState([]);
  const toast = useToast();

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    multiple: false,
  });

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const handleCancel = () => {
    setHash(null);
    setFiles([]);
  };

  const handleSave = async () => {
    const formData = new FormData();

    formData.append('file', files[0]);

    const metadata = JSON.stringify({
      name: files[0]?.name,
    });

    formData.append('pinataMetadata', metadata);

    const options = JSON.stringify({
      cidVersion: 0,
    });

    formData.append('pinataOptions', options);

    const config = {
      maxBodyLength: 'Infinity',
      headers: {
        'Content-Type': `multipart/form-data`,
        authorization: `Bearer ${PINATA_JWT}`,
      },
    };

    await axios
      .post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, config)
      .then((res) => {
        setHash(res.data.IpfsHash);
        setFiles([]);
        toast({
          title: 'Photo saved!',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
        setFiles([]);
        toast({
          title: 'Upload error!',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      });
  };

  return (
    <section>
      <Image
        src={
          files[0]?.preview
            ? files[0]?.preview
            : `https://gateway.pinata.cloud/ipfs/${hash}`
        }
        fallbackSrc={Placeholder}
        alt="photo"
        h="145px"
        w="145px"
        borderRadius="50%"
        margin="auto"
        marginBottom="24px"
      />

      {!files[0]?.preview && (
        <div {...getRootProps()}>
          <input {...getInputProps()} />
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
            type="button"
            w="200px"
          >
            Add Photo
            <i
              style={{ marginLeft: '12px' }}
              className="fas fa-camera right-12"
            ></i>
          </Button>
        </div>
      )}

      {files[0]?.preview && (
        <Stack
          direction={{ base: 'column', md: 'row' }}
          justifyContent="space-around"
        >
          <Button
            mr="12px"
            mb="12px"
            height="50px"
            rounded={'full'}
            px={12}
            fontSize="xl"
            border="transparent"
            cursor="pointer"
            colorScheme={'gray'}
            bg={'gray.400'}
            _hover={{
              bg: 'gray.500',
            }}
            type="button"
            w="200px"
            onClick={handleCancel}
          >
            Cancel
            <i
              style={{ marginLeft: '12px' }}
              className="fas fa-close right-12"
            ></i>
          </Button>

          <Button
            ml="12px"
            mb="12px"
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
            type="button"
            w="200px"
            onClick={handleSave}
          >
            Save
            <i
              style={{ marginLeft: '12px' }}
              className="fas fa-save right-12"
            ></i>
          </Button>
        </Stack>
      )}
    </section>
  );
}
