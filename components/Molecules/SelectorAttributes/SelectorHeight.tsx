import variations_products from "@/utils/variations_products"
import { HeightContainer, SelectHeight, TextSelected } from "./styled"
import { IProps, SearchResult } from "./types"
import { useEffect, useRef, useState } from "react"
import Button from "@/components/Atoms/Buttons/Button"
import Text from "@/components/Atoms/Typography/Text"
import Margin from "@/components/Atoms/Spacing/Margin/Margin"
import SkeletonLoader from "../SkeletonLoader/SkeletonLoader"
import { Arrow, DropdownContainer, DropdownHeader, DropdownList, DropdownListContainer, ListItem } from "@/components/Organisms/MainBlock/styled"
import { ArrowQuantity } from "@/components/Organisms/MainBlock/mainBlockicons"

const heightCm = {
  "original-plus": "28 cm",
  original: "23 cm",
  "hibrido-22cm-de-alto": "23 cm",
  "hibrido-plus-28cm-de-alto": "28 cm"
}

const SelectorHeight = ({
  arrChildren,
  arrOptions,
  selectedChild,
  selectedProp,
  setSelectedProp,
  valToSearch,
  sizeName,
  setIsSizeChange,
  hasRenders,
  isCategory
}: IProps) => {
  const [childrenByHeight, setChildrenByHeight] = useState<SearchResult | undefined>()

  const [isHeightyOpen, setIsHeightOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);  

  useEffect(() => {
    if (arrChildren) {
      setChildrenByHeight(searchSelectedHeight())
    }
  }, [selectedChild])

  const searchSelectedHeight = () => {
    let p: SearchResult = {}

    arrChildren?.forEach((child) => {
      if (child.attributes[sizeName] == selectedChild?.attributes[sizeName]) {
        p[child.attributes[valToSearch as keyof typeof child.attributes]] = {
          stock: child.stock,
          backorder: child.backorder
        }
      }
    })
    return p
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsHeightOpen(false);
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
/*     <HeightContainer>
      {
        childrenByHeight ?
        <>
          <Margin margin="5px 0" marginMobile="2px"/>

          <Text 
          font={isCategory ? "bold" : "medium"}
          fontSize={isCategory ? "1rem" : ".9em"}
          >
            Seleccioná la altura
          </Text>

          <Margin margin="5px 0" marginMobile="4px"/>

          <SelectHeight>
            {childrenByHeight && Object.keys(childrenByHeight).length > 0 &&
              arrOptions?.map((height: string) => (
                <Button
                  key={height}
                  disabled={
                    !(
                      childrenByHeight[height as keyof typeof childrenByHeight][
                        "stock"
                      ] > 0 ||
                      childrenByHeight[height as keyof typeof childrenByHeight][
                        "backorder"
                      ]
                    )
                  }
                  onChange={() => setSelectedProp && setSelectedProp(height)}
                  onClick={() => {
                    setSelectedProp && setSelectedProp(height);
                    setIsSizeChange && hasRenders && setIsSizeChange(true)
                  }}
                  className={
                    selectedProp === height &&
                    (childrenByHeight[height as keyof typeof childrenByHeight][
                      "stock"
                    ] > 0 ||
                      childrenByHeight[height as keyof typeof childrenByHeight][
                        "backorder"
                      ])
                      ? "selected"
                      : "notSelected"
                  }
                >
                  {
                    !isCategory &&
                    <Text 
                      color="offBlack" 
                      font="medium" 
                      fontSize="1rem" 
                      align="left" 
                      responsiveMobile={{
                        width:"auto",
                        fontSize:"0.85rem"
                        }}>
                        {
                          variations_products[
                            height as keyof typeof variations_products
                          ]
                        }
                    </Text>
                  }

                  <Text 
                  color={isCategory ? "offBlack" : "millionGray"} 
                  font={isCategory ? "bold" : "medium"}
                  align="left" 
                  responsiveMobile={{
                    width:"auto",
                    fontSize:"0.85rem"
                    }}>
                    {heightCm[height as keyof typeof heightCm]} de altura
                  </Text>
                </Button>
              ))}
          </SelectHeight>
          </>
          : <SkeletonLoader  width="100%" height="89px"/>
      }
    </HeightContainer> */

    <HeightContainer>
    {
      childrenByHeight ?
      <>
        <Margin margin="5px 0" marginMobile="4px"/>

        <Text 
        font={isCategory ? "bold" : "medium"}
        fontSize={isCategory ? "1rem" : ".9em"}
        >
          Seleccioná la altura
        </Text>

        <Margin margin="5px 0" marginMobile="8px"/>
        
          <DropdownContainer $isSize onClick={() => setIsHeightOpen(prevState => !prevState)}  ref={dropdownRef}>
            <DropdownHeader>
              <TextSelected>
                {
                  !isCategory &&
                    <Text 
                    color="offBlack" 
                    font="medium" 
                    fontSize="1rem" 
                    align="left" 
                    responsiveMobile={{
                      width:"auto",
                      fontSize:"0.85rem"
                    }}>
                    {
                      variations_products[
                        selectedProp as keyof typeof variations_products
                      ]
                    }
                  </Text>
                }

                <Text 
                color={isCategory ? "offBlack" : "millionGray"} 
                font={isCategory ? "bold" : "medium"}
                align="left" 
                responsiveMobile={{
                  width:"auto",
                  fontSize:"0.85rem"
                  }}>
                  {!isCategory && "-"} {heightCm[selectedProp as keyof typeof heightCm]} de altura
                </Text>
              </TextSelected>
            </DropdownHeader>

            <Arrow $isOpen={isHeightyOpen}>
              {ArrowQuantity()}
            </Arrow>

            {isHeightyOpen && (
              <DropdownListContainer>
                <DropdownList>
                {(childrenByHeight && Object.keys(childrenByHeight).length > 0) && (
                  arrOptions?.map((height, index) => {
                    return (
                    <ListItem 
                    key={index} 
                    $isDisable={
                      !(
                        childrenByHeight[height as keyof typeof childrenByHeight][
                          "stock"
                        ] > 0 ||
                        childrenByHeight[height as keyof typeof childrenByHeight][
                          "backorder"
                        ]
                      )
                    }
                    $isSelected={selectedProp === height &&
                      (childrenByHeight[height as keyof typeof childrenByHeight][
                        "stock"
                      ] > 0 ||
                        childrenByHeight[height as keyof typeof childrenByHeight][
                          "backorder"
                        ])}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsHeightOpen(false);
                      setSelectedProp && setSelectedProp(height);
                      setIsSizeChange && hasRenders && setIsSizeChange(true)
                    }}
                    $isLast={index === arrOptions.length - 1}
                    $isFirst={index === 0}
                    >
                      <TextSelected>
                        {
                          !isCategory &&
                            <Text 
                            color="offBlack" 
                            font="medium" 
                            fontSize="1rem" 
                            align="left" 
                            responsiveMobile={{
                              width:"auto",
                              fontSize:"0.85rem"
                            }}>
                            {
                              variations_products[
                                height as keyof typeof variations_products
                              ]
                            }
                          </Text>
                        }

                        <Text 
                        color={isCategory ? "offBlack" : "millionGray"} 
                        font={isCategory ? "bold" : "medium"}
                        align="left" 
                        responsiveMobile={{
                          width:"auto",
                          fontSize:"0.85rem"
                          }}>
                          {heightCm[height as keyof typeof heightCm]} de altura
                        </Text>
                      </TextSelected>
                    </ListItem>
                  )})
                )
                }
                </DropdownList>
              </DropdownListContainer>
            )}
          </DropdownContainer>
      </>
      : <SkeletonLoader  width="100%" height="74px" responsiveMobile={{ height:"70px" }}/>
    }
  </HeightContainer>
  )
}

export default SelectorHeight
