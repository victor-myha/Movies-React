import { styled } from '@mui/material';

export const TextWithButton = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '5px',
}));

export const Content = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  margin: '4vh 4vw',
  flexWrap: 'wrap',
  gap: '20px',
}));

export const MovieCard = styled('div')(() => ({
  width: '100%',
  maxWidth: '282px',
  height: '504px',
  padding: '10px',
  backgroundColor: '#092C39',
  borderRadius: '10px',
  cursor: 'pointer',
}));

export const MovieImg = styled('img')(() => ({
  width: '100%',
  height: '400px',
  borderRadius: '10px',
}));

export const MovieTitle = styled('div')(() => ({
  color: '#FFF',
  fontSize: '20px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '32px',
}));

export const MovieYear = styled('div')(() => ({
  color: '#FFF',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '24px',
}));
