const AUTH_KEY = 'valentine_auth_state';

export interface AuthState {
  isUnlocked: boolean;
  hasAcceptedPrompt: boolean;
  timestamp: number;
}

export function setAuthState(state: Partial<AuthState>): void {
  const current = getAuthState();
  const updated: AuthState = {
    ...current,
    ...state,
    timestamp: Date.now(),
  };
  localStorage.setItem(AUTH_KEY, JSON.stringify(updated));
}

export function getAuthState(): AuthState {
  try {
    const stored = localStorage.getItem(AUTH_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to parse auth state:', error);
  }
  return {
    isUnlocked: false,
    hasAcceptedPrompt: false,
    timestamp: 0,
  };
}

export function clearAuthState(): void {
  localStorage.removeItem(AUTH_KEY);
}
