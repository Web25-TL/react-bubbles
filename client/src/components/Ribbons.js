import React, { useState, useEffect } from "react";
import { Chord } from "@potion/layout";
import { Svg, Ribbon } from "@potion/element";

export default function Ribbons({ colors }) {
  const [ribbonData, setRibbonData] = useState([]);
  let depth = {
      width: 400,
      height: 400
  }
  useEffect(() => {
    const generateRibbonData = colors.map((_, i) => ({
      value: Math.floor(Math.random() * (colors.length * 2)) + 1,
      key: `${i + 1}`
    }));
    setRibbonData(generateRibbonData);
  }, [colors]);

  return (
    <div className="ribbons">
      <p>ribbons</p>
      <Svg width={depth.width} height={depth.height}>
        <Chord
          data={[
            [11975, 5871, 8916, 2868],
            [1951, 10048, 2060, 6171],
            [8010, 16145, 8090, 8045],
            [1013, 990, 940, 6907],
          ]}
          animate
          nodeEnter={d => ({
            ...d,
            sourceStartAngle: d.sourceEndAngle,
            targetStartAngle: d.targetEndAngle
          })}
        >
          {nodes =>
            nodes.map((node, i) => {
              if (i < colors.length) {
                return (
                  <Ribbon
                    {...node}
                    fill={colors[i].code.hex}
                    stroke="black"
                    fillOpacity={0.9}
                    radius={depth.height * 0.4}
                    transform={{ translate: [200, 200] }}
                  />
                );
              }
              return null
            })
          }
        </Chord>
      </Svg>
    </div>
  );
}
