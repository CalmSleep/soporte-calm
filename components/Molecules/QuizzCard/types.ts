export interface IProps {
    isfromNavBar?: boolean, 
    quizzHandle: (id?: string) => void,
    src: string,
    text: string
    id?: string
}