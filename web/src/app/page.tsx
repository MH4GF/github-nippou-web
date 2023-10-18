"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { Button } from "./_components";
import { showList } from "./showList";
import {
  experimental_useFormState as useFormState,
  experimental_useFormStatus as useFormStatus,
} from "react-dom";
import { FC } from "react";
import { Header } from "./_components/Header";

type SubmitButtonProps = {
  isLoading: boolean;
  isDisabled: boolean;
};

const SubmitButton: FC<SubmitButtonProps> = ({ isLoading, isDisabled }) => {
  const { pending } = useFormStatus();

  return (
    <Button
      isLoading={isLoading || pending}
      type="submit"
      isDisabled={isDisabled}
    >
      Run
    </Button>
  );
};

function Home() {
  const { status, data } = useSession();
  const isLoading = status === "loading";
  const isUnAuthenticated = status === "unauthenticated";
  const [state, formAction] = useFormState<{ result: string }>(showList, {
    result: "",
  });

  return (
    <div className="min-h-full">
      <Header data={data} isUnAuthenticated={isUnAuthenticated} />
      <main className="mx-auto max-w-7xl sm:px-6 lg:px-8 sm:py-4 grid gap-2">
        <form action={formAction}>
          <SubmitButton isLoading={isLoading} isDisabled={isUnAuthenticated} />
        </form>
        <label
          htmlFor="result"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Result
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
    </div>
  );
}

export default function Page() {
  return (
    <SessionProvider>
      <Home />
    </SessionProvider>
  );
}
