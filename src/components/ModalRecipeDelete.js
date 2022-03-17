import { useState } from 'react';
import { db } from '../firebase.config';
import { doc, deleteDoc } from 'firebase/firestore';
import { IconButton, useDisclosure } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import Modal from '../components/Modal';

export default function ModalRecipe(props) {
  const { id, title, noDelete } = props;
  const disclosure = useDisclosure();

  const removeRecipe = (id) => {
    deleteDoc(doc(db, 'recipes', id));
    disclosure.onClose();
  };

  return (
    <>
      <IconButton
        disabled={noDelete}
        onClick={disclosure.onOpen}
        colorScheme="red"
        aria-label="Delete recipe"
        icon={<DeleteIcon />}
        size="sm"
      />

      <Modal
        title="Delete a recipe"
        btnAction={() => removeRecipe(id)}
        btnActionText="Confirm delete"
        btnActionColor="red"
        disclosure={disclosure}
      >
        {`Are you sure you want to delete "${title}"?`}
      </Modal>
    </>
  );
}
