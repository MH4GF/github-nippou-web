import { serve } from "https://deno.land/std/http/server.ts";
import { Hono } from "https://deno.land/x/hono@v3.7.6/mod.ts";

import "./wasm_exec.js";

const app = new Hono();

app.get("/", (c) => c.text("Hello! Hono!"));

// @ts-ignore: todo
const go = new Go();
const buf = await Deno.readFile("./web-deno/main.wasm");
const { instance } = await WebAssembly.instantiate(buf, go.importObject);
go.env["GITHUB_NIPPOU_USER"] = "MH4GF";
go.env["GITHUB_NIPPOU_ACCESS_TOKEN"] = Deno.env.get(
  "GITHUB_NIPPOU_ACCESS_TOKEN"
);
go.run(instance);

// @ts-ignore: todo
GithubNippou();

serve(app.fetch);
