import { useEffect, useState } from "react";

const AnimatedProgressbar = ({ progress, duration = 2 }) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    setTimeout(() => setAnimatedProgress(progress), 100);
  }, [progress]);

  return (
    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
      <div
        className="h-full bg-blue-500 transition-all ease-in-out"
        style={{
          width: `${animatedProgress}%`,
          transitionDuration: `${duration}s`,
        }}
      ></div>
    </div>
  );
};

export default AnimatedProgressbar;
