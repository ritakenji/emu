import { useState, useEffect } from "react";
import useSWR from "swr";
import styled from "styled-components";
import MultiwayButton from "../Buttons/MultiwayButton";
import Image from "next/image";

import { toLocalDateTime } from "@/utils/helpers";

export default function EntryForm({
  onSubmit,
  buttonText,
  initialValues,
  formTitle,
}) {
  const [selectedTypes, setSelectedTypes] = useState(
    initialValues?.emotions || []
  );
  useEffect(() => {
    setSelectedTypes(initialValues?.emotions || []);
  }, [initialValues]);

  const [isUploading, setIsUploading] = useState(false);
  const {
    data: emotions,
    isLoading,
    error,
  } = useSWR("/api/emotions", {
    fallbackData: [],
  });

  const isSelected = (_id) => {
    return selectedTypes.some((selectedEmotion) => selectedEmotion._id === _id);
  };

  if (isLoading) {
    return (
      <p role="status" aria-live="polite">
        Loading...
      </p>
    );
  }

  if (error) {
    return (
      <>
        <p aria-live="assertive">
          Sorry, we could not retrieve the entry data at the moment.
        </p>
        <p aria-live="assertive">Please try again later.</p>
      </>
    );
  }

  if (!emotions) {
    return;
  }

  function handleCheckbox(event) {
    const { value: _id, checked } = event.target;
    const selectedEmotionObject = emotions.find((e) => e._id === _id);

    if (checked && selectedEmotionObject && !isSelected(_id)) {
      setSelectedTypes((prev) => [...prev, selectedEmotionObject]);
    } else if (!checked) {
      setSelectedTypes((prev) => prev.filter((e) => e._id !== _id));
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const newObject = {
      emotions: [...selectedTypes],
      ...data,
    };
    if (selectedTypes.length === 0) {
      alert("Please select at least one emotion.");
      return;
    }

    if (!data.dateTime) {
      alert("Please select date and time.");
      return;
    }
    const file = formData.get("image");
    if (file && file instanceof File && file.size > 0) {
      setIsUploading(true);
      try {
        const uploadData = new FormData();
        uploadData.append("file", file);
        const res = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });
        if (!res.ok) {
          const msg = await res.text().catch(() => res.statusText);
          throw new Error(`Upload failed (${res.status}): ${msg}`);
        }
        const { secure_url, url, public_id } = await res.json();
        newObject.imageUrl = secure_url || url;
        newObject.imagePublicId = public_id;
      } catch (e) {
        alert(`Image upload failed. ${e?.message || ""}`);
        setIsUploading(false);
        return;
      }
      setIsUploading(false);
    }

    onSubmit(newObject);
  }

  const ticks = [];
  for (let i = 1; i <= 10; i += 1) {
    ticks.push(i);
  }

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h2>{formTitle}</h2>
      <Fieldset aria-required="true">
        <Legend>Type *</Legend>
        <OptionsList>
          {emotions.map(({ emotion, _id }) => {
            const inputId = `emotion-${_id}`;
            return (
              <li key={_id}>
                <Checkbox
                  onChange={handleCheckbox}
                  id={inputId}
                  name="type"
                  type="checkbox"
                  value={_id}
                  checked={isSelected(_id)}
                />
                <Label htmlFor={inputId}>{emotion}</Label>
              </li>
            );
          })}
        </OptionsList>
      </Fieldset>
      <Label htmlFor="intensity" aria-required="true">
        Intensity *
      </Label>
      <Range
        id="intensity"
        name="intensity"
        type="range"
        min="1"
        max="10"
        step="1"
        defaultValue={initialValues?.intensity ?? 5}
        list="intensity-ticks"
        required
        aria-describedby="intensity-help"
      />
      <datalist id="intensity-ticks">
        {ticks.map((t) => (
          <option key={t} value={t} label={String(t)} />
        ))}
      </datalist>
      <StyledRange>
        {ticks.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </StyledRange>
      <Label htmlFor="notes">Notes</Label>
      <Textarea
        id="notes"
        name="notes"
        placeholder="Today I feel …"
        defaultValue={initialValues?.notes}
        rows={4}
      />
      {initialValues?.imageUrl && (
        <Image
          src={initialValues.imageUrl}
          alt="Entry image"
          width={600}
          height={400}
          style={{ borderRadius: 12, objectFit: "cover" }}
          priority
        />
      )}
      <Label htmlFor="image">Photo (optional)</Label>
      <Input id="image" name="image" type="file" accept="image/*" />
      <Label htmlFor="dateTime" aria-required="true">
        Date and Time *
      </Label>
      <Input
        id="dateTime"
        name="dateTime"
        type="datetime-local"
        defaultValue={toLocalDateTime(initialValues?.dateTime)}
      />

      <MultiwayButton
        type="submit"
        $variant="primary"
        buttonText={isUploading ? "Uploading…" : buttonText}
        disabled={isUploading}
      />
    </FormContainer>
  );
}

const FormContainer = styled.form`
  display: grid;
  gap: 0.5rem;
  /* background-color: #fff;
  padding: 36px 24px 44px;
  margin: 36px 0 48px;
  filter: drop-shadow(0px 3px 10px rgba(0, 0, 0, 0.08));
  border-radius: 20px; */

  h2 {
    text-align: center;
    font-family: "Inter", sans-serif;
    font-size: 20px;
    font-weight: 700;
    margin: 0 0 8px;
  }

  button {
    margin-top: 24px;
    justify-self: center;
  }
`;

const Legend = styled.legend`
  font-weight: bold;
  margin: 16px 0;
`;
const Label = styled.label`
  font-weight: bold;
  margin: 24px 0 6px;
`;

const Fieldset = styled.fieldset`
  border: 0;
  padding: 0;
  margin: 0;
`;

const OptionsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 16px 12px;
  list-style: none;
  padding: 0;
  margin: 0;

  label {
    font-weight: 400;
  }
`;

const Textarea = styled.textarea`
  padding: 16px;
  font-size: inherit;
  border: none;
  border-radius: 0.5rem;
  background-color: var(--color-light);
`;
const Input = styled.input`
  padding: 16px;
  font-size: inherit;
  border: none;
  border-radius: 0.5rem;
  background-color: var(--color-light);
`;

const Checkbox = styled(Input)`
  margin-right: 0.35rem;
`;

const Range = styled.input`
  width: 100%;
`;

const StyledRange = styled.div`
  display: flex;
  justify-content: space-between;
  margin: -5px -2px 0 4px;
`;
