/**
 * Tipos de sessão de usuário
 */
export type SessionRole = 'client' | 'admin';

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: SessionRole;
  avatarUrl?: string;
  token?: string;
}

const SESSION_STORAGE_KEY = 'soma_approve_session';

/**
 * Salva sessão do usuário no localStorage
 */
export function setSessionUser(user: SessionUser): void {
  try {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Erro ao salvar sessão:', error);
  }
}

/**
 * Recupera sessão do usuário do localStorage
 */
export function getSessionUser(): SessionUser | null {
  try {
    const data = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!data) return null;
    return JSON.parse(data) as SessionUser;
  } catch (error) {
    console.error('Erro ao recuperar sessão:', error);
    return null;
  }
}

/**
 * Remove sessão do usuário (logout)
 */
export function clearSessionUser(): void {
  try {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  } catch (error) {
    console.error('Erro ao limpar sessão:', error);
  }
}

/**
 * Verifica se há uma sessão ativa
 */
export function hasActiveSession(): boolean {
  return getSessionUser() !== null;
}

/**
 * Verifica se o usuário atual é admin
 */
export function isAdmin(): boolean {
  const user = getSessionUser();
  return user?.role === 'admin';
}
