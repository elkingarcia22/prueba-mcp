#!/usr/bin/env node

/**
 * Script para probar la conexión con Supabase
 * Ejecuta: node scripts/test-supabase.js
 */

const { createClient } = require('@supabase/supabase-js');

// Configuración directa (temporal para pruebas)
const supabaseUrl = 'https://ixdskleupuprxlcxiakh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4ZHNrbGV1cHVwcnhsY3hpYWtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3OTQ5MDcsImV4cCI6MjA3NTM3MDkwN30.dv3ZpjVOinpd1FxqjjeNTjNFLTCQDdiUXoCy0augKKc';

console.log('🧪 Probando conexión con Supabase...\n');

console.log('✅ Variables de entorno configuradas');
console.log(`📡 URL: ${supabaseUrl}`);
console.log(`🔑 Key: ${supabaseKey.substring(0, 20)}...\n`);

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    // Probar conexión básica
    console.log('1. Probando conexión básica...');
    const { data, error } = await supabase.from('users').select('count').limit(1);
    
    if (error) {
      console.error('❌ Error de conexión:', error.message);
      console.log('💡 Esto es normal si la tabla no existe aún');
      console.log('   Necesitas ejecutar la migración SQL primero\n');
      return false;
    }
    
    console.log('✅ Conexión exitosa\n');
    
    // Probar autenticación
    console.log('2. Probando autenticación...');
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: 'egarcia@gmail.com',
      password: 'contraseña123456'
    });
    
    if (authError) {
      console.error('❌ Error de autenticación:', authError.message);
      console.log('💡 Asegúrate de que:');
      console.log('   - La migración SQL se ejecutó correctamente');
      console.log('   - El usuario egarcia@gmail.com existe');
      console.log('   - Las políticas RLS están configuradas');
      return false;
    }
    
    console.log('✅ Autenticación exitosa');
    console.log(`👤 Usuario: ${authData.user.email}`);
    console.log(`🆔 ID: ${authData.user.id}\n`);
    
    // Probar consulta a la tabla users
    console.log('3. Probando consulta a tabla users...');
    const { data: usersData, error: usersError } = await supabase
      .from('users')
      .select('id, email, full_name, role, is_active')
      .eq('email', 'egarcia@gmail.com')
      .single();
    
    if (usersError) {
      console.error('❌ Error consultando usuarios:', usersError.message);
      return false;
    }
    
    console.log('✅ Consulta exitosa');
    console.log('📊 Datos del usuario:');
    console.log(`   - Email: ${usersData.email}`);
    console.log(`   - Nombre: ${usersData.full_name}`);
    console.log(`   - Rol: ${usersData.role}`);
    console.log(`   - Activo: ${usersData.is_active}\n`);
    
    // Cerrar sesión
    console.log('4. Cerrando sesión...');
    await supabase.auth.signOut();
    console.log('✅ Sesión cerrada\n');
    
    console.log('🎉 ¡Todas las pruebas pasaron exitosamente!');
    console.log('🚀 Tu configuración de Supabase está lista para usar.');
    
    return true;
    
  } catch (error) {
    console.error('❌ Error inesperado:', error.message);
    return false;
  }
}

// Ejecutar pruebas
testConnection().then(success => {
  process.exit(success ? 0 : 1);
});