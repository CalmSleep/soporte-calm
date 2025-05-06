import SkeletonLoader from "@/components/Atoms/SkeletonLoader/SkeletonLoader"
import { Loaders } from "./styled"
import Margin from "@/components/Atoms/Spacing/Margin/Margin"

export const MainBlockPreviewLoaders = () => {
    return (
        <Loaders>
            <SkeletonLoader  width="100%" height="100px" borderRadius="10px"/>
        </Loaders>
    )
}

export const MainBlockLoaders = () => {
    return (
        <Loaders>
            <div>
                <SkeletonLoader  width="400px" height="125px" borderRadius="10px"/>

                <Margin margin="1rem"/>

                <SkeletonLoader  width="400px" height="250px" borderRadius="10px"/>

                <Margin margin="1rem"/>
                
                <SkeletonLoader  width="400px" height="200px" borderRadius="10px"/>
            </div>
        </Loaders>
    )
}