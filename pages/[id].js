import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import styled from "styled-components";
import Head from "next/head";
import Image from "next/image";

import BackButton from "@/components/Buttons/BackButton";
import Bookmark from "@/components/Bookmark";
import EntryForm from "@/components/Forms/EntryForm";
import Modal from "@/components/Modal";
import MultiwayButton from "@/components/Buttons/MultiwayButton";
import IntensityScale from "@/components/IntensityScale";
import EmotionChips from "@/components/Lists/EmotionChips";
import Loading from "@/components/Loading";
import Error from "@/components/Error";

export default function EntryPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();

  const {
    data: entry,
    isLoading,
    error,
  } = useSWR(id ? `/api/entries/${id}` : null, { fallbackData: {} });
  const userOwnsEntry = session?.user?.id && entry?.owner === session?.user?.id;

  const [mode, setMode] = useState("default");

  if (!id) {
    return;
  }

  if (!router.isReady || isLoading) return <Loading />;

  if (error) return <Error errorText="Failed to load entries." />;

  const formattedDate = new Date(entry.dateTime).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  async function editEntry(formValues) {
    const payload = {
      emotions: formValues.emotions || [],
      intensity: Number(formValues.intensity),
      notes: formValues.notes?.trim() || "",
      dateTime: new Date(formValues.dateTime).toISOString(),
      ...(formValues.imageUrl ? { imageUrl: formValues.imageUrl } : {}),
      ...(formValues.imagePublicId
        ? { imagePublicId: formValues.imagePublicId }
        : {}),
    };
    const response = await fetch(`/api/entries/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      router.push("/");
    }
  }

  async function deleteEntry() {
    const response = await fetch(`/api/entries/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      router.push("/");
    }
  }

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="View the details of an entry on the Emu App."
        ></meta>
        <title> Details Page</title>
      </Head>

      <HeaderWrapper>
        <BackButton />
        <h2>on {formattedDate}</h2>
        <h3>I was feeling...</h3>
      </HeaderWrapper>

      <DetailWrapper>
        {userOwnsEntry && (
          <BookmarkWrapper>
            <Bookmark id={id} />
          </BookmarkWrapper>
        )}
        <IntensityContainer>
          <IntensityScale intensity={entry.intensity} />
          <p>Intensity</p>
        </IntensityContainer>
        <EmotionContainer aria-labelledby="emotion-types">
          <StyledEmotionChips type={entry.emotions} />
        </EmotionContainer>
        <NotesCard>
          <h4>My notes: </h4>
          <p>{entry.notes}</p>
        </NotesCard>
        {entry.imageUrl && (
          <StyledImage
            src={entry.imageUrl}
            alt="Entry image"
            width={600}
            height={400}
            quality={70}
            style={{ borderRadius: 12, objectFit: "cover" }}
            priority
          />
        )}
        {userOwnsEntry && (
          <ButtonContainer>
            {mode === "default" && (
              <>
                <MultiwayButton
                  onClick={() => setMode("edit")}
                  $variant="primary"
                  buttonText="Edit entry"
                />
                <MultiwayButton
                  onClick={() => setMode("delete")}
                  $variant="secondary"
                  buttonText="Delete entry"
                />
              </>
            )}
          </ButtonContainer>
        )}
      </DetailWrapper>

      {mode === "delete" && (
        <Modal title="Delete entry" onClose={() => setMode("default")}>
          <ModalText>Are you sure you want to delete the entry?</ModalText>
          <ButtonBox>
            <MultiwayButton
              onClick={() => setMode("default")}
              $variant="secondary"
              buttonText="Cancel"
            />
            <MultiwayButton
              onClick={deleteEntry}
              $variant="primary"
              buttonText="Delete"
            />
          </ButtonBox>
        </Modal>
      )}
      {mode === "edit" && (
        <Modal title="Edit Entry" onClose={() => setMode("default")}>
          <EntryForm
            buttonText={"Update"}
            initialValues={entry}
            onSubmit={editEntry}
            formTitle={"Edit Entry"}
            type="button"
          ></EntryForm>
          <MultiwayButton
            onClick={() => setMode("default")}
            $variant="secondary"
            buttonText="Cancel"
          />
        </Modal>
      )}
    </>
  );
}

const HeaderWrapper = styled.header`
  padding: 24px;

  background-size: 100% 100%;
  background-position: 0px 0px, 0px 0px, 0px 0px, 0px 0px, 0px 0px, 0px 0px,
    0px 0px, 0px 0px, 0px 0px, 0px 0px, 0px 0px;
  background-image: radial-gradient(
      30% 30% at 15% 32%,
      #ffd9d9ff 7%,
      #073aff00 100%
    ),
    radial-gradient(18% 28% at 18% 71%, #c6c6c6ff 6%, #073aff00 100%),
    radial-gradient(70% 53% at 36% 76%, #c1ebc5 20%, #073aff00 100%),
    radial-gradient(42% 53% at 15% 94%, #d5d7ff 7%, #073aff00 100%),
    radial-gradient(42% 53% at 27% 121%, #cce8ff 7%, #073aff00 100%),
    radial-gradient(18% 28% at 35% 87%, #ffe9bd 7%, #073aff00 100%),
    radial-gradient(31% 59% at 7% 98%, #ffd9f4 30%, #073aff00 100%),
    radial-gradient(21% 37% at 72% 23%, #fff4af 24%, #073aff00 100%),
    radial-gradient(35% 56% at 91% 74%, #cce8ff 9%, #073aff00 100%),
    radial-gradient(74% 86% at 67% 38%, #ffe9bdff 24%, #073aff00 100%),
    linear-gradient(125deg, #b7daffff 0%, #a996ffff 100%);

  h2 {
    text-align: center;
    font-weight: 500;
    margin: 36px 0 8px;
    font-size: 16px;
    color: var(--color-primary);
  }

  h3 {
    font-family: "Jost", sans-serif;
    font-size: 28px;
    font-weight: 350;
    text-align: center;
    margin: 0 0 36px;
  }
`;

const DetailWrapper = styled.article`
  position: relative;
  padding: 64px 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const BookmarkWrapper = styled.div`
  position: absolute;
  top: -30px;
  right: 30px;
  padding: 12px;
  border-radius: 28px;
  background-color: #fff;
  border: 6px solid var(--color-light);

  button {
    padding: 0 3px;
    width: 36px;
    height: 36px;
  }
`;

const IntensityContainer = styled.div`
  text-align: center;
  p {
    color: var(--color-primary);
    font-family: "Jost", sans-serif;
    margin: 12px 20px 0 0;
  }
`;

const EmotionContainer = styled.div``;
const StyledEmotionChips = styled(EmotionChips)`
  justify-content: center;
`;

const NotesCard = styled.section`
  padding: 24px;
  margin: 36px 0;
  background-color: white;
  border-radius: 15px;
  filter: drop-shadow(0px 3px 10px rgba(0, 0, 0, 0.08));
  h4 {
    font-weight: bold;
    margin: 0 0 8px 0;
  }
  p {
    margin: 0;
  }
`;

const StyledImage = styled(Image)`
  max-width: 100%;
  height: auto;
  align-self: center;
`;

const ButtonContainer = styled.section.attrs({ "aria-label": "Entry actions" })`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
  align-items: center;
  margin-top: 72px;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
`;

const ModalText = styled.p`
  font-weight: bold;
  color: var(--color-dark);
  text-align: center;
  font-size: 21px;
  margin: 0 0 32px 0;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  border-radius: 12px;
  overflow: hidden;
  padding-bottom: 66.6%;
`;

const UploadImage = styled(Image)`
  border-radius: 12px;
  object-fit: contain;
  display: block;
  margin: 0 auto;
`;
