import React, { useState } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

interface NumberCountProps {
  defaultStyle?: boolean;
  extraStyle?: string;
  end: number;
  postfixText?: string;
  prefixText?: string;
}

const NumberCount: React.FC<NumberCountProps> = ({
  defaultStyle,
  end,
  extraStyle,
  postfixText,
  prefixText,
}) => {
  const [startCount, setStartCount] = useState<boolean>(false);
  const { ref, inView } = useInView({
    triggerOnce: false, // Ensures it only triggers once
    threshold: 0.5, // Starts when 50% of the element is visible
  });

  if (inView && !startCount) {
    setStartCount(true);
  }
  return (
    <div ref={ref}>
      {startCount && (
        <h4
          className={`${
            defaultStyle
              ? "text-[24px] sm:text-[28px]  font-medium text-black"
              : ""
          } ${extraStyle}`}
        >
          {prefixText}{" "}
          <CountUp start={0} end={end} duration={4} separator="," />
          {postfixText}
        </h4>
      )}
    </div>
  );
};

export default NumberCount;
