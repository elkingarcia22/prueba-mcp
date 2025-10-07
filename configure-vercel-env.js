#!/usr/bin/env node

// Script para configurar variables de entorno en Vercel usando el MCP
// Este script usa el MCP de Vercel para configurar las variables automáticamente

const SUPABASE_URL = "https://ixdskleupuprxlcxiakh.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4ZHNrbGV1cHVwcnhsY3hpYWtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3OTQ5MDcsImV4cCI6MjA3NTM3MDkwN30.dv3ZpjVOinpd1FxqjjeNTjNFLTCQDdiUXoCy0augKKc";
const CLARITY_PROJECT_ID = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ4M0FCMDhFNUYwRDMxNjdEOTRFMTQ3M0FEQTk2RTcyRDkwRUYwRkYiLCJ0eXAiOiJKV1QifQ.eyJqdGkiOiI2NjhhNDBkYy03NDU4LTQ4YzctODg2OS0wNTNjY2FkZjhhNTUiLCJzdWIiOiIzMDA4MzAyMDc0ODU0ODY3Iiwic2NvcGUiOiJEYXRhLkV4cG9ydCIsIm5iZiI6MTc1OTgyNDAxMiwiZXhwIjo0OTEzNDI0MDEyLCJpYXQiOjE3NTk4MjQwMTIsImlzcyI6ImNsYXJpdHkiLCJhdWQiOiJjbGFyaXR5LmRhdGEtZXhwb3J0ZXIifQ.TVl497oe1NcP5TNaj2M7afuwZkWfue8cn5gyC-whPzr3iqnTc6tvb6AoBoCMTaFNdhUoAaw6chqShsHTgEgbMkJzPkWI_8i7jbBnocrMMby1JlC1rRjsk0kvGIVFXotAUy4IPScWQZGU30PrbtUowWndWBSKgUqW3iP84qQL41XcdxL4duEsdtDFhfWoYa9DNAqpPQl5aMVsXiC3BTpMQgwjuzfmDiUrVarVwpxK1j9MzDba8nLF__rcjW9BAvKW8_AGWgvlTcTOuj1bUffyaTrLV1ThUCH8bY8BA2Yn9U6iBO3AlZpY4gaYp7m82Ifn--3Z9J1tBKOPIYthBFVYrQ";

console.log("🚀 Configurando variables de entorno en Vercel...");
console.log("📋 Variables a configurar:");
console.log(`   - NEXT_PUBLIC_SUPABASE_URL: ${SUPABASE_URL}`);
console.log(`   - NEXT_PUBLIC_SUPABASE_ANON_KEY: ${SUPABASE_ANON_KEY.substring(0, 20)}...`);
console.log(`   - NEXT_PUBLIC_CLARITY_PROJECT_ID: ${CLARITY_PROJECT_ID.substring(0, 20)}...`);

console.log("\n📝 Instrucciones para configurar manualmente:");
console.log("1. Ve a https://vercel.com/dashboard");
console.log("2. Selecciona el proyecto: mcp-design-system-app");
console.log("3. Ve a Settings → Environment Variables");
console.log("4. Agrega las siguientes variables para TODOS los entornos:");
console.log(`   - NEXT_PUBLIC_SUPABASE_URL: ${SUPABASE_URL}`);
console.log(`   - NEXT_PUBLIC_SUPABASE_ANON_KEY: ${SUPABASE_ANON_KEY}`);
console.log(`   - NEXT_PUBLIC_CLARITY_PROJECT_ID: ${CLARITY_PROJECT_ID}`);
console.log("5. Haz Redeploy del proyecto");

console.log("\n🔧 Alternativa usando Vercel CLI:");
console.log("npx vercel env add NEXT_PUBLIC_SUPABASE_URL production");
console.log("npx vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production");
console.log("npx vercel env add NEXT_PUBLIC_CLARITY_PROJECT_ID production");
console.log("npx vercel --prod");

console.log("\n✅ Una vez configuradas las variables, el deployment debería funcionar correctamente.");
