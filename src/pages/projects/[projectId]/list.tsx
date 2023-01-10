import ProjectPageLayout from "../../../components/project/ProjectPageLayout";
import { NextPageWithLayout } from "../../_app";

const List: NextPageWithLayout = () => {
  return <div>List Page</div>;
};

List.getLayout = function getLayout(page) {
  return <ProjectPageLayout>{page}</ProjectPageLayout>;
};

export default List;
