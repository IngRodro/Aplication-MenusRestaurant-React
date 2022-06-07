import Modal from 'components/Atoms/Modal';
import Input from 'components/Atoms/Input';
import useAuth from 'hooks/useAuth';
import useMutation from 'hooks/useMutation';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Button from '../../../Atoms/Button';

const AddMenuOptionModal = ({
  isOpen,
  onCancel,
  onRefresh,
  isUpdate = false,
  menu = null,
}) => {
  const [products, setProducts] = useState(1);
  const [arrayProducts, setArrayProducts] = useState([
    { id: '1', name: '123' },
    { id: '2', name: '12' },
  ]);
  const { token } = useAuth().checkAuth();

  const [createOrUpdateMenus, { loading: loadingAddOrUpdatePet }] = useMutation(
    isUpdate ? `/menu/${menu?.id}` : '/menu',
    {
      method: isUpdate ? 'put' : 'post', // post = create, put = update
      refresh: async () => {
        onCancel();
        await onRefresh();
      },
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token,
      },
    }
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const image = e.target.image.files[0];
    let bodyFormData = new FormData();
    bodyFormData.append('name', name);
    bodyFormData.append('image', image);
    await createOrUpdateMenus({
      data: bodyFormData,
    });
  };

  const onAddProduct = () => {
    setProducts((prevState) => prevState + 1);
    setArrayProducts((prevState) => [...prevState, { id: products, name: '' }]);
  };

  console.log(arrayProducts);

  return (
    <Modal
      width={400}
      isOpen={isOpen}
      onCancel={() => {
        setProducts(1);
        setArrayProducts([]);
        onCancel();
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
        <Input name="name" placeholder="Name" type="text" required />
        {arrayProducts.length > 0 &&
          arrayProducts.map((arrayProduct) => (
            <div key={arrayProduct.id}>
              <p>{arrayProduct.name}</p>
              <Input type={'number'} placeholder={'quantity'} />
            </div>
          ))}
      </form>
      <Button onClick={() => onAddProduct()}>Add</Button>
    </Modal>
  );
};

export default AddMenuOptionModal;
