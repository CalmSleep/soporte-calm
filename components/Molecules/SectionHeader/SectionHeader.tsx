import Paragraph from "@/components/Atoms/Typography/Text";
import Titles from "@/components/Atoms/Typography/Titles";
import React from "react";
import { SectionHeaderProps } from "./types";
import { SectionHeaderStyles } from "./styled";

const SectionHeader = ({
  title,
  spam,
  paragraph,
  titleStyles,
  spamStyles,
  paragraphStyles,
  children,
  sectionHeaderStyles,
}: SectionHeaderProps) => {
  return (
    <SectionHeaderStyles {...sectionHeaderStyles}>
      <Titles {...titleStyles}>
        <Paragraph textTag="span" {...spamStyles}>
          {spam}
        </Paragraph>
        {title}
      </Titles>
      <Paragraph {...paragraphStyles}>
        {paragraph &&
          paragraph.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
      </Paragraph>
      {children}
    </SectionHeaderStyles>
  );
};

export default SectionHeader;
