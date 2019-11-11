const express = require("express");
const { success, error } = require("../response");
const knex = require("../knex");
const router = express.Router();

router.get("/", async function(req, res) {
  const persons = await knex("person").select([
    "id",
    "name",
    "surname",
    "email",
    "cuit"
  ]);
  return success(res, persons);
});

router.get("/:id", async function(req, res) {
  const persons = await knex("person")
    .select(["id", "name", "surname", "email", "cuit"])
    .where({ deleted: false })
    .andWhere(where);
  if (persons.length) {
    return success(res, persons[0]);
  }
  error(res);
});

router.post("/", async function(req, res) {
  const { body } = req;
  if (body.name) {
    const t = await knex.transaction();
    try {
      const [id] = await knex("person")
        .transacting(t)
        .insert({
          name: body.name,
          surname: body.surname,
          email: body.email,
          cuit: body.cuit
        });
      await t.commit();
      return success(res);
    } catch (e) {
      await t.rollback();
      throw e;
    }
  }
  return error(res, "Bad request", 400);
});

router.delete("/:id", async function(req, res) {
  const {
    params: { id }
  } = req;
  if (id) {
    await knex("person")
      .where({  id })
      .delete();
    return success(res);
  }
  return error(res, "Bad request", 400);
});

router.put("/:id", async function(req, res) {
  const { body, params } = req;
  const { id } = params;
  if (id) {
    const t = await knex.transaction();
    await knex("person")
      .transacting(t)
      .update({
        name: body.name,
        surname: body.surname,
        email: body.email,
        cuit: body.cuit
      })
      .where({
        id
      });
    await t.commit();
    return success(res);
  }

  return error(res, "Bad request", 400, id);
});

module.exports = router;
