import { HeightContainer, TextSelected } from "./styled"
import { Arrow, DropdownContainer, DropdownHeader, DropdownList, DropdownListContainer, ListItem } from "@/components/Organisms/MainBlock/styled"
import { ArrowQuantity } from "@/components/Organisms/MainBlock/mainBlockicons"
import { useEffect, useRef, useState } from "react"
import Text from "@/components/Atoms/Typography/Text"
import { IProduct } from "@/state/products/types"
import variations_sizes from "@/utils/variations_sizes";

interface IProps {
  selectedHeight: string
  product: IProduct
  setSelectedHeight: (p: string) => void
}

const SelectorSizeForBundle = ({selectedHeight, product, setSelectedHeight}: IProps) => {
  const [isSizeOpen, setIsSizeOpen] = useState(false);
  const [options, setOptions] = useState<any>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(Object.values(product.attributes) && Array.isArray(Object.values(product.attributes)[0])) {
      setOptions(Object.values(product.attributes)[1])
    }
  }, [product])
  
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

  return (
    <HeightContainer>
      <DropdownContainer $isSize onClick={() => setIsSizeOpen(prevState => !prevState)}  ref={dropdownRef}>
        <DropdownHeader>
          <TextSelected>
            <Text
              font={"medium"}
              align="center"
              responsiveMobile={{
                width:"auto",
                fontSize:"0.85rem"
              }}
            >
                {selectedHeight}
            </Text>
          </TextSelected>
        </DropdownHeader>

        <Arrow $isOpen={isSizeOpen}>
          {ArrowQuantity()}
        </Arrow>

        {isSizeOpen && (
          <DropdownListContainer>
            <DropdownList>
            { Array.isArray(options) && options.length > 0 &&
              options.map((option, index) => {
                return (
                <ListItem 
                key={index} 
                $isSelected={selectedHeight ? selectedHeight === variations_sizes[option as keyof typeof variations_sizes] : false}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedHeight(variations_sizes[option as keyof typeof variations_sizes]);
                  setIsSizeOpen(false);
                }}
                $isLast={index === options.length - 1}
                $isFirst={index === 0}
                >
                   {
                    option && (
                      <TextSelected>
                        <Text
                          font={"medium"}
                          align="left"
                          responsiveMobile={{
                            width:"auto",
                            fontSize:"0.85rem"
                          }}
                        >
                          {variations_sizes[option as keyof typeof variations_sizes]}
                        </Text>
                      </TextSelected>
                    )
                  }
                </ListItem>
              )})
            }
            </DropdownList>
          </DropdownListContainer>
        )}
      </DropdownContainer>
    </HeightContainer>
  )
}

export default SelectorSizeForBundle