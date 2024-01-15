import { Button, ButtonProps } from '@mui/material';
import styled from 'styled-components';
import { colors } from '../../assets/theme/index';

type TProps = ButtonProps & {
  width?: string;
  _margin?: string;
};

export default styled(Button)<TProps>(({ width = '100%', _margin }) => ({
  height: 54,
  width: width || '100%',
  margin: _margin,
  background: colors.text,
}));
