import React, { useState } from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import Layout from '../components/Layout';
import {
  Heading,
  Text,
  Image,
  Tag,
  Link,
  Flex,
  Box,
  UnorderedList,
  ListItem
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

export default function Apis(props) {
  const location = useLocation();

  const {
    label,
    url,
    image,
    cuisineType,
    calories,
    totalTime,
    ingredients
  } = location.state.r;

  return (
    <Layout>
      <Box my="4">
        <Link as={RouterLink} to="/api" state={{ all: location.state.all }}>
          ‹ Back
        </Link>
      </Box>
      <Box
        bg="white"
        p="20px"
        sx={{ borderRadius: '4px', flexGrow: 1, border: 'solid 1px #CBD5E0' }}
      >
        <Flex
          flexDirection={['column', null, 'row']}
          justifyContent="space-between"
        >
          <Box pr="4" mb="4" sx={{ flexGrow: 1 }}>
            <Heading as="h1" size="2xl" mb="6">
              {label}
            </Heading>

            {cuisineType?.length !== 0 &&
              (cuisineType?.length === 1 ? (
                <Tag variant="outline" mb="2">
                  {cuisineType}
                </Tag>
              ) : (
                cuisineType.map((c) => (
                  <Tag key={c} variant="outline" mr="2" mb="2">
                    {c}
                  </Tag>
                ))
              ))}

            {calories && (
              <Text mt="6" mb="2">
                <b>Calories:</b> {calories?.toFixed(0)} kcal
              </Text>
            )}

            {totalTime !== 0 && (
              <Text mb="2">
                <b>Time:</b> {totalTime} min
              </Text>
            )}

            {ingredients.length > 0 && (
              <>
                <Text fontWeight="bold">Ingredients:</Text>
                <UnorderedList mb="6">
                  {ingredients.map((i) => {
                    return <ListItem>{i.text}</ListItem>;
                  })}
                </UnorderedList>
              </>
            )}

            {url && (
              <Link href={url} isExternal>
                <ExternalLinkIcon mr="1" /> Check original post
              </Link>
            )}
          </Box>

          {image !== 0 && (
            <Image
              src={image}
              alt={label}
              fallbackSrc="https://via.placeholder.com/150"
              width={['100%', null, '400px']}
              objectFit="cover"
              sx={{ borderRadius: '4px', aspectRatio: '1' }}
            />
          )}
        </Flex>
      </Box>
    </Layout>
  );
}
