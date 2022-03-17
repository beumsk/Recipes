import { render, screen } from '@testing-library/react';
import Footer from './Footer';

test('testing test', async () => {
  render(<Footer />);

  expect(screen.getByRole('link', { name: /Rémy Beumier/i }));
});
