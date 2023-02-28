import { Button, Image, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Placeholder from '../../assets/images/placeholder.png';
import { fileUpload } from '../../services';

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

  const handleClear = () => {
    setHash(null);
    setFiles([]);
  };

  const handleSave = async () => {
    const formData = new FormData();

    formData.append('file', files[0]);

    await fileUpload(formData)
      .then((res) => {
        setHash(res);
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
        src={
          files[0]?.preview
            ? files[0]?.preview
            : `https://gateway.pinata.cloud/ipfs/${hash}`
        }
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

      {files[0]?.preview && (
        <>
          <Button
            mr="12px"
            colorScheme="gray"
            bg={'gray.400'}
            _hover={{
              bg: 'gray.500',
            }}
            height="50px"
            type="button"
            onClick={handleClear}
          >
            Clear
            <i
              style={{ marginLeft: '12px' }}
              className="fas fa-save right-12"
            ></i>
          </Button>

          <Button
            ml="12px"
            colorScheme="green"
            bg={'green.400'}
            _hover={{
              bg: 'green.500',
            }}
            height="50px"
            type="button"
            onClick={handleSave}
          >
            Save
            <i
              style={{ marginLeft: '12px' }}
              className="fas fa-save right-12"
            ></i>
          </Button>
        </>
      )}
    </section>
  );
}
