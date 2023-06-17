import { v4 as createUuid } from "uuid";
import { users } from "../database/users";

export class Errand {
  private _id: string;
  private _archived: boolean;

  constructor(
    private _description: string,
    private _details: string,
    private _userId: string
  ) {
    this._id = createUuid();
    this._archived = false;
  }

  public get id() {
    return this._id;
  }

  public get archived() {
    return this._archived;
  }

  public get details() {
    return this._details;
  }

  public get description() {
    return this._description;
  }

  public get userId() {
    return this._userId;
  }

  public set archived(archived: boolean) {
    this._archived = archived;
  }

  public set details(details: string) {
    this._details = details;
  }
  public set description(description: string) {
    this._description = description;
  }

  public set userId(userId: string) {
    this._userId = userId;
  }

  public toJson() {
    return {
      id: this.id,
      description: this.description,
      details: this.details,
      archived: this.archived,
    };
  }
}
