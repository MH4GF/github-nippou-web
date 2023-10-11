"use server";

import "./wasm_exec";
import { promises as fs } from "fs";
import path from "path";
import { getServerSession } from "../_auth/getServerSession";

export const showList = async () => {
  console.log("showList");
  const session = await getServerSession();

  // @ts-ignore
  const go = new Go();
  const buf = await fs.readFile(path.join(__dirname, "./main.wasm"));
  const { instance } = await WebAssembly.instantiate(buf, go.importObject);
  go.env["GITHUB_NIPPOU_USER"] = "MH4GF";
  go.env["GITHUB_NIPPOU_ACCESS_TOKEN"] = session?.user.accessToken;
  go.run(instance);

  // @ts-ignore
  const ret = await global.GithubNippou();

  return { result: ret };
};
