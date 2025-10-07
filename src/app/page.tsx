import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  VStack, 
  HStack, 
  Button, 
  Card, 
  CardBody, 
  CardHeader,
  SimpleGrid,
  Code,
  useColorModeValue,
  IconButton,
  useColorMode,
} from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import Link from 'next/link';

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  return (
    <Box minH="100vh" bg={bgColor}>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          {/* Header */}
          <Box textAlign="center" position="relative">
            <IconButton
              aria-label="Toggle color mode"
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              variant="ghost"
              position="absolute"
              top={0}
              right={0}
            />
            
            <Heading size="2xl" color="brand.500" mb={4}>
              Proyecto con MCP + Design System
            </Heading>
            <Text fontSize="xl" color="gray.600" mb={8}>
              Next.js 15 + Chakra UI + Storybook + Tokens + MCPs + Supabase
            </Text>
            
            <HStack spacing={4} justify="center" flexWrap="wrap">
              <Button as={Link} href="/login" colorScheme="brand" size="lg">
                🔐 Ir al Login
              </Button>
              <Button as="a" href="http://localhost:6006" target="_blank" variant="outline" size="lg">
                📚 Ver Storybook
              </Button>
              <Button as="a" href="https://github.com/elkingarcia22/prueba-mcp" target="_blank" variant="ghost" size="lg">
                🐙 GitHub
              </Button>
            </HStack>
          </Box>

          {/* Features Grid */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            <Card bg={cardBg}>
              <CardHeader>
                <Heading size="md" color="brand.500">
                  🚀 MCPs Configurados
                </Heading>
                <Text fontSize="sm" color="gray.600">
                  Tavily, Firecrawl, GitHub, Storybook, Supabase
                </Text>
              </CardHeader>
              <CardBody>
                <Text mb={4}>
                  Todos los MCPs están configurados y listos para usar. Activa "Manual tool approval" en Cursor.
                </Text>
                <Button colorScheme="brand" size="sm">
                  Probar MCPs
                </Button>
              </CardBody>
            </Card>

            <Card bg={cardBg}>
              <CardHeader>
                <Heading size="md" color="brand.500">
                  🎨 Design System
                </Heading>
                <Text fontSize="sm" color="gray.600">
                  Tokens + Chakra UI + Storybook
                </Text>
              </CardHeader>
              <CardBody>
                <Text mb={4}>
                  Sistema de diseño completo con tokens compilados, componentes reutilizables y documentación.
                </Text>
                <Button variant="outline" colorScheme="brand" size="sm">
                  Ver Componentes
                </Button>
              </CardBody>
            </Card>

            <Card bg={cardBg}>
              <CardHeader>
                <Heading size="md" color="brand.500">
                  🔐 Autenticación
                </Heading>
                <Text fontSize="sm" color="gray.600">
                  Supabase Auth + Modo Claro/Oscuro
                </Text>
              </CardHeader>
              <CardBody>
                <Text mb={4}>
                  Sistema de login completo con Supabase, modo claro/oscuro y componentes de Chakra UI.
                </Text>
                <Button as={Link} href="/login" colorScheme="brand" size="sm">
                  Probar Login
                </Button>
              </CardBody>
            </Card>
          </SimpleGrid>

          {/* Smoke Tests */}
          <Card bg={cardBg}>
            <CardHeader>
              <Heading size="md" color="brand.500">
                🧪 Smoke Tests
              </Heading>
              <Text fontSize="sm" color="gray.600">
                Ejecuta estos comandos en Cursor para probar los MCPs
              </Text>
            </CardHeader>
            <CardBody>
              <VStack spacing={2} align="stretch">
                <Code p={2} fontSize="sm">
                  Tavily: "Busca 3 artículos recientes sobre onboarding"
                </Code>
                <Code p={2} fontSize="sm">
                  Firecrawl: "Crawlea esta URL y devuélveme un resumen"
                </Code>
                <Code p={2} fontSize="sm">
                  GitHub: "Crea un issue 'Definir tokens v1'"
                </Code>
                <Code p={2} fontSize="sm">
                  Storybook: "Lista componentes y props de Button"
                </Code>
                <Code p={2} fontSize="sm">
                  Supabase: "Lista tablas y genera 3 consultas read-only"
                </Code>
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      </Container>
    </Box>
  );
}