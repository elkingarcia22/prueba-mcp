-- Migración completa para Supabase - Proyecto MCP
-- Ejecuta este SQL en el SQL Editor de Supabase

-- ==============================================
-- 1. CONFIGURACIÓN INICIAL
-- ==============================================

-- Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================
-- 2. TABLA DE USUARIOS
-- ==============================================

-- Crear tabla de usuarios
CREATE TABLE IF NOT EXISTS public.users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('admin', 'user', 'moderator')),
  is_active BOOLEAN DEFAULT true,
  avatar_url TEXT,
  phone VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================
-- 3. USUARIO DE PRUEBA
-- ==============================================

-- Insertar usuario de prueba
-- Email: egarcia@gmail.com
-- Contraseña: contraseña123456 (hash bcrypt)
INSERT INTO public.users (email, password_hash, full_name, role, is_active) 
VALUES (
  'egarcia@gmail.com', 
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
  'Eduardo Garcia',
  'admin',
  true
) ON CONFLICT (email) DO UPDATE SET
  password_hash = EXCLUDED.password_hash,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  updated_at = NOW();

-- ==============================================
-- 4. ROW LEVEL SECURITY (RLS)
-- ==============================================

-- Habilitar RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Política: Los usuarios pueden ver su propio perfil
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid()::text = id::text);

-- Política: Los usuarios pueden actualizar su propio perfil
CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid()::text = id::text);

-- Política: Los administradores pueden ver todos los usuarios
CREATE POLICY "Admins can view all users" ON public.users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id::text = auth.uid()::text 
      AND role = 'admin'
    )
  );

-- Política: Los administradores pueden actualizar todos los usuarios
CREATE POLICY "Admins can update all users" ON public.users
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id::text = auth.uid()::text 
      AND role = 'admin'
    )
  );

-- ==============================================
-- 5. FUNCIONES Y TRIGGERS
-- ==============================================

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at
DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
CREATE TRIGGER update_users_updated_at 
  BEFORE UPDATE ON public.users 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- ==============================================
-- 6. TABLA DE SESIONES (OPCIONAL)
-- ==============================================

-- Crear tabla de sesiones para tracking
CREATE TABLE IF NOT EXISTS public.user_sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  session_token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS para sesiones
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;

-- Política para sesiones
CREATE POLICY "Users can manage own sessions" ON public.user_sessions
  FOR ALL USING (user_id::text = auth.uid()::text);

-- ==============================================
-- 7. ÍNDICES PARA RENDIMIENTO
-- ==============================================

-- Índices para la tabla users
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);
CREATE INDEX IF NOT EXISTS idx_users_is_active ON public.users(is_active);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON public.users(created_at);

-- Índices para la tabla user_sessions
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON public.user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_token ON public.user_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_user_sessions_expires_at ON public.user_sessions(expires_at);

-- ==============================================
-- 8. FUNCIÓN PARA LIMPIAR SESIONES EXPIRADAS
-- ==============================================

-- Función para limpiar sesiones expiradas
CREATE OR REPLACE FUNCTION cleanup_expired_sessions()
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM public.user_sessions 
  WHERE expires_at < NOW();
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ language 'plpgsql';

-- ==============================================
-- 9. VERIFICACIÓN
-- ==============================================

-- Verificar que el usuario de prueba se creó correctamente
SELECT 
  id,
  email,
  full_name,
  role,
  is_active,
  created_at
FROM public.users 
WHERE email = 'egarcia@gmail.com';

-- Mostrar todas las políticas creadas
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename IN ('users', 'user_sessions');

-- ==============================================
-- 10. CONFIGURACIÓN DE AUTENTICACIÓN
-- ==============================================

-- Nota: También necesitas configurar en el dashboard de Supabase:
-- 1. Authentication > Settings > Site URL: http://localhost:3000
-- 2. Authentication > Settings > Disable email confirmations (para desarrollo)
-- 3. Authentication > Settings > Enable email confirmations (para producción)

-- ==============================================
-- FIN DE LA MIGRACIÓN
-- ==============================================
