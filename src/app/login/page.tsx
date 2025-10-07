'use client';

import { LoginForm } from '../../components/auth/LoginForm';
import { NoSSR } from '../../components/NoSSR';

export default function LoginPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <NoSSR>
        <LoginForm />
      </NoSSR>
    </div>
  );
}
