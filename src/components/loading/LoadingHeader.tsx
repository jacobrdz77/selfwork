import LoadingSkeleton from "../UI/LoadingSkeleton";

const LoadingHeader = () => {
  return (
    <div className="project-loading">
      <div className="project-header__top">
        <div className="project-header__my-tasks">
          <LoadingSkeleton />
        </div>
      </div>
      <nav>
        <ul className="project-header__nav">
          <li>
            <LoadingSkeleton />
          </li>
          <li>
            <LoadingSkeleton />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default LoadingHeader;
