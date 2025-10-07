# Configuración de Supabase

## 1. Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_aqui

# Microsoft Clarity Analytics (opcional)
NEXT_PUBLIC_CLARITY_PROJECT_ID=tu_clarity_id_aqui

# GitHub (para MCP)
GITHUB_PAT=tu_github_pat_aqui

# Tavily (para MCP)
TAVILY_API_KEY=tu_tavily_key_aqui

# Firecrawl (para MCP)
FIRECRAWL_API_KEY=tu_firecrawl_key_aqui
```

## 2. Crear Tabla de Usuarios

Ejecuta este SQL en el SQL Editor de Supabase:

```sql
-- Crear tabla de usuarios
CREATE TABLE IF NOT EXISTS public.users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear usuario de prueba
INSERT INTO public.users (email, password_hash, full_name) 
VALUES (
  'egarcia@gmail.com', 
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- contraseña123456
  'Eduardo Garcia'
) ON CONFLICT (email) DO NOTHING;

-- Habilitar RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Política para que los usuarios puedan ver su propio perfil
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid()::text = id::text);

-- Política para que los usuarios puedan actualizar su propio perfil
CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid()::text = id::text);
```

## 3. Configurar Autenticación

En el dashboard de Supabase:
1. Ve a Authentication > Settings
2. Desactiva "Enable email confirmations" para desarrollo
3. Configura "Site URL" como `http://localhost:3000`

## 4. Probar la Conexión

Una vez configurado, puedes probar el login con:
- Email: `egarcia@gmail.com`
- Contraseña: `contraseña123456`
