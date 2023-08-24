import { serializeAsJSON, MainMenu } from "@excalidraw/excalidraw";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import {
  AppState,
  BinaryFileData,
  ExcalidrawImperativeAPI,
  ExcalidrawInitialDataState,
  PointerDownState as ExcalidrawPointerDownState,
} from "@excalidraw/excalidraw/types/types";
import { useState, useEffect } from "react";
const Sketch = () => {
  const [excalidrawAPI, setExcalidrawAPI] =
    useState<ExcalidrawImperativeAPI | null>(null);

  const makeJSON = () => {
    const json = serializeAsJSON(
      excalidrawAPI?.getSceneElements()!,
      excalidrawAPI?.getAppState()!,
      excalidrawAPI?.getFiles()!,
      "local"
    );
    console.log("JSON: ", json);
  };

  const [Excalidraw, setExcalidraw] = useState(null);
  useEffect(() => {
    import("@excalidraw/excalidraw").then((comp) =>
      setExcalidraw(comp.Excalidraw)
    );
  }, []);

  return (
    <>
      {/* {Excalidraw && (
        <Excalidraw
          ref={(api) => setExcalidrawAPI(api)}
          onChange={(elements: ExcalidrawElement, state) => {
            // console.info("Elements :", elements, "State : ", state);
          }}
          theme="dark"
          name="Custom name of drawing"
        />
      )} */}

      <div
        className="json-btn button"
        onClick={() => {
          makeJSON();
        }}
      >
        Export to JSON
      </div>
    </>

    // @ts-ignore
    //     <div suppressHydrationWarning={true}>

    //     <MainMenu>
    //       <MainMenu.Item
    //         onSelect={() => {
    //           makeJSON();
    //         }}
    //       >
    //         custom item
    //       </MainMenu.Item>
    //       {/* <MainMenu.DefaultItems.LiveCollaborationTrigger
    //       isCollaborating={isCollaborating}
    //       onSelect={() => window.alert("You clicked on collab button")}
    //     /> */}
    //     </MainMenu>
    //   </Excalidraw>
    // </div>
  );
};

export default Sketch;
