import React, { useEffect, useState } from "react";

const AddLinkPopup = ({ menuRef, setIsOpen }) => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    // const currentURL = new URL(url);
    if (name.length > 0 && url.length > 0) {
      setIsDisabled(false);
    }
  }, [name, url]);

  function submitHandler(e) {
    e.preventDefault();
  }

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
          />
        </label>
        <label className="label" htmlFor="link">
          Add a link to a resource{" "}
          <input
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
            autoComplete="off"
            className="input"
            id="link"
            type="text"
            placeholder="Paste URL "
          />
        </label>
        <button
          type="submit"
          className={`submit-button ${
            isDisabled ? "submit-button--disabled" : null
          }`}
          onClick={() => {
            setIsOpen(false);
          }}
        >
          Add link
        </button>
      </form>
    </div>
  );
};

export default AddLinkPopup;
