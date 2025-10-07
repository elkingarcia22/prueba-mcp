"use client";

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Text,
  VStack,
  HStack,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
  id: string;
  email: string;
  full_name: string;
  role: string;
}

export const AuthStatus: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  useEffect(() => {
    // Obtener usuario del localStorage
    const getStoredUser = () => {
      console.log('🔍 AuthStatus: Obteniendo usuario del localStorage...');
      try {
        const storedUser = localStorage.getItem('user');
        console.log('📦 AuthStatus: Usuario almacenado:', storedUser);
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          console.log('✅ AuthStatus: Usuario parseado:', parsedUser);
          setUser(parsedUser);
        } else {
          console.log('❌ AuthStatus: No hay usuario en localStorage');
        }
      } catch (error) {
        console.error('💥 AuthStatus: Error al obtener usuario del localStorage:', error);
      }
      setLoading(false);
      console.log('🏁 AuthStatus: Carga completada');
    };

    getStoredUser();

    // Escuchar cambios en el localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'user') {
        if (e.newValue) {
          setUser(JSON.parse(e.newValue));
        } else {
          setUser(null);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };

  if (loading) {
    return (
      <Box p={4} bg={bgColor} borderRadius="md" border="1px" borderColor={borderColor}>
        <Text>Cargando...</Text>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box p={4} bg={bgColor} borderRadius="md" border="1px" borderColor={borderColor}>
        <VStack spacing={4}>
          <Text fontSize="lg" fontWeight="semibold" color="gray.600">
            No has iniciado sesión
          </Text>
          <HStack spacing={4}>
            <Button as={Link} href="/login" colorScheme="brand" size="sm">
              Iniciar Sesión
            </Button>
            <Button as={Link} href="/login" variant="outline" colorScheme="brand" size="sm">
              Registrarse
            </Button>
          </HStack>
        </VStack>
      </Box>
    );
  }

  return (
    <Box p={4} bg={bgColor} borderRadius="md" border="1px" borderColor={borderColor}>
      <HStack spacing={4} justify="space-between">
        <HStack spacing={3}>
          <Avatar 
            size="sm" 
            name={user.full_name || user.email}
            bg="brand.500"
          />
          <VStack align="start" spacing={0}>
            <Text fontSize="sm" fontWeight="semibold">
              {user.full_name || 'Usuario'}
            </Text>
            <Text fontSize="xs" color="gray.500">
              {user.email} • {user.role}
            </Text>
          </VStack>
        </HStack>
        
        <Menu>
          <MenuButton as={Button} variant="ghost" size="sm">
            ⋯
          </MenuButton>
          <MenuList>
            <MenuItem onClick={handleSignOut}>
              Cerrar Sesión
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Box>
  );
};
