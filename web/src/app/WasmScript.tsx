"use client";

import Script from "next/script";
import { FC } from "react";

type Props = {
  accessToken?: string;
};

export const WasmScript: FC<Props> = ({ accessToken }) => {
  return (
    <Script
      src="./wasm_exec.js"
      id="wasm"
      onLoad={() => {
        async function init() {
          // @ts-ignore
          const go = new Go();
          go.env["GITHUB_NIPPOU_USER"] = "MH4GF";
          go.env["GITHUB_NIPPOU_ACCESS_TOKEN"] = accessToken;

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
