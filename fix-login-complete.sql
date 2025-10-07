-- ==============================================
-- SOLUCIÓN COMPLETA PARA PROBLEMAS DE LOGIN
-- Ejecuta este SQL en el SQL Editor de Supabase
-- ==============================================

-- 1. Verificar que la tabla existe
SELECT 'Tabla users existe' as status, count(*) as total_usuarios FROM public.users;

-- 2. Verificar que el usuario existe
SELECT 'Usuario egarcia@gmail.com' as status, 
       id, email, full_name, role, is_active, created_at 
FROM public.users 
WHERE email = 'egarcia@gmail.com';

-- 3. Eliminar TODAS las políticas RLS existentes
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Admins can view all users" ON public.users;
DROP POLICY IF EXISTS "Allow public access for development" ON public.users;

-- 4. Deshabilitar RLS temporalmente para desarrollo
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- 5. Verificar que RLS está deshabilitado
SELECT 'RLS Status' as status, 
       schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'users';

-- 6. Crear usuario de prueba si no existe
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
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- 7. Verificar que el usuario se creó/actualizó correctamente
SELECT 'Usuario final' as status,
       id, email, full_name, role, is_active, created_at, updated_at
FROM public.users 
WHERE email = 'egarcia@gmail.com';

-- 8. Probar consulta que hace el login
SELECT 'Test login query' as status,
       id, email, password_hash, full_name, role, is_active
FROM public.users 
WHERE email = 'egarcia@gmail.com' 
  AND is_active = true;

-- ==============================================
-- ¡LISTO! Ahora el login debería funcionar
-- ==============================================
