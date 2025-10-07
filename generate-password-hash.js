#!/usr/bin/env node

/**
 * Script para generar el hash correcto de la contraseña
 * Ejecuta: node generate-password-hash.js
 */

const bcrypt = require('bcryptjs');

const password = 'contraseña123456';
const saltRounds = 10;

console.log('🔐 Generando hash para la contraseña...');
console.log('📝 Contraseña:', password);
console.log('🔢 Salt rounds:', saltRounds);

// Generar hash
const hash = bcrypt.hashSync(password, saltRounds);

console.log('\n✅ Hash generado:');
console.log(hash);

console.log('\n🔍 Verificando hash...');
const isValid = bcrypt.compareSync(password, hash);
console.log('✅ Verificación:', isValid ? 'CORRECTO' : 'INCORRECTO');

console.log('\n📋 SQL para actualizar en Supabase:');
console.log(`UPDATE public.users SET password_hash = '${hash}' WHERE email = 'egarcia@gmail.com';`);

console.log('\n🎯 Hash que debería estar en la base de datos:');
console.log('$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');
