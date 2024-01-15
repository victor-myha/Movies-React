import { RefObject } from 'react';
import { IconDownload } from '../../../assets/icons';
import { MAX_FILE_SIZE } from '../../../utils/constants';
import { Error, Image, ImageContainer, UploadButton } from '../_components';

type Props = {
  fileUrl: string | undefined;
  error: string | null;
  hiddenFileInput: RefObject<HTMLInputElement>;
  uploadedFile: File | null;
  handleUploadClick: () => void;
  setUploadedFile: (uploadedFile: File | null) => void;
};

export default ({ error, fileUrl, hiddenFileInput, handleUploadClick, uploadedFile, setUploadedFile }: Props) => {
  const isFileToLarge = (uploadedFile?.size || 0) > MAX_FILE_SIZE;

  return (
    <ImageContainer>
      {!fileUrl ? (
        <UploadButton onClick={handleUploadClick}>
          <h6>Drop an image here</h6>
          <IconDownload />
        </UploadButton>
      ) : (
        <Image alt='' src={fileUrl} onClick={handleUploadClick} />
      )}
      {isFileToLarge && <Error>Max file size 5 Mb</Error>}
      {error && <Error>{error}</Error>}
      <input
        type='file'
        accept='image/*'
        ref={hiddenFileInput}
        style={{ display: 'none' }}
        onChange={file => {
          console.log({ file });
          !!file.target.files && setUploadedFile(file.target.files[0] || null);
        }}
      />
    </ImageContainer>
  );
};
