export { };
// import { useState, useEffect } from "react";
// import { useSketch, useUpdateSketch } from "@/hooks/SketchHooks";
// import { serializeAsJSON } from "@excalidraw/excalidraw";
// import {
//   ExcalidrawElement,
//   NonDeletedExcalidrawElement,
// } from "@excalidraw/excalidraw/types/element/types";
// import {
//   AppState,
//   ExcalidrawImperativeAPI,
// } from "@excalidraw/excalidraw/types/types";

// export const getNonDeletedElements = (elements: any[]) =>
//   elements.filter(
//     (element) => !element.isDeleted
//   ) as readonly NonDeletedExcalidrawElement[];

// type SketchProps = {
//   sketchId: string;
// };

// const Sketch = ({ sketchId }: SketchProps) => {
//   const [Excalidraw, setExcalidraw] = useState(null);
//   const [excalidrawAPI, setExcalidrawAPI] =
//     useState<ExcalidrawImperativeAPI | null>(null);

//   //**** Sketch Hooks
//   const { sketch, status } = useSketch(sketchId);
//   const { mutate, isLoading: isUpdating } = useUpdateSketch(sketchId);

//   //**** Local State
//   const [name, setName] = useState("");
//   const [isSaved, setIsSaved] = useState(false);
//   const [localElements, setLocalElements] = useState(
//     sketch ? sketch.elements : []
//   );

//   console.log("Local: ", localElements);

//   const makeElementsJSON = () => {
//     const json = serializeAsJSON(
//       excalidrawAPI?.getSceneElements()!,
//       excalidrawAPI?.getAppState()!,
//       excalidrawAPI?.getFiles()!,
//       "database"
//     );
//     // console.log(
//     //   "Converted Elements to JSON: ",
//     //   JSON.stringify(JSON.parse(json).elements)
//     // );
//     return JSON.parse(json).elements;
//   };

//   useEffect(() => {
//     import("@excalidraw/excalidraw").then((comp) =>
//       // @ts-ignore
//       setExcalidraw(comp.Excalidraw)
//     );
//     return () => {
//       setExcalidraw(null);
//     };
//   }, []);

//   useEffect(() => {
//     if (sketch) {
//       setLocalElements(sketch.elements);
//     }
//   }, [sketch]);
//   console.log("Sv: ", isSaved);

//   if (status === "error") {
//     return (
//       <div className="project-page__sketch">
//         <h1>Error</h1>
//         <p>Try to refresh the page.</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       {Excalidraw && status === "success" && (
//         // @ts-ignore
//         <Excalidraw
//           ref={(api) => setExcalidrawAPI(api)}
//           onChange={(elements: ExcalidrawElement, state: AppState) => {
//             // console.info("Elements :", elements, "State : ", state);
//             setLocalElements(elements);
//           }}
//           initialData={{
//             elements: localElements,
//             scrollToContent: true,
//           }}
//           theme="dark"
//         />
//       )}

//       <div
//         className="json-btn button"
//         onClick={() => {
//           mutate({ elements: makeElementsJSON() });
//           setIsSaved(true);
//         }}
//       >
//         {isSaved && !isUpdating ? "Saved" : "Unsaved"}
//         {isUpdating && "Saving..."}
//       </div>
//     </>

//     // @ts-ignore
//     //     <div suppressHydrationWarning={true}>

//     //     <MainMenu>
//     //       <MainMenu.Item
//     //         onSelect={() => {
//     //           makeJSON();
//     //         }}
//     //       >
//     //         custom item
//     //       </MainMenu.Item>
//     //       {/* <MainMenu.DefaultItems.LiveCollaborationTrigger
//     //       isCollaborating={isCollaborating}
//     //       onSelect={() => window.alert("You clicked on collab button")}
//     //     /> */}
//     //     </MainMenu>
//     //   </Excalidraw>
//     // </div>
//   );
// };

// export default Sketch;
