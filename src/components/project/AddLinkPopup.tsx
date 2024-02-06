import { useCreateLink } from "@/hooks/LinkHook";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { z } from "zod";

const checkURL = z.string().url();

const AddLinkPopup = ({
  menuRef,
  setIsOpen,
  projectId,
}: {
  menuRef: React.Ref<HTMLDivElement>;
  setIsOpen: (isOpen: boolean) => void;
  projectId: string;
}) => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [urlError, setUrlError] = useState(false);
  const { mutateAsync: createLink } = useCreateLink();

  useEffect(() => {
    // const currentURL = new URL(url);
    if (name.length > 0 && url.length > 0) {
      setIsDisabled(false);
    }
  }, [name, url]);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    try {
      if (checkURL.parse(url)) {
        setUrlError(false);
        const link = await createLink({
          name,
          url,
          projectId,
        });
        toast.success(`Created new link: ${name}`);
        setIsOpen(false);
      } else {
        setUrlError(true);
        return;
      }
    } catch (error) {
      console.log("ErRROR");
      setUrlError(true);
    }
  };

  return (
    <div ref={menuRef} className="project-resources__add-modal">
      <form onSubmit={submitHandler} className="project-resources__add-form">
        <label className="label" htmlFor="name">
          Resource name{" "}
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            autoComplete="off"
            className="input"
            type="text"
            id="name"
            maxLength={40}
          />
        </label>
        <label className="label" htmlFor="link">
          Add a link to a resource
          <input
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
            autoComplete="off"
            id="link"
            type="text"
            placeholder="https://youtube.com"
            className={`input ${urlError ? "input--error" : ""}`}
          />
        </label>
        {urlError && <p className="error">Please provide a valid URL </p>}
        <button
          type="submit"
          className={`submit-button ${
            isDisabled ? "submit-button--disabled" : null
          } ${urlError ? "submit-button--error" : ""}`}
          disabled={isDisabled}
        >
          Add link
        </button>
      </form>
    </div>
  );
};

export default AddLinkPopup;
