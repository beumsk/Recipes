import { Container } from '@chakra-ui/react';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <Container maxW="container.lg">{children}</Container>
      <Footer />
    </>
  );
}
