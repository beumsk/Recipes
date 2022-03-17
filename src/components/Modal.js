import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react';

export default function ModalCustom({
  title,
  btnAction,
  btnActionText,
  btnActionColor,
  children,
  disclosure
}) {
  const { isOpen, onOpen, onClose } = disclosure;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        {title && <ModalHeader>{title}</ModalHeader>}
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>

        <ModalFooter>
          <Button mr={3} variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme={btnActionColor || 'green'} onClick={btnAction}>
            {btnActionText || 'Secondary Action'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
