import { styled } from '@mui/material';
import Footer1 from '../../assets/Images/Footer1.svg';
import Footer2 from '../../assets/Images/Footer2.svg';

const Image = styled('img')(() => ({
  width: '100%',
  position: 'absolute',
  bottom: 0,
}));

export default () => (
  <>
    <Image src={Footer1} alt={''} />
    <Image src={Footer2} alt={''} />
  </>
);
