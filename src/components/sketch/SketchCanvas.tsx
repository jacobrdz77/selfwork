import dynamic from "next/dynamic";
import debounce from "@/utils/debounce";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useUpdateSketch } from "@/hooks/SketchHooks";
import { SketchCanvasState } from "@/types/types";
import { getSceneVersion, serializeAsJSON } from "@excalidraw/excalidraw";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import {
  AppState,
  BinaryFiles,
  ExcalidrawImperativeAPI,
} from "@excalidraw/excalidraw/types/types";
const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
  }
);

type Props = {
  sketchId: string;
  canvasState: SketchCanvasState;
};

const SketchCanvas = ({ sketchId, canvasState }: Props) => {
  const { mutate: updateSketch } = useUpdateSketch(sketchId);
  const [excalidrawAPI, setExcalidrawAPI] =
    useState<ExcalidrawImperativeAPI | null>(null);
  const initialCanvasVersionRef = useRef<number | null>(
    canvasState.canvasVersion
  );
  const [canvasVersion, setCanvasVersion] = useState<number | null>(
    canvasState.canvasVersion
  );

  const [isSaving, setIsSaving] = useState(false);
  // const [localElements, setLocalElements] = useState(
  //   sketch ? sketch.elements : []
  // );

  const combineCanvasData = useCallback(() => {
    const json = serializeAsJSON(
      excalidrawAPI?.getSceneElements()!,
      excalidrawAPI?.getAppState()!,
      excalidrawAPI?.getFiles()!,
      "database"
    );
    return JSON.parse(json);
  }, [excalidrawAPI]);

  const saveToDB = useMemo(() => {
    setIsSaving(true);
    return debounce(() => {
      const data = combineCanvasData();
      updateSketch({
        canvasState: {
          ...data,
          canvasVersion: getSceneVersion(excalidrawAPI?.getSceneElements()!),
        },
      });
    }, 2000);
  }, [combineCanvasData, updateSketch, excalidrawAPI]);

  const onChange = (
    elements: readonly ExcalidrawElement[],
    appState: AppState,
    files: BinaryFiles
  ) => {
    setCanvasVersion(getSceneVersion(elements));
  };

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      // @ts-ignore
      window.EXCALIDRAW_ASSET_PATH = "/public/assets/excalidraw-assets-dev";
    } else {
      // @ts-ignore
      window.EXCALIDRAW_ASSET_PATH = "/public/assets/excalidraw-assets";
    }
  }, []);

  useEffect(() => {
    if (excalidrawAPI) {
      console.log("Excalidraw API initialized");
      console.log({
        Elements: excalidrawAPI?.getSceneElements()!,
        State: excalidrawAPI?.getAppState()!,
        Files: excalidrawAPI?.getFiles()!,
        Version: getSceneVersion(excalidrawAPI?.getSceneElements()!),
      });
    }
  }, [excalidrawAPI]);

  useEffect(() => {
    if (excalidrawAPI) {
      // console.log("Initial version:", initialCanvasVersionRef.current);
      // console.log("Current version:", canvasVersion);
      if (initialCanvasVersionRef.current !== canvasVersion) {
        saveToDB();
      }
    }
  }, [canvasVersion, excalidrawAPI, saveToDB]);

  return (
    <div className="sketch-canvas">
      {Excalidraw && (
        <Excalidraw
          excalidrawAPI={(api) => setExcalidrawAPI(api)}
          onChange={onChange}
          initialData={{
            elements: canvasState.elements,
            appState: canvasState.appState,
            scrollToContent: true,
          }}
          theme="dark"
        />
      )}

      {/* <div
        className="state-button button"
        onClick={() => {
          console.log(combineCanvasData());
          console.log(
            "Verison: ",
            getSceneVersion(excalidrawAPI?.getSceneElements()!)
          );
        }}
      >
        Log state
      </div>
      <div
        className="save-button button"
        onClick={() => {
          console.log("Saving");
          saveToDB();
        }}
      >
        Save to backend
      </div> */}
    </div>
  );
};

export default SketchCanvas;
