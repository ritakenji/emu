import { useSession, signIn, signOut } from "next-auth/react";

export default function UserAccess() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <p>
      Not signed in <button onClick={() => signIn()}>Sign in</button>
    </p>
  );
}
