export const SIGNIN = "AddUser";

export function onChangeUserLogin(stateFromSignin) {
  return {
    type: SIGNIN,
    payload: stateFromSignin
  };
}
