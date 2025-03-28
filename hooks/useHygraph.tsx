import { onSaveComponent } from "@/state/hygraph/hygraphActions";
import { getComponentsData } from "@/state/hygraph/hygraphSelector";
import { IComponentData } from "@/state/hygraph/types";
import { DocumentNode, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useHygraph = (id: string, query: DocumentNode, schema: string) => {
    const dispatch = useDispatch()
    const componentsData = useSelector(getComponentsData)
    const [componentData, setComponentData] = useState<IComponentData>()
    const [skip, setSkip] = useState(true)
    const { loading, data } = useQuery(query, {
        variables: { id },
        skip: id == "" || skip
    });

    useEffect(() => {
        if(componentsData) {
            const component = componentsData.find(component => component.id == id && component.schema == schema)
            if(component) {
                setComponentData(component)
            } else {
                setSkip(false)
            }
        }
    }, [componentsData])

    useEffect(() => {
        if(data) {
            dispatch(onSaveComponent({id, schema, data}))
        }
    }, [data])

    return [loading, componentData?.data]
}

export default useHygraph