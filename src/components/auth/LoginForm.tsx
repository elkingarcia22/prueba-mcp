'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  Heading,
  Text,
  useToast,
  useColorModeValue,
  IconButton,
  useColorMode,
  Divider,
  Link,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon, SunIcon, MoonIcon } from '@chakra-ui/icons';
import { supabase } from '../../lib/supabase';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: 'Error de autenticación',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: '¡Bienvenido!',
          description: 'Has iniciado sesión correctamente',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        // Aquí podrías redirigir al usuario
        console.log('Usuario autenticado:', data.user);
      }
    } catch (error) {
      toast({
        title: 'Error inesperado',
        description: 'Ocurrió un error al intentar iniciar sesión',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        toast({
          title: 'Error al registrarse',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: '¡Registro exitoso!',
          description: 'Revisa tu email para confirmar tu cuenta',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Error inesperado',
        description: 'Ocurrió un error al intentar registrarse',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={8}
      p={8}
      bg={bgColor}
      borderRadius="lg"
      boxShadow="lg"
      border="1px"
      borderColor={borderColor}
    >
      <Box position="absolute" top={4} right={4}>
        <IconButton
          aria-label="Toggle color mode"
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          variant="ghost"
        />
      </Box>

      <VStack spacing={6} align="stretch">
        <Box textAlign="center">
          <Heading size="lg" color="brand.500" mb={2}>
            Bienvenido
          </Heading>
          <Text color="gray.600" fontSize="sm">
            Inicia sesión o crea una cuenta
          </Text>
        </Box>

        <form onSubmit={handleLogin}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                variant="filled"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Contraseña</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Tu contraseña"
                  variant="filled"
                />
                <InputRightElement>
                  <IconButton
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Button
              type="submit"
              colorScheme="brand"
              size="lg"
              width="full"
              isLoading={isLoading}
              loadingText="Iniciando sesión..."
            >
              Iniciar Sesión
            </Button>
          </VStack>
        </form>

        <Divider />

        <Button
          variant="outline"
          colorScheme="brand"
          size="lg"
          width="full"
          onClick={handleSignUp}
          isLoading={isLoading}
          loadingText="Registrando..."
        >
          Crear Cuenta
        </Button>

        <Box textAlign="center" fontSize="sm" color="gray.600">
          <Text>
            ¿Olvidaste tu contraseña?{' '}
            <Link color="brand.500" href="#">
              Recuperar aquí
            </Link>
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};
