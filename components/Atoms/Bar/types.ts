export interface SegmentoProps {
    $activo?: boolean;
    $isVertical?: boolean;
    $isLast?: boolean
}
  
export interface BarraProps {
    cantidad: number;
    title?: string,
    isVertical?: boolean
    isCircle?: boolean
    segments?: number
    height?: string
}