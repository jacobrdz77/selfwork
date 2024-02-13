import LoadingSketchCanvas from "@/components/loading/LoadingSketchCanvas";
import LoadingSketchPage from "@/components/loading/LoadingSketchPage";
import { InviteMemberProject } from "@/components/member/InviteMember";
import SketchHeader from "@/components/sketch/SketchHeader";
import { useProjectMembers } from "@/hooks/ProjectHooks";
import { useOneSketch } from "@/hooks/SketchHooks";
import { SketchCanvasState } from "@/types/types";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "pages/_app";
import { useEffect, useState } from "react";
import { useModalStore } from "store/user";

const SketchCanvas = dynamic(
  async () => (await import("@/components/sketch/SketchCanvas")).default,
  {
    ssr: false,
    loading: () => <LoadingSketchCanvas />,
  }
);

const SketchPage: NextPageWithLayout = () => {
  const { sketchId } = useRouter().query;
  const [isDeleting, setIsDeleting] = useState(false);
  const { sketch, status } = useOneSketch(sketchId as string, isDeleting);
  const { members } = useProjectMembers(sketch?.projectId!);

  const isInviteMemberSketchModalOpen = useModalStore(
    (state) => state.isInviteMemberSketchModalOpen
  );

  const setIsInviteMemberSketchModalOpen = useModalStore(
    (state) => state.setIsInviteMemberSketchModalOpen
  );

  useEffect(() => {
    console.log(isInviteMemberSketchModalOpen);
  }, [isInviteMemberSketchModalOpen]);

  if (status === "loading") {
    return <LoadingSketchPage />;
  }

  if (status === "error") {
    return (
      <div>
        <h1>Error</h1>
        <p>Try to refresh the page.</p>
      </div>
    );
  }

  return (
    <>
      <div className="sketch-page">
        <SketchHeader
          name={sketch?.name!}
          projectId={sketch?.projectId!}
          setIsDeleting={setIsDeleting}
        />
        {/* <div className="black-background"></div> */}
        <SketchCanvas
          sketchId={sketchId as string}
          canvasState={sketch?.canvasState as SketchCanvasState}
        />
      </div>

      {status === "success" && isInviteMemberSketchModalOpen && (
        <InviteMemberProject
          members={members?.members!}
          owner={members?.owner!}
          isDark={true}
          projectId={sketch?.projectId!}
          isOpen={isInviteMemberSketchModalOpen}
          setIsOpen={setIsInviteMemberSketchModalOpen}
        />
      )}
    </>
  );
};

export default SketchPage;
