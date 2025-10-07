#!/usr/bin/env node

/**
 * Script para debuggear el problema de login
 * Ejecuta: node debug-login.js
 */

console.log('🔍 Debugging Login Issues...\n');

console.log('📋 Verificaciones necesarias:');
console.log('1. ✅ Tabla users creada');
console.log('2. ❓ Usuario egarcia@gmail.com existe');
console.log('3. ❓ Políticas RLS configuradas');
console.log('4. ❓ Hash de contraseña correcto');

console.log('\n🔧 SQL para verificar en Supabase Dashboard:');
console.log('-- Verificar que el usuario existe');
console.log("SELECT id, email, full_name, role, is_active FROM public.users WHERE email = 'egarcia@gmail.com';");

console.log('\n-- Verificar políticas RLS');
console.log('SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual FROM pg_policies WHERE tablename = \'users\';');

console.log('\n-- Verificar hash de contraseña');
console.log("SELECT password_hash FROM public.users WHERE email = 'egarcia@gmail.com';");

console.log('\n🚨 Posibles problemas:');
console.log('1. Usuario no existe en la tabla');
console.log('2. Políticas RLS bloqueando el acceso');
console.log('3. Hash de contraseña incorrecto');
console.log('4. Usuario inactivo (is_active = false)');

console.log('\n✅ Solución rápida:');
console.log('Ejecuta el SQL de fix-rls-policies.sql en Supabase Dashboard');

console.log('\n🎯 Si el problema persiste:');
console.log('1. Verifica que ejecutaste el SQL de setup');
console.log('2. Verifica que ejecutaste el SQL de fix RLS');
console.log('3. Revisa la consola del navegador para errores específicos');
