// import Sketch from "@/components/sketch/Sketch";
import { useRouter } from "next/router";

const SketchPage = () => {
  const { sketchId } = useRouter().query;

  return <>{/* <Sketch sketchId={sketchId as string} /> */}</>;
};

export default SketchPage;
