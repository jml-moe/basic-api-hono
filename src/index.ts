import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

// app.method(path, handler)

app.get("/products", (c) => {
  return c.json({ products: [] });
});

//dynamice route
app.get("/products/:id", (c) => {
  const productId = c.req.param("id");
  console.log(productId);

  return c.json({ product: {} });
});

app.post("/products", (c) => {
  return c.json({ message: "Product Created Succesfully!" });
});

serve(
  {
    fetch: app.fetch,
    port: 8000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
