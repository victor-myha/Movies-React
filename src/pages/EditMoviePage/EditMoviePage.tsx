import { FC, MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { IconDownload } from '../../assets/icons';
import { colors } from '../../assets/theme';
import { AppButton, AppInput, Header } from '../../commons';
import { APP_VALIDATION, MAX_FILE_SIZE, STORAGE } from '../../utils/constants';
import { storage } from '../../utils/firebase';
import { Content, EditWrapper, Error, UploadButton } from './_components';
import { getSafeFileName } from './helpers';

const bathPath = 'http://moviesapp-env.eba-ye28mqew.us-east-1.elasticbeanstalk.com/';
type PropsType = {
  isNew: boolean;
};

const addEditMovie = async (movie: MovieType, navigate: NavigateFunction, isNew: boolean) => {
  const path = isNew ? 'movies/create' : 'movies/edit';
  const response = await fetch(`${bathPath}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movie),
  });

  const data = await response.json();
  console.log('Upload Movie:', data);
  navigate('/');
};

const EditMoviePage: FC<PropsType> = ({ isNew }) => {
  const hiddenFileInput = useRef<HTMLElement | null>(null) as MutableRefObject<HTMLInputElement>;
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isFileToLarge = (uploadedFile?.size || 0) > MAX_FILE_SIZE;
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: '',
      year: '',
    },
    validationSchema: Yup.object({
      title: APP_VALIDATION.required,
      year: APP_VALIDATION.required,
    }),
    onSubmit: async values => {
      const { title, year } = values;
      await addEditMovie(
        { ...(isNew ? {} : { id: 1 }), title, year: Number(year), img: fileUrl || '' },
        navigate,
        isNew,
      );
    },
  });

  const onUpload = (fileUrl: string) => {
    setFileUrl(fileUrl);
    console.log(fileUrl);
  };

  const onSubmit = useCallback(() => {
    if (!uploadedFile) return;
    setIsLoading(true);

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
    <EditWrapper>
      <div>
        <Header>{isNew ? 'Create a new movie' : 'Edit'}</Header>
        <UploadButton onClick={handleUploadClick}>
          {!fileUrl && <h6>Drop an image here</h6>}
          <IconDownload />
          {isFileToLarge && <Error>Max file size 5 Mb</Error>}
          {error && <Error>{error}</Error>}
        </UploadButton>
        <img alt='' src={fileUrl} style={{ width: '200px', aspectRatio: 1 }} />
        <input
          type='file'
          accept='image/*'
          ref={hiddenFileInput}
          style={{ display: 'none' }}
          onChange={file => !!file.target.files && setUploadedFile(file.target.files[0] || null)}
        />
      </div>
      <Content>
        <AppInput
          variant={'outlined'}
          inputMode={'text'}
          value={formik.values.title}
          placeholder={'Title'}
          onChange={formik.handleChange('title')}
          inputProps={{ sx: { color: colors.text, paddingLeft: '28px' } }}
        />
        <AppInput
          variant={'outlined'}
          inputMode={'text'}
          value={formik.values.year}
          placeholder={'Publishing year'}
          onChange={formik.handleChange('year')}
          inputProps={{ sx: { color: colors.text, paddingLeft: '28px' } }}
        />

        <AppButton
          variant={'contained'}
          disabled={isLoading}
          onClick={() => {
            formik.handleSubmit();
          }}
        >
          Submit
        </AppButton>
      </Content>
    </EditWrapper>
  );
};

export default EditMoviePage;
