import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Heading,
  Text,
  ListItem,
  OrderedList,
  UnorderedList,
  Flex,
  Image
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import ModalRecipeEdit from './ModalRecipeEdit';
import ModalRecipeDelete from './ModalRecipeDelete';

const Card = styled.div`
  border: solid 1px ${(t) => t.theme.colors.gray[300]};
  border-radius: 4px;
  padding: 20px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default function RecipeCard(props) {
  const { t } = useTranslation();
  const { title, desc, ingredients, steps, image } = props;
  const [viewMore, setViewMore] = useState(false);

  return (
    <Card>
      <div>
        <Heading as="h2" mb="2" size="lg">
          {title}
        </Heading>
        <Text dangerouslySetInnerHTML={{ __html: desc }} mb="2" />
        <Image
          src={image}
          alt={title}
          fallbackSrc="https://via.placeholder.com/150"
          width="100%"
          objectFit="cover"
          mb="4"
          sx={{ borderRadius: '4px', aspectRatio: '1' }}
        />
        {viewMore && (
          <>
            <Heading as="h3" mb="1" size="md">
              Ingredients
            </Heading>
            <UnorderedList mb="2">
              {ingredients.map((i) => (
                <ListItem key={i}>{i}</ListItem>
              ))}
            </UnorderedList>
            <Heading as="h3" mb="1" size="md">
              steps
            </Heading>
            <OrderedList mb="2">
              {steps.map((s) => (
                <ListItem key={s}>{s}</ListItem>
              ))}
            </OrderedList>
          </>
        )}
      </div>
      <Flex spacing="2">
        <Button
          onClick={() => setViewMore(!viewMore)}
          flex="1"
          size="sm"
          mr="1"
        >
          {viewMore ? t('viewLess') : t('viewMore')}
        </Button>
        <ModalRecipeEdit {...props} />
        <ModalRecipeDelete {...props} />
      </Flex>
    </Card>
  );
}
