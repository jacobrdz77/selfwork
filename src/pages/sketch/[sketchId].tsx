// import Sketch from "@/components/sketch/Sketch";
import SketchHeader from "@/components/sketch/SketchHeader";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "pages/_app";

const SketchPage: NextPageWithLayout = () => {
  const { sketchId } = useRouter().query;

  return (
    <>
      <SketchHeader name="Untitled sketch" />
      <div className="black-background"></div>
      {/* <Sketch sketchId={sketchId as string} /> */}
    </>
  );
};

// SketchPage.getLayout = function getLayout(page) {
//   console.log("ADDIng layout");
//   return <>{page}</>;
// };

export default SketchPage;
