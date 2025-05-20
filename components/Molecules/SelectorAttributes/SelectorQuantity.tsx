import variations_sizes from "@/utils/variations_sizes";
import { ContainerSize, HeightContainer, TextSelected } from "./styled";
import { IPropsSize } from "./types";
//import SizeCard from "../SizeCard/SizeCard"
import SkeletonLoader from "../SkeletonLoader/SkeletonLoader";
import {
  Arrow,
  DropdownContainer,
  DropdownHeader,
  DropdownList,
  DropdownListContainer,
  ListItem,
} from "@/components/Organisms/MainBlock/styled";
import { ArrowQuantity } from "@/components/Organisms/MainBlock/mainBlockicons";
import { useEffect, useRef, useState } from "react";
import Text from "@/components/Atoms/Typography/Text";
import Margin from "@/components/Atoms/Spacing/Margin/Margin";
import { set } from "date-fns";

const SelectorQuantity = ({
  quantity,
  setQuantity,
  setQuantityOpen,
  setIsQuantity,
}: {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  setQuantityOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsQuantity: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [isQuantityOpen, setIsQuantityOpen] = useState(false);
  // const [quantity, setQuantity] = useState(1);
  const options = ["1", "2", "3", "4", "5", "6"];
  const handleQuantityChange = (option: string) => {
    setQuantity(Number(option));
    setIsQuantity(Number(option));
    setIsQuantityOpen(false);
    setQuantityOpen(false);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsQuantityOpen(false);
        setQuantityOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <HeightContainer>
      <Margin margin="10px 0 10px 0">
        <Text
          color="lead"
          font="medium"
          fontSize="14px"
          lineHeight="130%"
          letterSpacing="0.42px"
        >
          Cantidad
        </Text>
      </Margin>
      <DropdownContainer
        $isSize={true}
        onClick={() => {
          setIsQuantityOpen((prevState) => !prevState);
          setQuantityOpen((prevState) => !prevState);
        }}
        ref={dropdownRef}
      >
        <DropdownHeader>{quantity}</DropdownHeader>

        <Arrow $isOpen={isQuantityOpen}>{ArrowQuantity()}</Arrow>

        {isQuantityOpen && (
          <DropdownListContainer>
            <DropdownList>
              {options.map((option, index) => (
                <ListItem
                  key={option}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleQuantityChange(option);
                  }}
                  $isLast={index === 5}
                  $isFirst={index === 0}
                >
                  {option}
                </ListItem>
              ))}
            </DropdownList>
          </DropdownListContainer>
        )}
      </DropdownContainer>
    </HeightContainer>
  );
};

export default SelectorQuantity;
