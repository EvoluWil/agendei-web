import { styled } from '@mui/material';

export const SearchIcon = styled('i')`
  color: ${({ theme }) => theme.palette.primary.main};
`;

export const Writing = styled('div')`
  position: relative;
  left: -9999px;
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.main};
  box-shadow: 9999px 0 0 0 ${({ theme }) => theme.palette.primary.main};
  animation: dotFalling 1s infinite linear;
  animation-delay: 0.1s;
  margin-right: 8px;

  &::before,
  &::after {
    content: '';
    display: inline-block;
    position: absolute;
    top: 0;
  }

  &::before {
    width: 6px;
    height: 6px;
    border-radius: 3px;
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: ${({ theme }) => theme.palette.primary.main};
    animation: dotFallingBefore 1s infinite linear;
    animation-delay: 0s;
  }

  &::after {
    width: 6px;
    height: 6px;
    border-radius: 3px;
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: ${({ theme }) => theme.palette.primary.main};
    animation: dotFallingAfter 1s infinite linear;
    animation-delay: 0.2s;
  }

  @keyframes dotFalling {
    0% {
      box-shadow: 9999px -15px 0 0 rgba(152, 128, 255, 0);
    }
    25%,
    50%,
    75% {
      box-shadow: 9999px 0 0 0 ${({ theme }) => theme.palette.primary.main};
    }
    100% {
      box-shadow: 9999px 15px 0 0 rgba(152, 128, 255, 0);
    }
  }

  @keyframes dotFallingBefore {
    0% {
      box-shadow: 9984px -15px 0 0 rgba(152, 128, 255, 0);
    }
    25%,
    50%,
    75% {
      box-shadow: 9984px 0 0 0 ${({ theme }) => theme.palette.primary.main};
    }
    100% {
      box-shadow: 9984px 15px 0 0 rgba(152, 128, 255, 0);
    }
  }

  @keyframes dotFallingAfter {
    0% {
      box-shadow: 10014px -15px 0 0 rgba(152, 128, 255, 0);
    }
    25%,
    50%,
    75% {
      box-shadow: 10014px 0 0 0 ${({ theme }) => theme.palette.primary.main};
    }
    100% {
      box-shadow: 10014px 15px 0 0 rgba(152, 128, 255, 0);
    }
  }
`;
