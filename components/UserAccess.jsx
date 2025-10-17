import { useSession, signIn, signOut } from "next-auth/react";
import styled from "styled-components";

import MultiwayButton from "./Buttons/MultiwayButton";

export default function UserAccess() {
  const { data: session } = useSession();

  if (session) {
    const firstName = session.user.name.split(" ")[0] || "User";
    return (
      <LoginStatus>
        <p>Signed in as {firstName}</p>
        <MultiwayButton
          $variant="secondary"
          onClick={() => signOut()}
          buttonText="Sign out"
        />
      </LoginStatus>
    );
  }
  return (
    <LoginStatus>
      <p>Please sign in to create new entries</p>
      <MultiwayButton
        $variant="primary"
        onClick={() => signIn()}
        buttonText="Sign in"
      />
    </LoginStatus>
  );
}

const LoginStatus = styled.div`
  text-align: center;
  margin: 48px 0 24px;
`;
