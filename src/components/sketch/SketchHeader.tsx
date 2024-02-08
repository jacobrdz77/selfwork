import useMenu from "@/hooks/useMenu";
import React, { useEffect, useRef, useState } from "react";

type Props = {
  name: string;
};

const SketchHeader = ({ name }: Props) => {
  const { btnRef, isMenuOpen, menuRef, setIsMenuOpen } = useMenu();
  const [newTaskName, setNewTaskName] = useState("");
  const [oldName, setOldName] = useState(name);
  const [sketchInputName, setSketchInputName] = useState(name);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef(null);
  const [widthOfInput, setWidthOfInput] = useState("");

  const focusOnInput = () => {
    // @ts-ignore
    inputRef.current!.focus();
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    let trimmedName = e.currentTarget.value.trim();
    if (trimmedName.length === 0) {
      trimmedName = "Untitled sketch";
    }
    if (oldName === trimmedName) {
      setSketchInputName(trimmedName);
      setIsInputFocused(false);
      return;
    } else {
      // updateSketch({
      //   sketchId: sketch.id,
      //   sketchData: { name: trimmedName },
      // });
      setSketchInputName(trimmedName);
      setOldName(trimmedName);
    }
    // Switches to display button
    setIsInputFocused(false);
  };

  useEffect(() => {
    const adjustInputSize = () => {
      if (sketchInputName.length < 1) {
        setWidthOfInput(sketchInputName.length + 3 + "ch");
      } else {
        setWidthOfInput(sketchInputName.length + "ch");
      }
    };
    adjustInputSize();
  }, [sketchInputName]);

  useEffect(() => {
    if (isInputFocused === true) {
      focusOnInput();
    }
  }, [isInputFocused]);

  return (
    <div className="sketch-header">
      <div className="left-container">
        <div className="sketch-header__logo">
          {"s"}
          <span className="sketch-header__logo--dot">.</span>
        </div>
        <div className="name">
          {isInputFocused ? (
            <input
              ref={inputRef}
              className="name-input"
              autoComplete="off"
              type="text"
              name="name"
              placeholder="New Sketch"
              value={sketchInputName}
              onChange={(e) => {
                setSketchInputName(e.currentTarget.value);
              }}
              onBlur={handleInputBlur}
              maxLength={100}
              style={{
                width: widthOfInput,
                // minWidth: 122,
              }}
            />
          ) : (
            <div
              className="input-placeholder"
              role="button"
              onClick={() => {
                setIsInputFocused(true);
              }}
            >
              {sketchInputName}
            </div>
          )}
        </div>
        <div className={`more-btn-container ${isMenuOpen ? "active" : ""}`}>
          <div
            ref={btnRef}
            onClick={(e) => {
              e.preventDefault();
              setIsMenuOpen(!isMenuOpen);
            }}
            className="more-btn"
            role="button"
          >
            <svg className="more-btn__icon" viewBox="0 0 16 16">
              <path d="M2,6C0.896,6,0,6.896,0,8s0.896,2,2,2s2-0.896,2-2S3.104,6,2,6z M8,6C6.896,6,6,6.896,6,8s0.896,2,2,2s2-0.896,2-2  S9.104,6,8,6z M14,6c-1.104,0-2,0.896-2,2s0.896,2,2,2s2-0.896,2-2S15.104,6,14,6z" />
            </svg>
          </div>
          {isMenuOpen && (
            <div
              className={`menu ${isMenuOpen ? "menu--active" : ""}`}
              ref={menuRef}
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <div
                className="item"
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              >
                Save to disk
              </div>
              <div
                className="item"
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              >
                Export as image
              </div>
              <div
                className="item"
                onClick={() => {
                  // Only resets the canvas
                  // resetSketch()
                  setIsMenuOpen(false);
                }}
              >
                Reset sketch
              </div>

              <div
                className="item item--delete"
                onClick={() => {
                  // Deletes Sketch in database
                  // deleteSketch(Sketch.id);
                  setIsMenuOpen(false);
                }}
              >
                Delete sketch file
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        className="share-btn button"
        onClick={() => {
          console.log("Opens share popup");
        }}
      >
        Share
      </div>
    </div>
  );
};

export default SketchHeader;
