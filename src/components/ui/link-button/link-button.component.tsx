import { Tooltip } from '@mui/material';
import React from 'react';
import { LinkButtonContainer } from './link-button.styles';

interface LinkButtonProps {
  url: string;
  icon: string;
  title: string;
}

export const LinkButton: React.FC<LinkButtonProps> = ({ url, icon, title }) => {
  return (
    <LinkButtonContainer href={url} target="_blank" rel="noreferrer">
      <Tooltip title={title}>
        <i className={`fa fa-${icon}`} aria-hidden="true" />
      </Tooltip>
    </LinkButtonContainer>
  );
};
