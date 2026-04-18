import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { productRouter } from "./modules/products/router.js";
import { reviewRouter } from "./modules/reviews/router.js";
import { todoRouter } from "./modules/todos/router.js";

// app.method(path, handler)

const app = new Hono()
  .route("/products", productRouter) // bukan controlller, tapi buat merging route
  .route("/reviews", reviewRouter)
  .route("/todos", todoRouter);

serve(
  {
    fetch: app.fetch,
    port: 8000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
