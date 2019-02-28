export default (state = {}, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return { email: action.payload.email }
    case 'SIGN_OUT':
      return {}
    default:
      return state
  }
}