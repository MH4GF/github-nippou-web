"use server";

import { getServerSession } from "../_auth/getServerSession";

export const showList = async () => {
  console.log("showList");
  const session = await getServerSession();
  const user = session?.user.login;
  const token = session?.user.accessToken;
  if (user === undefined || token === undefined) {
    return { result: "error" };
  }

  const url = new URL(process.env.API_URL);
  url.searchParams.set("user", user);
  url.searchParams.set("token", token);
  const response = await fetch(url);
  const json = await response.json();
  return { result: json.result };
};
