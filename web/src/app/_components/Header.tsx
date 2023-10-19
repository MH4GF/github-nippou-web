import { Session } from "next-auth";
import { FC } from "react";
import { Button } from ".";
import Link from "next/link";

type UserInfoProps = {
  login: string;
  image: string;
};

const Loading = () => {
  return (
    <svg
      className="w-8 h-8 text-slate-400 animate-pulse"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
    </svg>
  );
};

const UserInfo: FC<UserInfoProps> = ({ login, image }) => {
  return (
    <>
      <span className="text-slate-700">{login}</span>
      <img
        className="h-8 w-8 rounded-full relative flex rounded-full bg-white text-sm"
        src={image}
        alt=""
      />
    </>
  );
};

const UnAuthenticated = () => {
  return (
    <>
      <span className="text-slate-700">You are not signed in</span>
      <Link href="api/auth/signin">
        <Button>Sign in</Button>
      </Link>
    </>
  );
};

type Props = {
  data: Session | null;
  isUnAuthenticated: boolean;
};

export const Header: FC<Props> = ({ data, isUnAuthenticated }) => {
  const login = data?.user.login;
  const image = data?.user.image;

  return (
    <nav className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                github-nippou
              </h2>
            </div>
          </div>
          <div className="sm:ml-6 sm:flex sm:items-center gap-2">
            {isUnAuthenticated ? (
              <UnAuthenticated />
            ) : login && image ? (
              <UserInfo login={login} image={image} />
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};