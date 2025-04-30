import variations_sizes from "@/utils/variations_sizes"
import { ContainerSize, HeightContainer, TextSelected } from "./styled"
import { IPropsSize } from "./types"
import SizeCard from "../SizeCard/SizeCard"
import SkeletonLoader from "../SkeletonLoader/SkeletonLoader"
import { Arrow, DropdownContainer, DropdownHeader, DropdownList, DropdownListContainer, ListItem } from "@/components/Organisms/MainBlock/styled"
import { ArrowQuantity } from "@/components/Organisms/MainBlock/mainBlockicons"
import { useEffect, useRef, useState } from "react"
import Text from "@/components/Atoms/Typography/Text"

const SelectorSize = ({
  arrChildren,
  selected,
  setSelected,
  setIsSizeChange,
  valToSearch,
  landing,
  hasRenders,
  isCategory,
}: IPropsSize) => {
  const [isSizeOpen, setIsSizeOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);  

  const regex = /\((.*?)\)/g;
  
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsSizeOpen(false);
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const textFormater = (text: string) => {
    if (/\(.*?\)/.test(text)) {
      return text.split(regex);
    } else if (text) {
      return text;
    }
  }

  const selectedSize =  textFormater(variations_sizes[
    selected?.attributes[
      valToSearch as keyof typeof selected.attributes
    ] as keyof typeof variations_sizes
  ])

  return (
  /*   <ContainerSize>
      {arrChildren && arrChildren.length > 0 ? (
        arrChildren.map((child) => (
          <SizeCard
            key={child.id}
            childId={child.id}
            landing={landing}
            selected={selected}
            setSelected={setSelected}
            setIsSizeChange={setIsSizeChange}
            hasRenders={hasRenders}
            isCategory={isCategory}
            text={
              variations_sizes[
                child.attributes[
                  valToSearch as keyof typeof child.attributes
                ] as keyof typeof variations_sizes
              ]
            }
          />
        ))
      ) : (
        <SkeletonLoader width="100%" height="122px" />
      )}
    </ContainerSize> */


    <HeightContainer>
      <DropdownContainer $isSize onClick={() => setIsSizeOpen(prevState => !prevState)}  ref={dropdownRef}>
        <DropdownHeader>
           {
              selectedSize && (
              <TextSelected>
                <Text
                  font={isCategory ? "bold" : "medium"}
                  align="center"
                  responsiveMobile={{
                    width:"auto",
                    fontSize:"0.85rem"
                  }}
                >
                    {Array.isArray(selectedSize) ? selectedSize[0] : selectedSize}
                </Text>

                {
                  Array.isArray(selectedSize) &&
                  <Text
                    font="medium"
                    align="center"
                    color="millionGray"
                    responsiveMobile={{
                      width:"auto",
                      fontSize:"0.75rem"
                      }}
                  >
                      ({selectedSize[1]})
                  </Text>
                }
              </TextSelected> 
              )
            }
        </DropdownHeader>

        <Arrow $isOpen={isSizeOpen}>
          {ArrowQuantity()}
        </Arrow>

        {isSizeOpen && (
          <DropdownListContainer>
            <DropdownList>
            {(arrChildren && arrChildren.length > 0) && (
              arrChildren.map((option, index) => {
                const size =  textFormater(variations_sizes[
                  option.attributes[
                    valToSearch as keyof typeof option.attributes
                  ] as keyof typeof variations_sizes
                ])

                return (
                <ListItem 
                key={index} 
                $isSelected={selected ? selected.id === option.id : false}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected(option.id)
                  setIsSizeOpen(false);
                  hasRenders && setIsSizeChange(true)
                }}
                $isLast={index === arrChildren.length - 1}
                $isFirst={index === 0}
                >
                   {
                    size && (
                    <TextSelected>
                      <Text
                        font={isCategory ? "bold" : "medium"}
                        align="left"
                        responsiveMobile={{
                          width:"auto",
                          fontSize:"0.85rem"
                        }}
                      >
                          {Array.isArray(size) ? size[0] : size}
                      </Text>

                      {
                        Array.isArray(size) &&
                        <Text
                          font="medium"
                          align="left"
                          color="millionGray"
                          responsiveMobile={{
                            width:"auto",
                            fontSize:"0.75rem"
                            }}
                        >
                            ({size[1]})
                        </Text>
                      }
                    </TextSelected> )
                  }
                </ListItem>
              )})
            )
            }
            </DropdownList>
          </DropdownListContainer>
        )}
      </DropdownContainer>
    </HeightContainer>
  )
}

export default SelectorSize