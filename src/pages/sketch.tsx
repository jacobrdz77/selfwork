import { useState, useEffect } from "react";
const Sketch = () => {
  const [Excalidraw, setExcalidraw] = useState(null);
  useEffect(() => {
    import("@excalidraw/excalidraw").then((comp) =>
      setExcalidraw(comp.Excalidraw)
    );
  }, []);
  return <>{Excalidraw && <Excalidraw />}</>;
};

export default Sketch;
