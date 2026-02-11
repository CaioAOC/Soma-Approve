import { SessionUser } from '@/app/lib/auth';

/**
 * Response do backend para login com Google
 */
interface GoogleAuthResponse {
  success: boolean;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: 'client' | 'admin';
    avatarUrl?: string;
  };
  message?: string;
}

/**
 * Autentica usuário usando credential do Google Identity Services
 * @param credential JWT credential retornado pelo Google
 */
export async function loginWithGoogleCredential(credential: string): Promise<SessionUser> {
  const endpoint = import.meta.env.VITE_AUTH_GOOGLE_ENDPOINT || '/api/auth/google';
  const apiBase = import.meta.env.VITE_API_BASE_URL || '';
  const url = `${apiBase}${endpoint}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ credential }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Erro ao autenticar com Google');
    }

    const data: GoogleAuthResponse = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'Falha na autenticação');
    }

    // Retornar dados do usuário com token
    return {
      id: data.user.id,
      name: data.user.name,
      email: data.user.email,
      role: data.user.role,
      avatarUrl: data.user.avatarUrl,
      token: data.token,
    };
  } catch (error) {
    console.error('Erro no login com Google:', error);
    throw error;
  }
}

/**
 * Faz logout do usuário (apenas frontend, backend é stateless com JWT)
 */
export async function logout(): Promise<void> {
  // Em produção, poderia invalidar o token no backend
  // Por ora, apenas limpamos o localStorage (feito em clearSessionUser)
  return Promise.resolve();
}
