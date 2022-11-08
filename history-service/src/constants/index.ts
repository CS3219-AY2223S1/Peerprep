export type User = {
  username: String,
  id: Number
};

export interface SessionRes {
  userOneName: String;
  userTwoName: String;
  completedOn: Date;
  duration: String;
  difficulty: String;
  code: String;
}
