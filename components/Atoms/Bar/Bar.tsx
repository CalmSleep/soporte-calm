import React from 'react';
import { BarraProps } from "./types"
import { SquareBar, SquareSegment, CircleBar, CircleSegment, Connector, CircleContainer } from "./styled"
import Text from '../Typography/Text';
import Margin from '../Spacing/Margin/Margin';

const Bar = ({ cantidad, title, isVertical, isCircle, segments, height }: BarraProps) => {
  const maxSegments = segments ? segments : 5
  const isLast = maxSegments - 1
  const segmentos: JSX.Element[] = [];

  const segmentosActivos = Math.min(Math.max(cantidad, 0), 5);

  for (let i = 0; i < maxSegments; i++) {
    segmentos.push(isVertical ?
      <div key={i}>
        <CircleSegment $activo={i < segmentosActivos} />
        <Connector $isLast={i === isLast} $isVertical={isVertical}/>
      </div> : isCircle ? 
    <CircleContainer key={i} >
      <CircleSegment $activo={i < segmentosActivos} />
      <Connector $isLast={i === isLast} $isVertical={isVertical}/>
    </CircleContainer>
      : <SquareSegment key={i} $activo={i < segmentosActivos} />);
  }

  return (
    <>
    { title &&
      <Text
      font="medium"
      color='offBlack'
      >{title} </Text>
      }
      <Margin margin={isCircle && !isVertical ? '7px 0 4px 0' : '7px 0 13px 0'}>
        {
          isCircle ?
          <CircleBar $isVertical={isVertical}>
            {segmentos}
          </CircleBar>
          : <SquareBar $height={height}>
            {segmentos}
          </SquareBar>
        }
      </Margin>
    </>
  );
};

export default Bar