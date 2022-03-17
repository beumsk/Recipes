import { Box, Container } from '@chakra-ui/react';
import styled from '@emotion/styled';

const Copyright = styled.p`
  font-size: 0.75rem;
  a {
    text-decoration: underline;
    &:hover {
      color: #666;
    }
  }
`;

export default function Footer() {
  const d = new Date();
  return (
    <Box as="footer" py="4" sx={{ textAlign: 'center', marginTop: 'auto' }}>
      <Container>
        <Copyright>
          &copy; {d.getFullYear() + ' '}
          <a href="https://remybeumier.be" target="_blank" rel="noreferrer">
            Rémy Beumier
          </a>
        </Copyright>
      </Container>
    </Box>
  );
}
