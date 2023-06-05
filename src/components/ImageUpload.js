// ------------------------------------
// ------------ Parola Kft ------------
// ---------- info@parola.hu ----------
// ------------------------------------

import React from 'react';
import styled from 'styled-components';
import BackupIcon from '@mui/icons-material/Backup';
import PropTypes from 'prop-types';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Button from './Button';

const ImageUpload = ({ imagePreviewUrl, handleImageChange, handleRemoveImage, inputRef, removeText, defaultImg, ...rest }) => {
  let imagePreview = null;

  if (imagePreviewUrl) {
    imagePreview = <img alt="preview" src={imagePreviewUrl} />;
  } else {
    imagePreview = (
      <PreviewText>
        Kérjük válasszon ki egy képet a megtekintéshez <BackupIcon />
      </PreviewText>
    );
  }

  const dis = defaultImg || !(imagePreviewUrl && handleRemoveImage);

  return (
    <Root>
      <ImgPreviewBox className="imgPreview" {...rest}>
        <AddImgButton component="label">
          <AddPhotoAlternateIcon />
          Kép tallózása
          <input ref={inputRef} type="file" style={{ display: 'none' }} onChange={handleImageChange} />
        </AddImgButton>
        {imagePreview}
        <RemoveImgButton color="secondary" onClick={handleRemoveImage} component="button" disabled={dis}>
          {removeText}
        </RemoveImgButton>
      </ImgPreviewBox>
    </Root>
  );
};

export default ImageUpload;

ImageUpload.propTypes = {
  imagePreviewUrl: PropTypes.string.isRequired,
  handleImageChange: PropTypes.func.isRequired,
  handleRemoveImage: PropTypes.func,
  inputRef: PropTypes.node,
  removeText: PropTypes.string,
  defaultImg: PropTypes.bool,
};

ImageUpload.defaultProps = {
  handleRemoveImage: null,
  inputRef: null,
  removeText: 'Törlés',
  defaultImg: false,
};

const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 4px;
`;

const ImgPreviewBox = styled.div`
  height: ${(props) => (props.height ? props.height : '268px')};
  width: ${(props) => (props.width ? props.width : '460px')};
  border: 1px solid silver;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 0 20px;

  & img {
    max-width: 100%;
    height: 'auto';
    max-height: 100%;
  }
`;

const PreviewText = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: grey;

  & .MuiSvgIcon-root {
    width: 42px;
    height: 42px;
  }
`;

const AddImgButton = styled(Button)`
  position: absolute;
  top: 0;
  left: 0;
`;

const RemoveImgButton = styled(Button)`
  position: absolute;
  bottom: 0;
  left: 0;
`;
