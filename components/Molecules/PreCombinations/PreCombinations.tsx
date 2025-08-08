import NewModal from "@/components/Organisms/NewModals/NewModals"
import CombinationsModal from "@/components/Organisms/CombinationsModal/CombinationsModal";
import { IProps } from "./types";

const PreCombinations = ({
    handleConfigurationChange, 
    isPreConfigModalOpen, 
    setIsPreConfigModalOpen, 
    children, 
    propsNames,
    setIsShelfConfigChanged
}: IProps) => {

    const handleModal = (): void => {
        setIsPreConfigModalOpen(false);
      };

    return (
        <NewModal 
        isOpen={isPreConfigModalOpen}
        onClose={handleModal}
        title=""
        maxWidth="1100px"
        hideCloseButton
        >
        <CombinationsModal
        handleModal={handleModal} 
        handleConfigurationChange={handleConfigurationChange} 
        children={children}
        propsNames={propsNames}
        setIsShelfConfigChanged={setIsShelfConfigChanged}
        />
        </NewModal>
    )
}   

export default PreCombinations;
