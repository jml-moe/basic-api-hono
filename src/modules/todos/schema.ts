import z from "zod";

export const CreateTodoSchema = z.object({
  content: z.string().min(1),
});
