import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  Link,
  Spacer
} from '@chakra-ui/react';

export default function Header() {
  const { i18n, t } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(i18n.language);

  const changeLanguage = (lang) => {
    setSelectedLang(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <Box
      as="header"
      bg="teal.400"
      color="white"
      py="2"
      sx={{ position: 'sticky', top: 0, zIndex: 100 }}
    >
      <Container maxW="container.lg">
        <Flex alignItems="center">
          <Link as={RouterLink} to="/" px="2">
            {t('home')}
          </Link>
          <Link as={RouterLink} to="/api" px="2">
            {t('searchForRecipes')}
          </Link>
          <Spacer />
          <ButtonGroup size="sm" isAttached variant="outline">
            <Button
              onClick={() => changeLanguage('en')}
              size="sm"
              color="gray.600"
              variant=""
              bg={selectedLang === 'en' ? 'white' : 'gray.300'}
            >
              EN
            </Button>
            <Button
              onClick={() => changeLanguage('fr')}
              size="sm"
              color="gray.600"
              variant=""
              bg={selectedLang === 'fr' ? 'white' : 'gray.300'}
            >
              FR
            </Button>
          </ButtonGroup>
        </Flex>
      </Container>
    </Box>
  );
}
