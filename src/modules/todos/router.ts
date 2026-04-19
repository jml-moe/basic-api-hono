import { Hono } from "hono";
import { prisma } from "../../utils/prisma.js";
import { zValidator } from "@hono/zod-validator";
import { CreateTodoSchema, UpdateTodoSchema } from "./schema.js";

export const todoRouter = new Hono()

  //REST
  .get("/", async (c) => {
    const todos = await prisma.todo.findMany();

    return c.json(todos);
  })

  .get("/:id", async (c) => {
    const id = c.req.param("id");

    const todo = await prisma.todo.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!todo) {
      return c.json({ message: "Todo Not Found" }, 404);
    }

    return c.json(todo);
  })

  .post("/", zValidator("json", CreateTodoSchema), async (c) => {
    const body = c.req.valid("json");

    const newTodo = await prisma.todo.create({
      data: {
        content: body.content,
      },
    });

    return c.json(newTodo, 201);
  })

  .patch("/:id", zValidator("json", UpdateTodoSchema), async (c) => {
    const id = c.req.param("id");
    const body = c.req.valid("json");

    const updatedTodo = await prisma.todo.update({
      where: {
        id: Number(id),
      },
      data: {
        content: body.content,
      },
    });

    return c.json(updatedTodo);
  })

  .delete("/:id", async (c) => {
    const id = c.req.param("id");

    await prisma.todo.delete({
      where: {
        id: Number(id),
      },
    });

    return c.json({ message: "Todo is deleted Succesfully!" });
  })

  // Bisa buat action (always post) -> always VERB
  .post("/:id/mark-as-done", async (c) => {
    const id = c.req.param("id");

    const updatedTodo = await prisma.todo.update({
      where: {
        id: Number(id),
      },
      data: {
        isDone: true,
      },
    });

    return c.json(updatedTodo);
  });
