"use client";

import Script from "next/script";
import { FC } from "react";

export const WasmScript: FC = () => {
  return (
    <Script
      src="./wasm_exec.js"
      id="wasm"
      onLoad={() => {
        async function init() {
          const go = new Go();
          // 後ほどOAuthで取得したトークンを設定する
          go.env["GITHUB_NIPPOU_USER"] = "MH4GF"; // 自分の名前
          go.env["GITHUB_NIPPOU_ACCESS_TOKEN"] = "..."; // トークン

          const result = await WebAssembly.instantiateStreaming(
            fetch("main.wasm"),
            go.importObject
          );
          go.run(result.instance);
        }
        init();
      }}
    ></Script>
  );
};
