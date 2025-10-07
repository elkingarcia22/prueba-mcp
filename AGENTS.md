# AGENTS.md — Proyecto

## Stack Tecnológico
- **Next.js 15** + TypeScript + App Router
- **Tailwind CSS** para utilidades
- **Chakra UI** (Design System), tokens (Style Dictionary → CSS vars + TS)
- **Storybook** como contrato visual
- **MCPs** conectados: Tavily, Firecrawl, GitHub, Storybook, Supabase

## Comandos principales
```bash
# Desarrollo
npm run dev                 # Servidor de desarrollo Next.js
npm run storybook          # Servidor de Storybook
npm run build              # Build de producción
npm run lint               # Linter ESLint

# Tokens y Design System
npm run tokens             # Compilar tokens con Style Dictionary
npm run tokens:watch       # Watch mode para tokens

# Testing
npm run test               # Tests con Vitest
npm run test:ui            # UI de tests
```

## Estándares de desarrollo

### Design System
- **Reutiliza componentes del DS**; no dupliques estilos
- **Genera story por componente** y documenta props
- **Usa tokens, no valores fijos** (colores, espaciados, tipografía)
- **Accesibilidad obligatoria** (ARIA, contraste, focus)

### Commits
- **Conventional Commits**: `feat/fix/chore/docs/test`
- **Ejemplos**:
  - `feat: add Button component with variants`
  - `fix: resolve accessibility issues in Card`
  - `chore: update dependencies`
  - `docs: add Storybook documentation`

### Estructura de componentes
```tsx
// Ejemplo de componente con tokens
import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react';

interface CustomButtonProps extends ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
}

export const Button: React.FC<CustomButtonProps> = ({ 
  variant = 'primary', 
  ...props 
}) => {
  return (
    <ChakraButton
      colorScheme={variant === 'primary' ? 'brand' : 'gray'}
      variant={variant === 'ghost' ? 'ghost' : 'solid'}
      {...props}
    />
  );
};
```

## MCPs disponibles
- **Tavily**: Búsqueda web inteligente
- **Firecrawl**: Web scraping y crawling
- **GitHub**: Gestión de repositorios y issues
- **Storybook**: Documentación de componentes
- **Supabase**: Base de datos y autenticación

## Smoke tests
Ejecuta estos comandos en Cursor para verificar MCPs:
1. **Tavily**: "Busca 3 artículos recientes sobre onboarding"
2. **Firecrawl**: "Crawlea esta URL y devuélveme un resumen"
3. **GitHub**: "Crea un issue 'Definir tokens v1'"
4. **Storybook**: "Lista componentes y props de Button"
5. **Chakra**: "Crea Card con variants usando tokens"
