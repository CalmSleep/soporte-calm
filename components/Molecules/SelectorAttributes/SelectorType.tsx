import { HeightContainer, TextSelected } from "./styled"
import { Arrow, DropdownContainer, DropdownHeader, DropdownList, DropdownListContainer, ListItem } from "@/components/Organisms/MainBlock/styled"
import { ArrowQuantity } from "@/components/Organisms/MainBlock/mainBlockicons"
import { useEffect, useRef, useState } from "react"
import Text from "@/components/Atoms/Typography/Text"
import { IProduct } from "@/state/products/types"

interface IProps {
  selectedProduct: IProduct
  setSelectedProduct: (p: IProduct) => void
  options: IProduct[]
}

const SelectorType = ({selectedProduct, setSelectedProduct, options}: IProps) => {
  const [isSizeOpen, setIsSizeOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);  
  
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
           {
              selectedProduct && (
              <TextSelected>
                <Text
                  font={"medium"}
                  align="center"
                  responsiveMobile={{
                    width:"auto",
                    fontSize:"0.85rem"
                  }}
                >
                    {selectedProduct.name.replace("Colchón", "").replace("Calm", "")}
                </Text>
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
            {(options) && (
              options.map((option, index) => {
                return (
                <ListItem 
                key={index} 
                $isSelected={selectedProduct ? selectedProduct.id === option.id : false}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProduct(option);
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
                        {option.name.replace("Colchón", "").replace("Calm", "")}
                      </Text>
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

export default SelectorType