import Modal from 'components/Atoms/Modal';
import Input from 'components/Atoms/Input';
import useAuth from 'hooks/useAuth';
import useMutation from 'hooks/useMutation';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

const AddProductModal = ({
  isOpen,
  onCancel,
  onRefresh,
  isUpdate = false,
  product = null,
}) => {
  const { token } = useAuth().checkAuth();
  const [urlImage, setUrlImage] = useState(
    'https://res.cloudinary.com/project-tpis/image/upload/v1654393909/assets/select-image-260nw-520051081_gzcreb.png'
  );
  const [createOrUpdatePet, { loading: loadingAddOrUpdatePet }] = useMutation(
    isUpdate ? `/products/${product?.id}` : '/products',
    {
      method: isUpdate ? 'put' : 'post', // post = create, put = update
      refresh: async () => {
        onCancel();
        await onRefresh();
      },
      headers: {
        'Content-Type': 'multipart/form-data',
        'auth-token': token,
      },
    }
  );

  useEffect(() => {
    if (isUpdate) {
      setUrlImage(product?.image?.secure_url);
    } else {
      setUrlImage(
        'https://res.cloudinary.com/project-tpis/image/upload/v1654393909/assets/select-image-260nw-520051081_gzcreb.png'
      );
    }
  }, [isUpdate, product]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const image = e.target.image.files[0];
    let bodyFormData = new FormData();
    bodyFormData.append('name', name);
    bodyFormData.append('image', image);
    await createOrUpdatePet({
      data: bodyFormData,
    });
    setUrlImage(
      'https://res.cloudinary.com/project-tpis/image/upload/v1654393909/assets/select-image-260nw-520051081_gzcreb.png'
    );
  };

  const ChangeImage = (e) => {
    const image = e.target.files[0];
    const imagePreview = URL.createObjectURL(image);
    setUrlImage(imagePreview);
  };

  return (
    <Modal
      width={400}
      isOpen={isOpen}
      onCancel={() => {
        onCancel();
        setUrlImage(
          'https://res.cloudinary.com/project-tpis/image/upload/v1654393909/assets/select-image-260nw-520051081_gzcreb.png'
        );
      }}
      title={isUpdate ? 'Edit Pet' : 'Add Pet'}
      okText={isUpdate ? 'Edit' : 'Save'}
      okProps={{
        type: 'submit',
        form: 'form-product',
        loading: loadingAddOrUpdatePet,
      }}
    >
      <form id="form-product" method="POST" onSubmit={onSubmit}>
        <Input
          name="name"
          placeholder="Name"
          type="text"
          defaultValue={product?.name}
          required
        />
        <Input
          display="none"
          id={'image'}
          name="image"
          type="file"
          onChange={ChangeImage}
          accept="image/*"
        />
      </form>
      <H2>Image</H2>
      <ImagePreview
        src={urlImage}
        alt={product?.name}
        onClick={() => {
          document.getElementById('image').click();
        }}
      />
    </Modal>
  );
};

const ImagePreview = styled.img`
  width: 100%;
  height: auto;
`;

const H2 = styled.h2`
  font-size: 1.5rem;
  margin: 12px;
  text-align: center;
  color: ${({ theme }) => theme.colors.black};
`;

export default AddProductModal;
