-- ==============================================
-- SOLUCIONAR HASH DE CONTRASEÑA
-- Ejecuta este SQL en el SQL Editor de Supabase
-- ==============================================

-- 1. Verificar el hash actual
SELECT 'Hash actual' as status, password_hash 
FROM public.users 
WHERE email = 'egarcia@gmail.com';

-- 2. Actualizar con el hash correcto para 'contraseña123456'
-- Este hash corresponde exactamente a 'contraseña123456'
UPDATE public.users 
SET password_hash = '$2b$10$lFUcSJeXISTZizORdURtpeIjjMh9LOeGsFgiMQ4o9KwAViKPY2RMW',
    updated_at = NOW()
WHERE email = 'egarcia@gmail.com';

-- 3. Verificar que se actualizó correctamente
SELECT 'Hash actualizado' as status, 
       email, 
       password_hash, 
       full_name, 
       role, 
       is_active,
       updated_at
FROM public.users 
WHERE email = 'egarcia@gmail.com';

-- ==============================================
-- ¡LISTO! Ahora prueba el login nuevamente
-- ==============================================
