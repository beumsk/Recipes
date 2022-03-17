import { useState, useEffect } from 'react';
import { db } from '../firebase.config';
import { collection, onSnapshot } from 'firebase/firestore';
import { Heading, SimpleGrid } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import Layout from '../components/Layout';
import ModalRecipeAdd from '../components/ModalRecipeAdd';
import RecipeCard from '../components/RecipeCard';

export default function Home() {
  const { t } = useTranslation();
  const [recipes, setRecipes] = useState([]);

  const recipesCollectionRef = collection(db, 'recipes');

  useEffect(() => {
    onSnapshot(recipesCollectionRef, (snapshot) => {
      setRecipes(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data()
          };
        })
      );
    });
  }, []);

  return (
    <Layout>
      <Heading as="h1" size="2xl" my="6" textAlign="center">
        {t('recipes')}
      </Heading>

      <SimpleGrid minChildWidth={['280px']} spacing="20px" my="4">
        {recipes.map((r, i) => (
          <RecipeCard key={r.id} {...r} />
        ))}
      </SimpleGrid>

      <ModalRecipeAdd />
    </Layout>
  );
}
