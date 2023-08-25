import LoadingSkeleton from "../UI/LoadingSkeleton";

const LoadingListViewPage = () => {
  return (
    <div className="project-page__list project-page__list--loading">
      {/* //!!! This is for when I implement the filter buttons in the list page. */}
      {/* <div className="buttons">
          <div className="loading-button">
            <LoadingSkeleton />
          </div>
          <div className="loading-button">
            <LoadingSkeleton />
          </div>
        </div> */}
      <div className="loading-tasks">
        <LoadingTask />
        <LoadingTask />
        <LoadingTask />
        <LoadingTask />
        <LoadingTask />
        <LoadingTask />
        <LoadingTask />
        <LoadingTask />
        <LoadingTask />
        <LoadingTask />
      </div>
    </div>
  );
};

export const LoadingTask = () => {
  return (
    <div className="loading-task">
      <div className="loading-avatar">
        <LoadingSkeleton />
      </div>
      <div className="loading-text">
        <LoadingSkeleton />
      </div>
    </div>
  );
};

export default LoadingListViewPage;
