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
import { useRouter } from 'next/navigation';
import bcrypt from 'bcryptjs';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();
  const router = useRouter();

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    console.log('🔐 Iniciando proceso de login...');
    console.log('📧 Email:', email);
    console.log('🔑 Contraseña:', password ? '[PROVIDED]' : '[EMPTY]');

    try {
      console.log('🔍 Buscando usuario en Supabase...');
      console.log('🌐 Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
      
      // Buscar usuario en nuestra tabla personalizada
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .eq('is_active', true)
        .single();

      console.log('📊 Resultado de la consulta:');
      console.log('  - userData:', userData);
      console.log('  - userError:', userError);
      console.log('  - userError?.message:', userError?.message);
      console.log('  - userError?.code:', userError?.code);
      console.log('  - userError?.details:', userError?.details);

      if (userError) {
        console.error('❌ Error al buscar usuario:', userError);
        toast({
          title: 'Error de autenticación',
          description: `Error: ${userError.message} (Código: ${userError.code})`,
          status: 'error',
          duration: 8000,
          isClosable: true,
        });
        return;
      }

      if (!userData) {
        console.error('❌ Usuario no encontrado');
        toast({
          title: 'Error de autenticación',
          description: 'Usuario no encontrado o inactivo',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      console.log('✅ Usuario encontrado:', {
        id: userData.id,
        email: userData.email,
        full_name: userData.full_name,
        role: userData.role,
        is_active: userData.is_active
      });

      console.log('🔐 Verificando contraseña...');
      console.log('  - Password provided:', password);
      console.log('  - Hash stored:', userData.password_hash);
      
      // Verificar contraseña
      const isValidPassword = await bcrypt.compare(password, userData.password_hash);
      
      console.log('🔑 Resultado de verificación de contraseña:', isValidPassword);
      
      if (!isValidPassword) {
        console.error('❌ Contraseña incorrecta');
        toast({
          title: 'Error de autenticación',
          description: 'Contraseña incorrecta',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      console.log('🎉 Login exitoso!');
      
      // Login exitoso
      toast({
        title: '¡Bienvenido!',
        description: `Hola ${userData.full_name}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      // Guardar usuario en localStorage para simular sesión
      const userSession = {
        id: userData.id,
        email: userData.email,
        full_name: userData.full_name,
        role: userData.role
      };
      
      console.log('💾 Guardando sesión en localStorage:', userSession);
      localStorage.setItem('user', JSON.stringify(userSession));
      
      // Redirigir al usuario al home
      console.log('🏠 Redirigiendo al home...');
      router.push('/');
      console.log('✅ Usuario autenticado exitosamente:', userData);
      
    } catch (error) {
      console.error('💥 Error inesperado en login:', error);
      console.error('💥 Error stack:', error.stack);
      toast({
        title: 'Error inesperado',
        description: `Error: ${error.message}`,
        status: 'error',
        duration: 8000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
      console.log('🏁 Proceso de login finalizado');
    }
  };

  const handleSignUp = async () => {
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
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
    } catch {
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
