"use client";

import { ChakraProvider } from '@chakra-ui/react';
import { getTheme } from '../theme/theme';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <ChakraProvider theme={getTheme()}>
      {children}
    </ChakraProvider>
  );
}
