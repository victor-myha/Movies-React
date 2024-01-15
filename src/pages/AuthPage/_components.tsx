import { styled } from '@mui/material';
import { colors } from '../../assets/theme';

export const ContentCenter = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  maxWidth: '340px',
  margin: '0 auto 0 auto',
  gap: '20px',
  width: '100%',
  height: 'calc(90vh)',
}));

export const Error = styled('h6')(() => ({
  margin: 0,
  color: colors.error,
}));

export const ChangeAuthLink = styled('a')(() => ({
  position: 'absolute',
  top: '2vw',
  right: '2vw',
  cursor: 'pointer',
  color: colors.text,
}));
