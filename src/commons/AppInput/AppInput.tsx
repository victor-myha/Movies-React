import { TextField, TextFieldProps } from '@mui/material';
import styled from 'styled-components';
import { colors } from '../../assets/theme/index';

type TProps = TextFieldProps & {
  width?: string;
  _margin?: string;
};

export default styled(TextField)<TProps>(({ width = '100%', _margin }) => ({
  height: 54,
  width: width || '100%',
  margin: _margin,
  backgroundColor: colors.input,
}));
