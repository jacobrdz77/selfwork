const LoadingSkeleton = ({
  isDark,
  className,
}: {
  isDark?: boolean;
  className?: string;
}) => {
  return (
    <div
      className={`loading-skeleton ${isDark ? "loading-skeleton--dark" : ""} ${
        className ? className : ""
      }`}
    ></div>
  );
};

export default LoadingSkeleton;
