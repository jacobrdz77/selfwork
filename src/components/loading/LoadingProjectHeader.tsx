import LoadingSkeleton from "../UI/LoadingSkeleton";

const LoadingProjectHeader = () => {
  return (
    <div className="project-loading">
      <div className="project-header__top">
        <div className="project-header__icon">
          <LoadingSkeleton />
        </div>
        <div className="project-header__name">
          <LoadingSkeleton />
        </div>
        <div className="project-header__status">
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

export default LoadingProjectHeader;
