import Link from "next/link";

export const LogoutButton = () => {
    return <Link href="/api/auth/logout">Log Out</Link>;
  };