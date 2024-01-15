import { styled } from '@mui/material';
import { colors } from '../../assets/theme';

export const EditWrapper = styled('div')(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  padding: '0 2vw 0 0',
  margin: '12vh 0 0 0',
}));

export const Content = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '30%',
  gap: '4vw',
  '@media (max-width: 720px)': {
    width: '80%',
  },
}));

export const UploadButton = styled('button')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  background: colors.input,
  width: '70%',
  aspectRatio: '0.9',
  cursor: 'pointer',
  borderRadius: '10px',
  border: `2px dashed ${colors.text}`,
  fontWeight: 300,
}));

export const Image = styled('img')(() => ({
  background: colors.input,
  width: '70%',
  aspectRatio: '0.9',
  cursor: 'pointer',
  borderRadius: '10px',
  fontWeight: 400,
}));

export const ImageContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  width: '45%',
  '@media (max-width: 720px)': {
    width: '100%',
  },
}));

export const Error = styled('h6')(() => ({
  margin: 0,
  fontWeight: 400,
  color: colors.error,
}));

export const ButtonsContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '20px',
}));
