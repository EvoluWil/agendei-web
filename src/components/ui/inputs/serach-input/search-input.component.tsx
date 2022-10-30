import { InputAdornment } from '@mui/material';
import { useEffect, useState } from 'react';
import useDebounce from '../../../../hooks/debounce.hook';
import { TextFieldStyled } from '../text-field/text-field.styles';
import { Writing, SearchIcon } from './search-input.styles';

interface SearchInputProps {
  onChange: (value: string) => void;
  label: string;
}
export const SearchInput: React.FC<SearchInputProps> = ({
  onChange,
  label
}) => {
  const [value, setValue] = useState('');

  const debounced = useDebounce(value);

  useEffect(() => {
    onChange(debounced);
  }, [debounced, onChange]);

  return (
    <TextFieldStyled
      sx={{ maxWidth: 400 }}
      fullWidth
      size="small"
      value={value}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {value === debounced ? (
              <SearchIcon className="fa fa-search" />
            ) : (
              <Writing />
            )}
          </InputAdornment>
        )
      }}
      label={label}
      onChange={e => setValue(e.target.value)}
    />
  );
};
