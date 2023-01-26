import ProjectPageLayout from "@/components/project/ProjectPageLayout";
import { NextPageWithLayout } from "../../_app";

const Board: NextPageWithLayout = () => {
  return <div>Board Page</div>;
};

Board.getLayout = function getLayout(page) {
  return <ProjectPageLayout>{page}</ProjectPageLayout>;
};

export default Board;
