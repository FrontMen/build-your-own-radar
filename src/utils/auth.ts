const TOKEN_KEY: string = 'jwtToken';

export const auth = {
  isLoggedIn(): boolean {
    return auth.getToken() !== null;
  },

  logout() {
    auth.clear();
  },

  get(key: string): string | null {
    return localStorage.getItem(key);
  },

  getToken(tokenKey = TOKEN_KEY): string | null {
    return auth.get(tokenKey);
  },

  set(value: string | string[] | null | undefined, key: string) {
    if (typeof value !== 'string') {
      return null;
    }

    return localStorage.setItem(key, value);
  },

  setToken(value: string, tokenKey: string = TOKEN_KEY) {
    return auth.set(value, tokenKey);
  },

  clear() {
    localStorage.clear();
  },
};
