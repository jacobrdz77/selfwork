const LoadingSkeleton = ({ isDark }: { isDark?: boolean }) => {
  return (
    <div
      className={`loading-skeleton ${isDark && "loading-skeleton--dark"}`}
    ></div>
  );
};

export default LoadingSkeleton;
