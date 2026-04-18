import z from "zod";

export const CreateProductSchema = z.object({
  name: z.string().min(1),
  price: z.number(),
});
