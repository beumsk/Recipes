import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Input,
  SimpleGrid,
  Heading,
  Link,
  FormControl,
  FormErrorMessage,
  Text,
  Image,
  Tag,
  InputGroup,
  InputRightElement,
  Button,
  Spinner
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import Layout from '../components/Layout';

const API_BASE = 'https://api.edamam.com/api/recipes/v2?';
const API_ID = 'cda77f72';
const API_KEY = '6c298b49a57546d41fbe10e72996ddc3';

const Card = styled.div`
  border: solid 1px ${(t) => t.theme.colors.gray[300]};
  border-radius: 4px;
  padding: 20px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default function Api() {
  const location = useLocation();
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recipes, setRecipes] = useState(location.state?.all || '');

  function getRecipes(term) {
    setLoading(true);
    fetch(
      `${API_BASE}type=public&q=${term}&app_id=${API_ID}&app_key=${API_KEY}`
    )
      .then((response) => response.json())
      .then((r) => {
        setRecipes(r);
      })
      .catch((e) => setError(e))
      .finally(setLoading(false));
  }

  function onChange(e) {
    setSearch(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    if (search.length <= 2) return;
    getRecipes(search);
  }

  return (
    <Layout>
      <Heading as="h1" size="2xl" my="6" textAlign="center">
        {t('searchForRecipes')} : {search ? `'${search}'` : ''}
      </Heading>
      <form onSubmit={onSubmit}>
        <FormControl isInvalid={search.length <= 2} mb="4">
          <InputGroup>
            <Input
              bg="white"
              type="text"
              onChange={onChange}
              value={search}
              placeholder={t('searchForRecipes')}
            />
            <InputRightElement width="">
              <Button
                type="submit"
                disabled={search.length <= 2}
                colorScheme="teal"
                minW=""
              >
                {t('search')}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>
            Your search must be at least 3 characters long
          </FormErrorMessage>
        </FormControl>
      </form>

      {error && <Text>{error}</Text>}
      {loading ? (
        <Spinner />
      ) : (
        <SimpleGrid minChildWidth={['280px']} spacing="20px" my="4">
          {recipes &&
            recipes.hits.map((r) => (
              <Card key={r.recipe.uri}>
                <div>
                  <Heading as="h2" mb="2" isTruncated title={r.recipe.label}>
                    <Link
                      as={RouterLink}
                      to={r.recipe.label.replace(/ /g, '-')}
                      state={{ r: r.recipe, all: recipes }}
                    >
                      {r.recipe.label}
                    </Link>
                  </Heading>

                  {r.recipe.cuisineType?.length !== 0 &&
                    (r.recipe.cuisineType?.length === 1 ? (
                      <Tag variant="outline" mb="2">
                        {r.recipe.cuisineType}
                      </Tag>
                    ) : (
                      r.recipe.cuisineType.map((c) => (
                        <Tag key={c} variant="outline" mr="2" mb="2">
                          {c}
                        </Tag>
                      ))
                    ))}

                  {r.recipe.calories && (
                    <Text mb="2">
                      Calories: {r.recipe.calories?.toFixed(0)} kcal
                    </Text>
                  )}

                  {r.recipe.totalTime !== 0 && (
                    <Text mb="2">Time: {r.recipe.totalTime} min</Text>
                  )}
                </div>

                <div>
                  {r.recipe.image !== 0 && (
                    <Image
                      src={r.recipe.image}
                      alt={r.recipe.label}
                      my="2"
                      fallbackSrc="https://via.placeholder.com/150"
                      width="100%"
                      objectFit="cover"
                      sx={{ borderRadius: '4px', aspectRatio: '1' }}
                    />
                  )}
                  <Link
                    as={RouterLink}
                    to={r.recipe.label.replace(/ /g, '-')}
                    state={{ r: r.recipe, all: recipes }}
                  >
                    <Button variant="outline" size="sm" width="100%">
                      {t('viewMore')}
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
        </SimpleGrid>
      )}
    </Layout>
  );
}
