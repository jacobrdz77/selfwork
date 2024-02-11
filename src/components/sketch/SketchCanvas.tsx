import { useState, useEffect } from "react";
import {
  AppState,
  BinaryFiles,
  ExcalidrawImperativeAPI,
} from "@excalidraw/excalidraw/types/types";
import { useUpdateSketch } from "@/hooks/SketchHooks";
import { getSceneVersion, serializeAsJSON } from "@excalidraw/excalidraw";
import dynamic from "next/dynamic";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import { debounce } from "@/utils/debounce";
import { SketchCanvasState } from "@/types/types";
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
  const [excalidrawAPI, setExcalidrawAPI] =
    useState<ExcalidrawImperativeAPI | null>(null);
  const { mutate: updateSketch } = useUpdateSketch(sketchId);

  useEffect(() => {
    console.log("Excalidraw API initialized");
    console.log({
      Elements: excalidrawAPI?.getSceneElements()!,
      State: excalidrawAPI?.getAppState()!,
      Files: excalidrawAPI?.getFiles()!,
    });
  }, [excalidrawAPI]);

  // const [isSaved, setIsSaved] = useState(false);
  // const [localElements, setLocalElements] = useState(
  //   sketch ? sketch.elements : []
  // );

  const combineCanvasData = () => {
    const json = serializeAsJSON(
      excalidrawAPI?.getSceneElements()!,
      excalidrawAPI?.getAppState()!,
      excalidrawAPI?.getFiles()!,
      "database"
    );
    return JSON.parse(json);
  };

  const saveToDB = () => {
    debounce(() => {
      const data = combineCanvasData();
      updateSketch({ canvasState: data });
    }, 500);
  };

  const onChange = (
    elements: readonly ExcalidrawElement[],
    appState: AppState,
    files: BinaryFiles
  ) => {
    // Todo: Save if version changes
    // console.log(
    //   "Verison: ",
    //   getSceneVersion(excalidrawAPI?.getSceneElements()!)
    // );
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

  return (
    <div className="sketch-canvas">
      {Excalidraw && (
        <Excalidraw
          excalidrawAPI={(api) => setExcalidrawAPI(api)}
          onChange={onChange}
          initialData={{
            elements: canvasState.elements,
            appState: canvasState.appState,
            version: canvasState.version,
            scrollToContent: true,
          }}
          theme="dark"
        />
      )}

      <div
        className="state-button button"
        onClick={() => {
          // updateSketch({ elements: makeElementsJSON() });
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
          updateSketch({ canvasState: combineCanvasData() });
        }}
      >
        Save to backend
      </div>
    </div>
  );
};

export default SketchCanvas;
