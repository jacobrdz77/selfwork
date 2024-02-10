// import Sketch from "@/components/sketch/Sketch";
import LoadingSkeleton from "@/components/UI/LoadingSkeleton";
import SketchHeader from "@/components/sketch/SketchHeader";
import { useOneSketch } from "@/hooks/SketchHooks";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "pages/_app";
import { useState } from "react";

const SketchPage: NextPageWithLayout = () => {
  const { sketchId } = useRouter().query;
  const [isDeleting, setIsDeleting] = useState(false);
  const { sketch, status } = useOneSketch(sketchId as string, isDeleting);

  if (status === "loading") {
    return <LoadingOverViewPage />;
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
      <SketchHeader
        name={sketch?.name!}
        projectId={sketch?.projectId!}
        setIsDeleting={setIsDeleting}
      />
      <div className="black-background"></div>
      {/* <Sketch sketchId={sketchId as string} /> */}
    </>
  );
};

const LoadingOverViewPage = () => {
  return (
    <div className="project-page__overview project-page__overview--loading">
      <div className="project-description">
        <div className="loading-title">
          <LoadingSkeleton />
        </div>
        <div className="description">
          <LoadingSkeleton />
        </div>
      </div>
      <div className="project-members">
        <div className="loading-title">
          <LoadingSkeleton />
        </div>
        <div className="members">
          <div className="loading-card">
            <LoadingSkeleton />
          </div>
          <div className="loading-card">
            <LoadingSkeleton />
          </div>
          <div className="loading-card">
            <LoadingSkeleton />
          </div>
        </div>
      </div>
      <div className="project-resources">
        <div className="loading-title">
          <LoadingSkeleton />
        </div>
        <div className="links">
          <div className="loading-card">
            <LoadingSkeleton />
          </div>
          <div className="loading-card">
            <LoadingSkeleton />
          </div>
          <div className="loading-card">
            <LoadingSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SketchPage;
