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
      {title && (
        <Titles {...titleStyles}>
          <Paragraph textTag="span" {...spamStyles}>
            {spam}
          </Paragraph>
          {title}
        </Titles>
      )}
      <Paragraph {...paragraphStyles}>
        {typeof paragraph === "string" &&
          paragraph.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line.split(/(&&.*?&&)/g).map((part, i) => {
                if (part.startsWith("&&") && part.endsWith("&&")) {
                  return <strong key={i}>{part.slice(2, -2)}</strong>;
                } else {
                  return <span key={i}>{part}</span>;
                }
              })}
              <br />
            </React.Fragment>
          ))}

        {typeof paragraph === "object" && paragraph}
      </Paragraph>
      {children}
    </SectionHeaderStyles>
  );
};

export default SectionHeader;
