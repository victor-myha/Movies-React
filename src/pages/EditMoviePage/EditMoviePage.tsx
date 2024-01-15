import { FC, MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { moviesApi } from '../../api';
import { colors } from '../../assets/theme';
import { AppButton, AppInput, Header } from '../../commons';
import { getSafeFileName } from '../../pages/EditMoviePage/helpers';
import { APP_VALIDATION, STORAGE } from '../../utils/constants';
import { storage } from '../../utils/firebase';
import { ButtonsContainer, Content, EditWrapper } from './_components';
import UploadImage from './components/UploadImage';

type PropsType = {
  isNew?: boolean;
};

const EditMoviePage: FC<PropsType> = ({ isNew = false }) => {
  const [fileUrl, setFileUrl] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');

  const hiddenFileInput = useRef<HTMLElement | null>(null) as MutableRefObject<HTMLInputElement>;

  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width:720px)');

  const movie: MovieType = useMemo(() => location?.state || { title: '', id: 0, img: '', year: '' }, [location?.state]);

  useEffect(() => {
    if (movie.img) setFileUrl(movie.img);
  }, [movie.img]);

  const formik = useFormik({
    initialValues: { title: movie.title, year: movie.year },
    validationSchema: Yup.object({
      title: APP_VALIDATION.required,
      year: APP_VALIDATION.required,
    }),
    onSubmit: async values => {
      const { title, year } = values;
      const newMovie: MovieType = {
        ...(isNew ? {} : { id: movie.id }),
        title,
        year: Number(year),
        img: fileUrl || '',
      };

      await moviesApi.addEditMovie(newMovie, isNew);
      navigate('/');
    },
  });

  const onUpload = (fileUrl: string) => {
    setFileUrl(fileUrl);
  };

  const onSubmit = useCallback(() => {
    if (!uploadedFile) return;
    setIsLoading(true);

    console.log(uploadedFile);

    const safeFileName = getSafeFileName(uploadedFile.name);
    const storageRef = ref(storage, `${STORAGE.MOVIES}/${safeFileName}`);

    const uploadTask = uploadBytesResumable(storageRef, uploadedFile);

    uploadTask.on(
      'state_changed',
      () => {},
      error => setError(error.message),
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then(downloadURL => onUpload(downloadURL))
          .finally(() => setIsLoading(false));
      },
    );
  }, [uploadedFile]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit, uploadedFile]);

  const handleUploadClick = () => {
    if (!isLoading) {
      hiddenFileInput.current && hiddenFileInput.current.click();
    }
  };

  return (
    <>
      <Header>{isNew ? 'Create a new movie' : 'Edit'}</Header>
      <EditWrapper>
        {!isMobile && (
          <UploadImage
            hiddenFileInput={hiddenFileInput}
            fileUrl={fileUrl}
            uploadedFile={uploadedFile}
            setUploadedFile={setUploadedFile}
            handleUploadClick={handleUploadClick}
            error={error}
          />
        )}
        <Content>
          <AppInput
            variant={'outlined'}
            type='text'
            autoComplete={'off'}
            value={formik.values.title}
            placeholder={'Title'}
            onChange={formik.handleChange('title')}
            inputProps={{ sx: { color: colors.text, paddingLeft: '28px' } }}
          />
          <AppInput
            variant={'outlined'}
            type='number'
            autoComplete={'off'}
            value={formik.values.year}
            placeholder={'Publishing year'}
            onChange={formik.handleChange('year')}
            inputProps={{ sx: { color: colors.text, paddingLeft: '28px' } }}
          />
          {isMobile && (
            <UploadImage
              hiddenFileInput={hiddenFileInput}
              error={error}
              fileUrl={fileUrl}
              handleUploadClick={handleUploadClick}
              uploadedFile={uploadedFile}
              setUploadedFile={setUploadedFile}
            />
          )}
          <ButtonsContainer>
            <AppButton variant={'outlined'} sx={{ borderColor: colors.text }} onClick={() => navigate(-1)}>
              Cancel
            </AppButton>
            <AppButton variant={'contained'} disabled={isLoading} onClick={() => formik.handleSubmit()}>
              Submit
            </AppButton>
          </ButtonsContainer>
        </Content>
      </EditWrapper>
    </>
  );
};

export default EditMoviePage;
