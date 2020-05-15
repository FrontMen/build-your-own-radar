const TOKEN_KEY = 'jwtToken';
const USER_INFO = 'userInfo';

const parse = JSON.parse;
// const stringify = JSON.stringify;

export const auth = {
  isLoggedIn() {},
  /**
   * Returns data from storage
   * @param  {String} key Item to get from the storage
   * @return {String|Object}     Data from the storage
   */
  get(key: string) {
    if (localStorage && localStorage.getItem(key)) {
      return JSON.parse(localStorage.getItem(key)!);
    }

    if (sessionStorage && sessionStorage.getItem(key)) {
      return parse(sessionStorage.getItem(key)!);
    }

    return null;
  },

  // process.env.SHOULD

  getToken(tokenKey = TOKEN_KEY) {
    return auth.get(tokenKey);
  },

  getUserInfo(userInfo = USER_INFO) {
    return auth.get(userInfo);
  },

  // /**
  //  * Set data in storage
  //  * @param {String|Object}  value    The data to store
  //  * @param {String}  key
  //  * @param {Boolean} isLocalStorage  Defines if we need to store in localStorage or sessionStorage
  //  */
  // set(value, key, isLocalStorage) {
  //   if (isEmpty(value)) {
  //     return null;
  //   }

  //   if (isLocalStorage && localStorage) {
  //     return localStorage.setItem(key, stringify(value));
  //   }

  //   if (sessionStorage) {
  //     return sessionStorage.setItem(key, stringify(value));
  //   }

  //   return null;
  // },

  // setToken(value = '', isLocalStorage = false, tokenKey = TOKEN_KEY) {
  //   return auth.set(value, tokenKey, isLocalStorage);
  // },

  // setUserInfo(value = '', isLocalStorage = false, userInfo = USER_INFO) {
  //   return auth.set(value, userInfo, isLocalStorage);
  // },
};
