import { useState } from 'react';
import { db } from '../firebase.config';
import { doc, updateDoc } from 'firebase/firestore';
import {
  Input,
  Textarea,
  FormControl,
  FormLabel,
  FormErrorMessage,
  IconButton,
  useDisclosure,
  Checkbox
} from '@chakra-ui/react';
import { AddIcon, EditIcon } from '@chakra-ui/icons';
import Modal from '../components/Modal';

export default function ModalRecipe(props) {
  const { title, desc, ingredients, steps, image, noDelete, id } = props;
  const disclosure = useDisclosure();
  const [form, setForm] = useState({
    title: title,
    desc: desc,
    ingredients: ingredients,
    steps: steps,
    image: image,
    noDelete: noDelete,
    isSubmitted: false
  });

  const handleSubmit = () => {
    setForm({ ...form, isSubmitted: true });
    if (
      !form.title ||
      !form.desc ||
      !(form.ingredients.length > 0 && form.ingredients.join('').length > 0) ||
      !(form.steps.length > 0 && form.steps.join('').length > 0)
    ) {
      return;
    }

    updateDoc(doc(db, 'recipes', id), {
      ...props,
      title: form.title,
      desc: form.desc,
      ingredients: form.ingredients,
      steps: form.steps,
      image: form.image,
      noDelete: form.noDelete
    });

    setForm({ ...form, isSubmitted: false });

    disclosure.onClose();
  };

  const handleFields = (e, i, type) => {
    const clone = [...form[type]];
    clone[i] = e.target.value;
    setForm({
      ...form,
      [type]: clone
    });
  };

  const handleFieldCount = (type) => {
    setForm({
      ...form,
      [type]: [...form[type], '']
    });
  };

  return (
    <>
      <IconButton
        onClick={disclosure.onOpen}
        colorScheme="blue"
        aria-label="Edit recipe"
        icon={<EditIcon />}
        size="sm"
        mr="1"
      />

      <Modal
        title="Edit a recipe"
        btnAction={handleSubmit}
        btnActionText="Edit"
        btnActionColor="blue"
        disclosure={disclosure}
      >
        <FormControl
          isInvalid={form.isSubmitted && form.title === ''}
          isRequired
          mb="4"
        >
          <FormLabel htmlFor="title">Title</FormLabel>
          <Input
            id="title"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <FormErrorMessage>Title is required</FormErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={form.isSubmitted && form.desc === ''}
          isRequired
          mb="4"
        >
          <FormLabel htmlFor="description">Description</FormLabel>
          <Input
            id="description"
            placeholder="Description"
            value={form.desc}
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
          />
          <FormErrorMessage>Description is required</FormErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={
            form.isSubmitted &&
            (form.ingredients.length === 0 ||
              form.ingredients.join('').length === 0)
          }
          isRequired
          mb="4"
        >
          <FormLabel>Ingredients</FormLabel>
          {form.ingredients.map((ingredient, i) => (
            <Input
              type="text"
              key={i}
              value={ingredient}
              onChange={(e) => handleFields(e, i, 'ingredients')}
              mb="2"
            />
          ))}
          <IconButton
            onClick={() => handleFieldCount('ingredients')}
            aria-label="Add ingredient"
            title="Add ingredient"
            icon={<AddIcon />}
            size="sm"
          />
          <FormErrorMessage>
            Ingredients require at least one element
          </FormErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={
            form.isSubmitted &&
            (form.steps.length === 0 || form.steps.join('').length === 0)
          }
          isRequired
          mb="4"
        >
          <FormLabel>Steps</FormLabel>
          {form.steps.map((step, i) => (
            <Textarea
              type="text"
              key={i}
              value={step}
              onChange={(e) => handleFields(e, i, 'steps')}
              minH="40px"
              mb="2"
            />
          ))}
          <IconButton
            onClick={() => handleFieldCount('steps')}
            aria-label="Add step"
            title="Add step"
            icon={<AddIcon />}
            size="sm"
          />
          <FormErrorMessage>
            Steps require at least one element
          </FormErrorMessage>
        </FormControl>

        <FormControl mb="4">
          <FormLabel htmlFor="image">Image url</FormLabel>
          <Input
            id="image"
            placeholder="Image url"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />
        </FormControl>

        <FormControl mb="4">
          <Checkbox
            isChecked={form.noDelete}
            onChange={(e) => setForm({ ...form, noDelete: e.target.checked })}
          >
            Prevent delete
          </Checkbox>
        </FormControl>
      </Modal>
    </>
  );
}
