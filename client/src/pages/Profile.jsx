import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { Link } from 'react-router-dom';

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Профиль</h1>
      <form className='flex flex-col gap-4'>
      <input
          onChange={(e) => setFile(e.target.files[0])}
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
        />
      <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt='profile'
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
        />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Ошибка загрузки (Изображение должно быть менее 2 мб)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Загрузка ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Изображение успешно добавлено!</span>
          ) : (
            ''
          )}
        </p>
        <input
          type='text'
          placeholder='Имя'
          defaultValue={currentUser.username}
          id='username'
          className='border p-3 rounded-xl'
          
        />
        <input
          type='email'
          placeholder='email'
          id='email'
          defaultValue={currentUser.email}
          className='border p-3 rounded-xl'
          
        />
        <input
          type='password'
          placeholder='password'
          
          id='password'
          className='border p-3 rounded-xl'
        />
        <button
          disabled={loading}
          className='border rounded-xl font-medium bg-gray-300 p-3 uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Загрузка...' : 'Обновить'}
        </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span
          
          className='text-red-700 cursor-pointer'
        >
          Выйти
        </span>
        <span  className='text-red-700 cursor-pointer'>
        Удалить аккаунт
        </span>
      </div>
    </div>
  )
}
