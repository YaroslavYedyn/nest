export const authConstants: IAuthConstants = {
  PASS_SALT: 10,
  PASS_SECRET: '',
};

interface IAuthConstants {
  PASS_SALT: number;
  PASS_SECRET: string;
}
