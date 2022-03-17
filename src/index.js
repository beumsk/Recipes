import React, { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, extendTheme, Spinner } from '@chakra-ui/react';
import App from './App';

import './i18n';

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac'
  }
};
const theme = extendTheme({ colors });

const rootElement = document.getElementById('root');
ReactDOM.render(
  <StrictMode>
    <Suspense fallback={<Spinner />}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Suspense>
  </StrictMode>,
  rootElement
);
