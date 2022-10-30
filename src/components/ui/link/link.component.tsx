import React, { ReactNode } from 'react';
import LinkStatic from 'next/link';
import { LinkStyled } from './link.styles';

export interface LinkComponentProps {
  href?: string;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export const Link: React.FC<LinkComponentProps> = ({
  href,
  children,
  ...props
}) => {
  return (
    <LinkStyled href={href || '/'} style={{ cursor: 'pointer' }} {...props}>
      {children}
    </LinkStyled>
  );
};
