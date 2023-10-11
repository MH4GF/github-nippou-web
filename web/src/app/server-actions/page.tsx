"use client";

import { Button } from "../_components";
import { showList } from "./showList";
import {
  experimental_useFormState as useFormState,
  experimental_useFormStatus as useFormStatus,
} from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();

  return <Button isLoading={pending} type="submit" />;
}

export default function Home() {
  const [state, formAction] = useFormState<{ result: string }>(showList, {
    result: "",
  });

  return (
    <main className="mx-auto max-w-7xl sm:px-6 lg:px-8 grid gap-4">
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            github-nippou
          </h2>
        </div>
      </div>
      <form action={formAction}>
        <SubmitButton />
      </form>
      <label
        htmlFor="result"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        結果
      </label>
      <textarea
        name="result"
        id="result"
        rows={8}
        className="block w-full rounded-md border-0 p-1.5 text-gray-900
         shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
          focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
        defaultValue={state.result}
      />
    </main>
  );
}
