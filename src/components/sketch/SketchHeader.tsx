import { useDeleteSketch, useUpdateSketch } from "@/hooks/SketchHooks";
import useMenu from "@/hooks/useMenu";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import ToDeleteSketchModal from "./ToDeleteSketchModal";

type Props = {
  name: string;
  projectId: string;
  setIsDeleting: (boolean: boolean) => any;
};

const SketchHeader = ({ name, projectId, setIsDeleting }: Props) => {
  const router = useRouter();
  const { sketchId } = useRouter().query;
  const { btnRef, isMenuOpen, menuRef, setIsMenuOpen } = useMenu();
  const [oldName, setOldName] = useState(name);
  const [sketchInputName, setSketchInputName] = useState(name);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef(null);
  const [widthOfInput, setWidthOfInput] = useState("");

  const { mutate: updateSketch } = useUpdateSketch(sketchId as string);
  const { mutate: deleteSketch } = useDeleteSketch(sketchId as string);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteSketch = async () => {
    setIsDeleting(true);
    deleteSketch();
    router.push(`/projects/${projectId}/sketch`);
  };

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
      updateSketch({
        name: trimmedName,
      });
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
              maxLength={75}
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
        <div
          className={`more-btn-container ${isMenuOpen ? "active" : ""}`}
          ref={btnRef}
          onClick={(e) => {
            e.preventDefault();
            setIsMenuOpen(!isMenuOpen);
          }}
        >
          <div className="more-btn" role="button">
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
                className="item item--delete"
                onClick={() => {
                  setIsDeleteModalOpen(true);
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

      <ToDeleteSketchModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        deleteFunc={handleDeleteSketch}
        isDark={true}
      />
    </div>
  );
};

export default SketchHeader;
