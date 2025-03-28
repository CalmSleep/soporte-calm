import {MouseEvent} from 'react';

export type IconsProps = {
    children?: React.ReactNode;
    width?: string;
    height?: string;
    padding?: string
    responsiveMobile?: responsiveMobile
    onClick?: (e: MouseEvent<HTMLInputElement>) => void;
    isCenter?: boolean
  };

type responsiveMobile = {   
    width?: string;
    height?: string;
    padding?: string
}

export type IconStyledProps = {
    $width?: string;
    $height?: string;
    $padding?: string
    $isCenter?: boolean
    $responsiveMobile?: responsiveMobile
};