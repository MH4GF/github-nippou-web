"use client";

import { useCallback, useRef, useState } from "react";
import { Button } from "./_components";

export default function Home() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(async () => {
    if (!textareaRef.current) return;

    setIsLoading(true);
    // @ts-ignore
    const ret = await global.GithubNippou();
    console.log({ ret });
    textareaRef.current.value = ret;
    setIsLoading(false);
  }, []);

  return (
    <main className="mx-auto max-w-7xl sm:px-6 lg:px-8 grid gap-4">
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            github-nippou
          </h2>
        </div>
      </div>
      <Button isLoading={isLoading} onClick={handleClick} />
      <label
        htmlFor="result"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        結果
      </label>
      <textarea
        ref={textareaRef}
        name="result"
        id="result"
        rows={8}
        className="block w-full rounded-md border-0 p-1.5 text-gray-900
         shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
          focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
        defaultValue={""}
      />
    </main>
  );
}
