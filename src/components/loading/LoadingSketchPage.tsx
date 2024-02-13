import LoadingSkeleton from "../UI/LoadingSkeleton";

const LoadingSketchPage = () => {
  return (
    <div className="sketch-page--loading">
      <div className="sketch-header">
        <div className="name">
          <LoadingSkeleton isDark={true} />
        </div>
      </div>
    </div>
  );
};

export default LoadingSketchPage;
