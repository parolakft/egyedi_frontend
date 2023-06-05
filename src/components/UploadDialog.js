// ------------------------------------
// ------------ Parola Kft ------------
// ---------- info@parola.hu ----------
// ------------------------------------

import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, Divider } from '@mui/material';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from './Button';
import ImageUpload from './ImageUpload';
import { textNormalize } from '../utils/functions';

const ImageUploadDialog = ({ open, handleClose, data, title, onImageSubmit, deleteImage, kind, showError }) => {
  // Nem volt kezdőérték???
  const { imageUrl, ...rest } = data ? data : {};
  const [state, setState] = useState({ ...rest });
  const [image, setImage] = useState();
  const [imageName, setImageName] = useState();
  const [imagePreview, setImagePreview] = useState('');
  const [toDelete, setToDelete] = useState(false);

  const inputRef = useRef(null);

  const handleImageChange = (event) => {
    const maxFileSize = 10;
    const { files, value } = event.target;
    if (files[0] && files[0].size > maxFileSize * 1024 * 1024) {
      showError('error', 'Hiba!', `A maximum megengedett fájlméret ${maxFileSize}Mb.`);
      return;
    }

    setToDelete(false);
    setImageName(textNormalize(value));
    setImage(files[0]);
  };

  useEffect(() => {
    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result);
    };

    image && reader.readAsDataURL(image);
  }, [image]);

  const handleRemoveImage = async () => {
    setImage(null);
    setImagePreview('');
    setToDelete(true);
    inputRef.current.value = '';
  };

  const handleImageSubmit = () => {
    console.log('handle image', toDelete ? 'delete' : 'upload', state.id, imageName);
    toDelete ? deleteImage(state.id) : onImageSubmit(image, state.id, imageName);
  };

  useEffect(() => {
    setImagePreview('');
    if (data) {
      setState(data);
      data.hasImage && setImagePreview(`${process.env.REACT_APP_API_URL}/images/${kind}/${data.id}`);
    }
  }, [data,kind]);

  const dialogStyleWithImageUpload = { display: 'flex', flexWrap: 'wrap' };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth maxWidth="md">
        <DialogContent style={onImageSubmit && dialogStyleWithImageUpload}>
          <Title>{title}</Title>
          <StyledDivider />

          <Wrapper fullWidth>
            <ImageUpload
              handleImageChange={handleImageChange}
              handleRemoveImage={handleRemoveImage}
              imagePreviewUrl={imagePreview}
              inputRef={inputRef}
              removeText="Kép törlése"
              width="100%"
              height="400px"
            />
          </Wrapper>
          <StyledDivider style={{ marginTop: '16px' }} />
          <BottomRow>
            <Btn color="success" onClick={handleImageSubmit}>
              Kép mentése
            </Btn>
            <Btn color="info" onClick={handleClose}>
              Bezárás
            </Btn>
          </BottomRow>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageUploadDialog;

ImageUploadDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  data: PropTypes.shape({
    imageUrl: PropTypes.string,
  }),
  title: PropTypes.string.isRequired,
  onImageSubmit: PropTypes.func,
  deleteImage: PropTypes.func.isRequired,
  showError: PropTypes.func,
};

ImageUploadDialog.defaultProps = {
  data: {
    imageUrl: '',
  },
  onImageSubmit: null,
  showError: null,
};

const Wrapper = styled.div`
  max-width: ${(props) => (props.max ? props.max : '')};
  min-width: ${(props) => (props.min ? props.min : '')};
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  margin: 8px;
  flex-wrap: wrap;
`;

const Title = styled.p`
  font-size: 24px;
  margin: 8px;
  color: #949494;
  width: 100%;
`;

const StyledDivider = styled(Divider)`
  margin-bottom: 16px;
  width: 100%;
`;

const ButtonRow = styled.div`
  text-align: right;
  margin-top: 8px;
`;

const BottomRow = styled(ButtonRow)`
  width: 100%;
  margin-top: 0;
  margin-bottom: 8px;
`;

const Btn = styled(Button)`
  margin: 1rem 0 0 1rem !important;
`;
