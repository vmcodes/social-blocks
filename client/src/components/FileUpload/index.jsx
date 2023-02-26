import { Button, Image, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Placeholder from '../../assets/images/placeholder.png';
const JWT = process.env.REACT_APP_JWT;

export default function FileUpload({ setHash, hash }) {
  const ipfsGateway = `https://gateway.pinata.cloud/ipfs/${hash}`;
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
        authorization: `Bearer ${JWT}`,
      },
    };

    await axios
      .post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, config)
      .then((res) => {
        setHash(res.data.IpfsHash);
        toast({
          title: 'Photo saved!',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
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
        src={hash ? ipfsGateway : files[0]?.preview}
        fallbackSrc={Placeholder}
        alt="photo"
        h="125px"
        w="125px"
        borderRadius="50%"
        margin="auto"
        marginBottom="24px"
      />

      {!files[0]?.preview && !hash && (
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <Button
            colorScheme="green"
            bg={'green.400'}
            _hover={{
              bg: 'green.500',
            }}
            height="50px"
            type="button"
          >
            Add A Photo{' '}
            <i
              style={{ marginLeft: '12px' }}
              className="fas fa-camera right-12"
            ></i>
          </Button>
        </div>
      )}

      {(files[0]?.preview || hash) && (
        <Button
          colorScheme="green"
          bg={'green.400'}
          _hover={{
            bg: 'green.500',
          }}
          height="50px"
          type="button"
          onClick={handleSave}
        >
          Save Photo
          <i
            style={{ marginLeft: '12px' }}
            className="fas fa-save right-12"
          ></i>
        </Button>
      )}
    </section>
  );
}
