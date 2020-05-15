const TOKEN_KEY: string = 'jwtToken';

export const auth = {
  isLoggedIn(): boolean {
    return this.getToken() !== null;
  },

  logout() {
    this.clear();
  },

  get(key: string): string | null {
    return localStorage.getItem(key);
  },

  getToken(tokenKey = TOKEN_KEY): string | null {
    return this.get(tokenKey);
  },

  set(value: string | string[] | null | undefined, key: string) {
    if (typeof value !== 'string') {
      return null;
    }

    return localStorage.setItem(key, value);
  },

  setToken(
    value: string | string[] | null | undefined = '',
    tokenKey: string = TOKEN_KEY,
  ) {
    return this.set(value, tokenKey);
  },

  clear() {
    localStorage.clear();
  },
};
