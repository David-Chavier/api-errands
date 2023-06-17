import { Request, Response } from "express";
import { users } from "../database/users";
import { Errand } from "../models/errand";
import { errands } from "../database/errands";

export class ErrandsController {
  public create(req: Request, res: Response) {
    try {
      const { userid } = req.params;
      const { description, details } = req.body;

      const user = users.find((user) => user.userId === userid);

      if (!user) {
        return res.status(404).send({
          ok: false,
          message: "user was not found",
        });
      }

      errands.push(new Errand(description, details, userid));

      res.status(200).send({
        ok: true,
        message: "Errand was successfully add",
        data: errands[errands.length - 1].toJson(),
      });
    } catch (err: any) {
      res.status(500).send({ ok: false, message: err.toString() });
    }
  }

  public list(req: Request, res: Response) {
    try {
      const { userid } = req.params;
      const { description, archived } = req.query;

      const user = users.find((user) => user.userId === userid);

      if (!user) {
        return res
          .status(404)
          .send({ ok: false, message: "user was not found" });
      }

      let filteredErrands = errands;

      if (description) {
        filteredErrands = errands.filter(
          (errand) => errand.description === description
        );
      }

      if (archived) {
        filteredErrands = errands.filter(
          (errand) => errand.archived === archived
        );
      }

      res.status(200).send({
        ok: true,
        data: filteredErrands
          .filter((errand) => errand.userId === userid)
          .map((errand) => errand.toJson()),
      });
    } catch (err: any) {
      res.status(500).send({ ok: false, message: err.toString() });
    }
  }

  public update(req: Request, res: Response) {
    try {
      const { userid, errandid } = req.params;

      const { description, details, archived } = req.body;

      const user = users.find((user) => user.userId === userid);

      if (!user) {
        return res
          .status(404)
          .send({ ok: false, message: "user was not found" });
      }

      const errand = errands.find((errand) => errand.id === errandid);

      if (!errand) {
        return res
          .status(404)
          .send({ ok: false, message: "Errand was not found" });
      }

      errand.archived = archived ?? errand.archived;
      errand.details = details ?? errand.details;
      errand.description = description ?? errand.description;

      res.status(200).send({
        ok: true,
        message: "Errand was successfully update",
        data: errand.toJson(),
      });
    } catch (err: any) {
      res.status(500).send({ ok: false, message: err.toString() });
    }
  }

  public delete(req: Request, res: Response) {
    try {
      const { userid, errandid } = req.params;

      const user = users.find((user) => user.userId === userid);

      if (!user) {
        return res
          .status(404)
          .send({ ok: false, message: "user was not found" });
      }

      const errand = errands.findIndex((errand) => errand.id === errandid);

      if (errand === -1) {
        return res
          .status(404)
          .send({ ok: false, message: "Errand was not found" });
      }

      const deletedErrand = errands.splice(errand, 1);

      res.status(200).send({
        ok: true,
        message: "Errand was successfully delete",
        data: deletedErrand[0].toJson(),
      });
    } catch (err: any) {
      res.status(500).send({ ok: false, message: err.toString() });
    }
  }
}
