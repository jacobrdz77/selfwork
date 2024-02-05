import ProjectPageLayout from "@/components/project/ProjectPageLayout";
import { NextPageWithLayout } from "../../_app";
import { useEffect, useState } from "react";
import SketchCard from "@/components/sketch/SketchCard";
import SketchFilterButton from "@/components/sketch/SketchFilterButton";
import { useRouter } from "next/router";
import { useProjectSketches } from "@/hooks/SketchHooks";
import LoadingSkeleton from "@/components/UI/LoadingSkeleton";
import {
  sortSketchByEditedDate,
  sortSketchByName,
} from "@/utils/sortingSketch";

const sketches = [
  {
    id: "1",
    name: "Simple UI sketch",
    author: { id: "123", name: "Jacob Rodriguez", email: "jacob@gmail.com" },
    updatedAt: "2024-02-04T03:05:38.028Z",
    createdAt: "2024-02-04T03:01:38.028Z",
  },
  {
    id: "3",
    name: "Creating architecture",
    author: { id: "123", name: "Jacob Rodriguez", email: "jacob@gmail.com" },
    updatedAt: "2024-02-02T03:01:05.028Z",
    createdAt: "2024-01-29T03:01:38.028Z",
  },
  {
    id: "2",
    name: "Brainstorming ideas",
    author: { id: "123", name: "Jacob Rodriguez", email: "jacob@gmail.com" },
    updatedAt: "2024-02-01T03:08:34.028Z",
    createdAt: "2024-02-01T03:01:38.028Z",
  },
];

const Sketch: NextPageWithLayout = () => {
  const router = useRouter();
  const { projectId } = router.query;
  const { status } = useProjectSketches(projectId as string);
  console.log(
    "INITIAL",
    sketches.map((sketch) => {
      return { name: sketch.name };
    })
  );

  const [sortedSketches, setSortedSketches] = useState(sketches);

  const [filter, setFilter] = useState<"alphabetical" | "lastEdited">(
    "alphabetical"
  );

  useEffect(() => {
    console.log("FURE");
    console.log(filter);
    if (filter === "alphabetical") {
      setSortedSketches((state) => {
        return sortSketchByName(state);
      });
    } else if (filter === "lastEdited") {
      setSortedSketches((state) => {
        return sortSketchByEditedDate(state);
      });
    }
  }, [filter]);

  if (status === "loading") {
    return <LoadingSketchPage />;
  }

  if (status === "error") {
    return (
      <div className="project-page__sketch">
        <h1>Error</h1>
        <p>Try to refresh the page.</p>
      </div>
    );
  }

  return (
    <div className="project-page__sketch">
      {/* Buttons */}
      <div className="buttons">
        {/* Add sketch */}
        <button
          type="button"
          className="new-sketch-button"
          onClick={() => {
            // Todo: Need to create and wait for it to create, then redirect to /sketches/[sketchId]
            // router.push("/sketch");
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
        <SketchFilterButton
          filter={filter}
          setFilter={setFilter}
          setSortedSketches={setSortedSketches}
        />
      </div>

      <div className="sketches">
        <div className="sketches__header">
          <div className="name">Name</div>
          <div className="edited">Edited</div>
          <div className="created">Created</div>
          <div className="author">Author</div>
        </div>

        {sortedSketches?.map((sketch) => (
          <SketchCard
            key={sketch.id}
            id={sketch.id}
            name={sketch.name}
            author={sketch.author}
            createdAt={sketch.createdAt}
            updatedAt={sketch.updatedAt}
          />
        ))}

        {sketches && sketches.length === 0 && (
          <div className="no-sketches">
            <p>No sketches</p>
            <button
              className="button no-data__button"
              onClick={() => {
                // setIsClientModalOpen(true
              }}
            >
              Create sketch
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

Sketch.getLayout = function getLayout(page) {
  return <ProjectPageLayout>{page}</ProjectPageLayout>;
};

export default Sketch;

const LoadingSketchPage = () => {
  return (
    <div className="project-page__sketch project-page__sketch--loading">
      <div className="buttons">
        <div className="loading-card">
          <LoadingSkeleton />
        </div>
      </div>
      <div className="filters">
        <div className="loading-button">
          <LoadingSkeleton />
        </div>
      </div>
      <div className="sketches">
        <div className="loading-title">
          <LoadingSkeleton />
        </div>
        <div className="loading-sketch">
          <LoadingSkeleton />
        </div>
        <div className="loading-sketch">
          <LoadingSkeleton />
        </div>
        <div className="loading-sketch">
          <LoadingSkeleton />
        </div>
        <div className="loading-sketch">
          <LoadingSkeleton />
        </div>
        <div className="loading-sketch">
          <LoadingSkeleton />
        </div>
      </div>
    </div>
  );
};
