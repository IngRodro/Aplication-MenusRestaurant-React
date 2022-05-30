import Modal from 'components/Atoms/Modal';
import Input from 'components/Atoms/Input';
import { SaveButton } from './style';
import axios from 'axios';
import Cookies from 'universal-cookie';
const baseUrl = `${process.env.REACT_APP_API_URL}/v1`;
const cookies = new Cookies();

const AddProductModal = ({ isOpen, onCancel }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    let bodyFormData = new FormData();
    if (e.target.name.value) {
      bodyFormData.append('name', e.target.name.value);
    }
    if (e.target.image.value) {
      console.log(e.target.image.files[0]);
      bodyFormData.append('image', e.target.image.files[0]);
    }
    axios({
      method: 'post',
      url: `${baseUrl}/products`,
      data: bodyFormData,
      headers: {
        'Content-Type': 'multipart/form-data',
        'auth-token': cookies.get('token'),
      },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (response) {
        console.log(response);
      });
  };

  return (
    <Modal width={400} isOpen={isOpen} onCancel={onCancel} title="Add Pets">
      <form method="POST" onSubmit={onSubmit}>
        <Input name="name" placeholder="Name" type="text" required />
        <Input name="image" type="file" required />
        <SaveButton type="submit">Save</SaveButton>
      </form>
    </Modal>
  );
};

export default AddProductModal;
