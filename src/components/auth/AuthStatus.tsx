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
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
  id: string;
  email: string;
  user_metadata?: {
    full_name?: string;
  };
}

export const AuthStatus: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  useEffect(() => {
    // Obtener sesión actual
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setLoading(false);
    };

    getSession();

    // Escuchar cambios en la autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
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
            name={user.user_metadata?.full_name || user.email}
            bg="brand.500"
          />
          <VStack align="start" spacing={0}>
            <Text fontSize="sm" fontWeight="semibold">
              {user.user_metadata?.full_name || 'Usuario'}
            </Text>
            <Text fontSize="xs" color="gray.500">
              {user.email}
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
