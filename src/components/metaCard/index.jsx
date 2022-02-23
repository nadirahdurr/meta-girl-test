import { motion, useMotionValue, useTransform } from "framer-motion";
import React from "react";
import styled from "styled-components";

import GoldenMetaGirl from "../../assets/images/golden-meta-girl-transparent.png";
import { MetaCardDetails } from "../../components/metaCard/MetaCardDetails";

const CardWrapper = styled.div`
  width: 100%;
  perspective: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardContainer = styled(motion.div)`
  width: 245px;
  height: 300px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0 2px 7px 1px rgba(31, 31, 31, 0.2);
  background-image: linear-gradient(to right, #edeae2 , #76e2dd);
  ;
  color: #fff;
  position: relative;
  cursor: grab;
`;

const CircleWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  overflow: hidden;
  border-top-right-radius: 25px;
`;

const Circle = styled.div`
  position: absolute;
  width: 350px;
  height: 350px;
  top: -4.2em;
  right: -10em;
  z-index: 5;
  border-radius: 50%;
`;

const TopContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1.2;
  position: relative;
  align-items: center;
  justify-content: flex-end;
  padding: 1em 15px;
`;

const BottomContainer = styled.div`
  display: flex;
  flex: 0.8;
  padding: 0 1em;
`;


const MetaHeartWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MetaHeart = styled(motion.div)`
  width: auto;
  height: 250px;
  z-index: 99;
  user-select: none;
//   margin-right: 3em;
  margin-top: 10em;
  img {
    width: auto;
    height: 100%;
    user-select: none;
  }
`;

export function MetaCard(props) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  return (
    <CardWrapper>
      <CardContainer
        style={{ x, y, rotateX, rotateY, z: 100 }}
        drag
        dragElastic={0.16}
        dragConstraints={{ top: 5, left: 6, right: 7, bottom: 8 }}
        whileTap={{ cursor: "grabbing" }}
      >
        <TopContainer>
          <CircleWrapper>
            <Circle />
          </CircleWrapper>
          <MetaHeartWrapper>
            <MetaHeart
              style={{x, y, rotateX, rotateY, z:10000}}
              drag
              dragConstraints={{ top: 5, left: 6, right: 7, bottom: 8 }}
              dragElastic={0.15}
              whileTap={{ cursor: "grabbing" }}
            >
              <img className="" src={GoldenMetaGirl} />
            </MetaHeart>
          </MetaHeartWrapper>
        </TopContainer>
        <BottomContainer>
          <MetaCardDetails />
        </BottomContainer>
      </CardContainer>
    </CardWrapper>
  );
}