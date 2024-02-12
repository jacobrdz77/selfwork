import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  AppState,
  BinaryFiles,
  ExcalidrawImperativeAPI,
} from "@excalidraw/excalidraw/types/types";
import { useUpdateSketch } from "@/hooks/SketchHooks";
import { getSceneVersion, serializeAsJSON } from "@excalidraw/excalidraw";
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
  const { mutateAsync: updateSketch } = useUpdateSketch(sketchId);
  const [canvasVersion, setCanvasVersion] = useState<number | null>(null);
  // const [isSaving, setIsSaving] = useState(false);
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
    // setIsSaving(true);
    const save = debounce(async () => {
      const data = combineCanvasData();
      await updateSketch({
        canvasState: {
          ...data,
          canvasVersion: getSceneVersion(excalidrawAPI?.getSceneElements()!),
        },
      });
      // setIsSaving(false);
    }, 2000);

    save();
  };

  const onChange = (
    elements: readonly ExcalidrawElement[],
    appState: AppState,
    files: BinaryFiles
  ) => {
    setCanvasVersion(getSceneVersion(elements));
  };

  useEffect(() => {
    if (excalidrawAPI) {
      setCanvasVersion(getSceneVersion(excalidrawAPI?.getSceneElements()!));
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
      console.log("Version:", canvasVersion);

      // Todo: To not make it update in first load.
      // saveToDB();
    }
  }, [canvasVersion, excalidrawAPI]);

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
          console.log("Saving");
          saveToDB();
          // updateSketch({ canvasState: combineCanvasData() });
        }}
      >
        Save to backend
      </div>
    </div>
  );
};

export default SketchCanvas;
