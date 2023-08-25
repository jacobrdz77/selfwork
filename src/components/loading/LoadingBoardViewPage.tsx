import LoadingSkeleton from "../UI/LoadingSkeleton";

const LoadingBoardViewPage = () => {
  return (
    <div className="project-page__board project-page__board--loading">
      <div className="loading-boards">
        <div className="board">
          <LoadingSkeleton />
        </div>
        <div className="board">
          <LoadingSkeleton />
        </div>
      </div>
    </div>
  );
};

export default LoadingBoardViewPage;
