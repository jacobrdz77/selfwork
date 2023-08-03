import ProjectPageLayout from "@/components/project/ProjectPageLayout";
import { NextPageWithLayout } from "../../_app";
import { useState } from "react";
import SketchCard from "@/components/sketch/SketchCard";
import SketchFilterButton from "@/components/sketch/SketchFilterButton";
import { useRouter } from "next/router";

const Sketch: NextPageWithLayout = () => {
  const [filter, setFilter] = useState<
    "alphabetical" | "lastViewed" | "dateCreated"
  >("lastViewed");

  const router = useRouter();
  return (
    <div className="project-page__sketch">
      {/* Buttons */}
      <div className="buttons">
        {/* Add sketch */}
        <button
          type="button"
          className="new-sketch-button"
          onClick={() => {
            router.push("/sketch");
          }}
        >
          <div className="text">
            <div className="text__title">New sketch file</div>
            <div className="text__sub-title">Sketch and whiteboard</div>
          </div>
          <div className="new-sketch-button__icon">
            <svg
              width="20"
              height="20"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.0517 2.73916L14.4575 1.33249C14.7506 1.03943 15.148 0.874786 15.5625 0.874786C15.977 0.874786 16.3744 1.03943 16.6675 1.33249C16.9606 1.62556 17.1252 2.02304 17.1252 2.43749C17.1252 2.85195 16.9606 3.24943 16.6675 3.54249L4.69333 15.5167C4.25277 15.957 3.70947 16.2806 3.1125 16.4583L0.875 17.125L1.54167 14.8875C1.7194 14.2905 2.04303 13.7472 2.48333 13.3067L13.0525 2.73916H13.0517ZM13.0517 2.73916L15.25 4.93749"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </button>
      </div>

      <div className="filters">
        <SketchFilterButton filter={filter} setFilter={setFilter} />
      </div>
      <div className="sketches">
        <div className="sketches__header">
          <div className="name">Name</div>
          <div className="modified">Last modified</div>
          <div className="assignee">Creator</div>
        </div>

        <SketchCard
          name="Wireframes for landing page"
          lastModified={new Date()}
          // @ts-ignore
          user={{ name: "Jacob Rodriguez" }}
        />
        <SketchCard
          name="Wireframes for landing page"
          lastModified={new Date()}
          // @ts-ignore
          user={{ name: "Jacob Rodriguez" }}
        />
        <SketchCard
          name="Wireframes for landing page"
          lastModified={new Date()}
          // @ts-ignore
          user={{ name: "Jacob Rodriguez" }}
        />
      </div>
    </div>
  );
};

Sketch.getLayout = function getLayout(page) {
  return <ProjectPageLayout>{page}</ProjectPageLayout>;
};

export default Sketch;
