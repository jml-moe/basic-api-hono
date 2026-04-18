import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { CreateProductSchema } from "./schema.js";

export const productRouter = new Hono() // pakai chaining
  .get("/", (c) => {
    const token = c.req.header("token");
    if (!token) {
      return c.json({ message: "Unauthorized" }, 401);
    }

    return c.json([]);
  })
  .get("/:id", (c) => {
    const product = {};

    return c.json({});
  })
  .post("/", zValidator("json", CreateProductSchema), async (c) => {
    const body = c.req.valid("json");
    console.log({ body });

    return c.json({ message: "Created Succesfully" }, 201);
  })
  .patch("/:id", (c) => {
    return c.json({});
  })
  .delete("/:id", (c) => {
    return c.json({ message: "" });
  });
