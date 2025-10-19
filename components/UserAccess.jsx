import { useSession, signIn, signOut } from "next-auth/react";
import styled, { css } from "styled-components";

import MultiwayButton from "./Buttons/MultiwayButton";
import SimpleButton from "./Buttons/SimpleButton";
import { LogOut } from "lucide-react";

export default function UserAccess() {
  const { data: session, status } = useSession();

  if (status === "loading") return null;
  const isLoggedIn = !!session;
  return (
    <LoginStatus $fixed={isLoggedIn}>
      {isLoggedIn ? (
        <>
          <SimpleButton onClick={() => signOut()} ariaText="Log out">
            <LogOut aria-hidden="true" /> &nbsp; Log out{" "}
          </SimpleButton>
        </>
      ) : (
        <>
          <p>Please sign in to create new entries</p>
          <MultiwayButton
            $variant="primary"
            onClick={() => signIn()}
            buttonText="Sign in"
          />
        </>
      )}
    </LoginStatus>
  );
}

const LoginStatus = styled.div`
  text-align: center;
  margin: 48px 0 24px;

  ${({ $fixed }) =>
    $fixed &&
    css`
      position: fixed;
      top: 1rem;
      right: 1rem;
      margin: 0;
      text-align: right;
      z-index: 1000;
    `}
`;
