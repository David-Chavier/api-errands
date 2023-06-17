import { v4 as createUuid } from "uuid";

export class User {
  private _userId: string;

  constructor(private _username: string, private _password: string) {
    this._userId = createUuid();
  }

  public get userId() {
    return this._userId;
  }

  public get username() {
    return this._username;
  }

  public get password() {
    return this._password;
  }

  public set username(username: string) {
    this._username = username;
  }

  public set password(passoword: string) {
    this._password = passoword;
  }

  public toJson() {
    return {
      id: this._userId,
      username: this.username,
      password: this.password,
    };
  }
}
