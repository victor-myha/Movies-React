import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Checkbox, FormControlLabel } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { userApi } from '../../api';
import { colors } from '../../assets/theme';
import { AppButton, AppInput } from '../../commons';
import { auth } from '../../store/userReducer/userSlice';
import { APP_STORE, APP_VALIDATION } from '../../utils/constants';
import { useAppDispatch } from '../../utils/hooks';
import { ChangeAuthLink, ContentCenter, Error } from './_components';

type PropsType = {
  isRegistration?: boolean;
};

const AuthPage: FC<PropsType> = ({ isRegistration = false }) => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isRemember, setIsRemember] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onAuth = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      let user: UserType = isRegistration
        ? await userApi.signUp({ password, email })
        : await userApi.signIn({ password, email });

      if (isRemember) {
        localStorage.setItem(APP_STORE.USER, JSON.stringify(user));
      }

      dispatch(auth(user));
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      ...(isRegistration ? { confirmPassword: '' } : {}),
    },
    validationSchema: Yup.object({
      email: APP_VALIDATION.email,
      password: APP_VALIDATION.password,
      ...(isRegistration ? { confirmPassword: APP_VALIDATION.confirmPassword } : {}),
    }),
    onSubmit: async values => {
      const { email, password } = values;
      await onAuth(email, password);
    },
  });

  return (
    <ContentCenter>
      <h1>{isRegistration ? 'Sign up' : 'Sign in'}</h1>
      <AppInput
        variant={'outlined'}
        inputMode={'email'}
        error={isSubmitted && !!formik.errors.email}
        value={formik.values.email}
        placeholder={'Email'}
        onChange={formik.handleChange('email')}
        helperText={isSubmitted && formik.errors.email}
        inputProps={{ sx: { color: colors.text, paddingLeft: '28px' } }}
      />
      <AppInput
        variant={'outlined'}
        type={'password'}
        error={isSubmitted && !!formik.errors.password}
        value={formik.values.password}
        placeholder={'Password'}
        onChange={formik.handleChange('password')}
        helperText={isSubmitted && formik.errors.password}
        inputProps={{ sx: { color: colors.text, paddingLeft: '28px' } }}
      />
      {isRegistration && (
        <AppInput
          variant={'outlined'}
          type={'confirmPassword'}
          error={isSubmitted && !!formik.errors.confirmPassword}
          value={formik.values.confirmPassword}
          placeholder={'Confirm Password'}
          onChange={formik.handleChange('confirmPassword')}
          helperText={isSubmitted && formik.errors.confirmPassword}
          inputProps={{ sx: { color: colors.text, paddingLeft: '28px' } }}
        />
      )}
      {error && <Error>{error}</Error>}
      <FormControlLabel
        control={<Checkbox checked={isRemember} onChange={() => setIsRemember(p => !p)} />}
        label={'Remember me'}
      />
      <AppButton
        variant={'contained'}
        disabled={isLoading}
        onClick={() => {
          setIsSubmitted(true);
          formik.handleSubmit();
        }}
      >
        {isRegistration ? 'Register' : 'Login'}
      </AppButton>
      <ChangeAuthLink onClick={() => navigate(isRegistration ? '/sign-in' : '/sign-up')}>
        {!isRegistration ? 'Register' : 'Login'}
      </ChangeAuthLink>
    </ContentCenter>
  );
};

export default AuthPage;
