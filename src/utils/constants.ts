import * as Yup from 'yup';

export const DEV_FLAGS = {
  IS_AUTH: false,
};
export const MAX_FILE_SIZE = 1000000 * 5;

export enum APP_STORE {
  USER = 'user',
}

export enum STORAGE {
  MOVIES = 'movies',
}

export const APP_VALIDATION = {
  userName: Yup.string().min(2, 'Must be minimum ${min} characters').required('Required field'),
  required: Yup.string().required('Required field'),
  email: Yup.string().email().required('Required field'),
  password: Yup.string()
    // .min(8, 'Must be minimum ${min} characters')
    // .matches(/[0-9]/, 'Password requires a number')
    // .matches(/[a-z]/, 'Password requires a lowercase letter')
    // .matches(/[A-Z]/, 'Password requires an uppercase letter')
    // .matches(/[^\w]/, 'Password requires a symbol')
    .required('Required field'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Required field'),
};
