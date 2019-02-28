// eslint-disable-next-line
const provider = () => firebase.auth();

const login = (email, password) =>
  provider().signInWithEmailAndPassword(email, password);

const logout = () =>
  provider().signOut();

export {
  login,
  logout
}
