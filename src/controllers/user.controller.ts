import { Request, Response } from "express";
import { users } from "../database/users";
import { User } from "../models/user";

export class UserController {
  public login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      const userValidation = users.find(
        (user) => user.username === username && user.password === password
      );

      if (!userValidation) {
        return res
          .status(401)
          .send({ ok: false, message: "invalid username or password" });
      }

      res
        .status(200)
        .send({ ok: true, message: "logged in user", data: userValidation });
    } catch (err: any) {
      return res.status(500).send({
        ok: false,
        message: err.toString(),
      });
    }
  }
  public create(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      const user = new User(username, password);
      users.push(user);

      res.status(200).send({
        ok: true,
        message: "user was create successfully created",
      });
    } catch (err: any) {
      return res.status(500).send({
        ok: false,
        message: err.toString(),
      });
    }
  }

  public list(req: Request, res: Response) {
    try {
      return res
        .status(200)
        .send({ ok: true, data: users.map((user) => user.toJson()) });
    } catch (err: any) {
      return res.status(500).send({ ok: false, message: err.toString() });
    }
  }

  public update(req: Request, res: Response) {
    try {
      const { userid } = req.params;
      const { password } = req.body;

      const user = users.find((user) => user.userId === userid);

      if (!user) {
        return res.status(404).send({
          ok: false,
          message: "user was not found",
        });
      }

      user.password = password;

      res.status(200).send({
        ok: true,
        message: "Password was successfully update",
      });
    } catch (err: any) {
      return res.status(500).send({
        ok: false,
        message: err.toString(),
      });
    }
  }

  public delete(req: Request, res: Response) {
    try {
      const { userid } = req.params;

      const user = users.findIndex((user) => user.userId === userid);

      if (user === -1) {
        return res
          .status(404)
          .send({ ok: false, message: "user was not found" });
      }

      const userDeleted = users.splice(user, 1);

      return res.status(200).send({
        ok: true,
        message: "user was sucessfully deleted",
        data: userDeleted[0].toJson,
      });
    } catch (err: any) {
      return res.status(500).send({ ok: false, message: err.toString() });
    }
  }
}
