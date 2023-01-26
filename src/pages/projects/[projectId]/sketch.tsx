import ProjectPageLayout from "@/components/project/ProjectPageLayout";
import { NextPageWithLayout } from "../../_app";

const Sketch: NextPageWithLayout = () => {
  return <div>Sketch Page</div>;
};

Sketch.getLayout = function getLayout(page) {
  return <ProjectPageLayout>{page}</ProjectPageLayout>;
};

export default Sketch;
