import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function CreateListing() {
    
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });

  return (
    <div><main className='p-3 max-w-4xl mx-auto'>
    <h1 className='text-3xl font-semibold text-center my-7'>
      Создать объявление
    </h1>
    <form  className='flex flex-col sm:flex-row gap-4'>
      <div className='flex flex-col gap-4 flex-1'>
        <input
          type='text'
          placeholder='Название'
          className='border p-3 rounded-xl'
          id='name'
          maxLength='62'
          minLength='10'
          required
          
        />
        <textarea
          type='text'
          placeholder='Описание'
          className='border p-3 rounded-xl'
          id='description'
          required
          
        />
        <input
          type='text'
          placeholder='Адрес'
          className='border p-3 rounded-xl'
          id='address'
          required
          
        />
        <div className='flex gap-6 flex-wrap'>
          <div className='flex gap-2'>
            <input
              type='checkbox'
              id='sale'
              className='w-5'
              
            />
            <span>Продажа</span>
          </div>
          <div className='flex gap-2'>
            <input
              type='checkbox'
              id='rent'
              className='w-5'
              
            />
            <span>Аренда</span>
          </div>
          <div className='flex gap-2'>
            <input
              type='checkbox'
              id='parking'
              className='w-5'
              
            />
            <span>Парковочное место</span>
          </div>
          <div className='flex gap-2'>
            <input
              type='checkbox'
              id='furnished'
              className='w-5'
              
            />
            <span>Мебель</span>
          </div>
          <div className='flex gap-2'>
            <input
              type='checkbox'
              id='offer'
              className='w-5'
              
            />
            <span>Скидка</span>
          </div>
        </div>
        <div className='flex flex-wrap gap-6'>
          <div className='flex items-center gap-2'>
            <input
              type='number'
              id='bedrooms'
              min='1'
              max='10'
              required
              className='p-3 border border-gray-300 rounded-xl'
              
            />
            <p>Комнаты</p>
          </div>
          <div className='flex items-center gap-2'>
            <input
              type='number'
              id='bathrooms'
              min='1'
              max='10'
              required
              className='p-3 border border-gray-300 rounded-xl'
              
            />
            <p>Ванная</p>
          </div>
          <div className='flex items-center gap-2'>
            <input
              type='number'
              id='regularPrice'
              min='50'
              max='10000000'
              required
              className='p-3 border border-gray-300 rounded-xl'
              
            />
            <div className='flex flex-col items-center'>
              <p>Цена</p>
              {formData.type === 'rent' && (
                <span className='text-xs'>(Руб. / месяц)</span>
              )}
            </div>
          </div>
          {formData.offer && (
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='discountPrice'
                min='0'
                max='10000000'
                required
                className='p-3 border border-gray-300 rounded-xl'
                
              />
              <div className='flex flex-col items-center'>
                <p>Цена со скидкой</p>

                {formData.type === 'rent' && (
                  <span className='text-xs'>($ / месяц)</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='flex flex-col flex-1 gap-4'>
        <p className='font-semibold'>
          Изображения:
          <span className='font-normal text-gray-600 ml-2'>
           Первое изображение будет обложкой (максимум 6)
          </span>
        </p>
        <div className='flex gap-4'>
          <input
            
            className='p-3 border border-gray-300 rounded w-full'
            type='file'
            id='images'
            accept='image/*'
            multiple
          />
          <button
            type='button'
            
            className='p-3  border border-blue-500 rounded-xl uppercase hover:shadow-lg disabled:opacity-80'
          >
           Загрузить
          </button>
        </div>
        <p className='text-red-700 text-sm'>
          
        </p>
        {formData.imageUrls.length > 0 &&
          formData.imageUrls.map((url, index) => (
            <div
              key={url}
              className='flex justify-between p-3 border items-center'
            >
              <img
                src={url}
                alt='listing image'
                className='w-20 h-20 object-contain rounded-xl'
              />
              <button
                type='button'
                
                className='p-3 text-red-700 rounded-xl uppercase hover:opacity-75'
              >
                Удалить
              </button>
            </div>
          ))}
        <button
          
          className='p-3 bg-blue-500 text-white rounded-xl uppercase hover:opacity-95 disabled:opacity-80'
        >
          Создать
        </button>
        
      </div>
    </form>
  </main></div>
  )
}
