"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { Button } from "./_components";
import { showList } from "./showList";
import {
  experimental_useFormState as useFormState,
  experimental_useFormStatus as useFormStatus,
} from "react-dom";
import Link from "next/link";

function SubmitButton() {
  const { status } = useSession();
  const isLoading = status === "loading";
  const isUnAuthenticated = status === "unauthenticated";
  const { pending } = useFormStatus();

  return (
    <>
      {isUnAuthenticated && (
        <Link href="/api/auth/signin" className="hover:underline">ログインしてください</Link>
      )}
      <Button
        isLoading={isLoading || pending}
        type="submit"
        disabled={isUnAuthenticated}
      />
    </>
  );
}

function Home() {
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

export default function Page() {
  return (
    <SessionProvider>
      <Home />
    </SessionProvider>
  );
}
