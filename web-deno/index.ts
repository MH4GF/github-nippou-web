import { serve } from "https://deno.land/std/http/server.ts";
import { Hono } from "https://deno.land/x/hono@v3.7.6/mod.ts";

import "./wasm_exec.js";

const buf = await Deno.readFile("./web-deno/main.wasm");

const app = new Hono();

app.get("/", async (c) => {
  // console.log({ header: c.req.raw.headers });
  const token = c.req.header("Authorization");
  if (token === undefined) {
    return c.json({ error: "no token" }, 401);
  }
  // @ts-ignore: todo
  const go = new Go();
  const { instance } = await WebAssembly.instantiate(buf, go.importObject);
  go.env["GITHUB_NIPPOU_USER"] = "MH4GF";
  go.env["GITHUB_NIPPOU_ACCESS_TOKEN"] = token;
  go.run(instance);
  // @ts-ignore: todo
  const result = await GithubNippou().catch((e) => {
    console.error("error:", e);
    return c.json({ error: e }, 500);
  });

  return c.json({ result });
});

serve(app.fetch);
