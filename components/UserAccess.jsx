import { useSession, signIn, signOut } from "next-auth/react";

export default function UserAccess() {
  const { data: session } = useSession();

  if (session) {
    const firstName = session.user.name.split(" ")[0] || "User";
    return (
      <>
        Signed in as {firstName} <br />
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
