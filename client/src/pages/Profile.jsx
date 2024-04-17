import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();

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
      "state_changed",
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(data.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="p-3 max-w-lg flex flex-col justify-center mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Профиль</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Ошибка загрузки (Изображение должно быть менее 2 мб)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Загрузка ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">
              Изображение успешно добавлено!
            </span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="Имя"
          defaultValue={currentUser.username}
          id="username"
          className="border p-3 rounded-xl"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          defaultValue={currentUser.email}
          className="border p-3 rounded-xl"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          onChange={handleChange}
          id="password"
          className="border p-3 rounded-xl"
        />
        <button
          disabled={loading}
          className="border-2 rounded-xl font-medium  p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Загрузка..." : "Обновить профиль"}
        </button>
        <Link
          className="bg-blue-500 text-white p-3 rounded-xl uppercase text-center hover:opacity-95"
          to={"/create-listing"}
        >
          Создать объявление
        </Link>
      </form>
      <button
        onClick={handleShowListings}
        className="bg-blue-500 text-white p-3 mt-4  rounded-xl uppercase text-center hover:opacity-95 "
      >
        Активные объявления
      </button>

      <p className="text-green-700 mt-5 text-center">
        {updateSuccess ? "Данные пользователя обновлены!" : ""}
      </p>
      {userListings && userListings.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-center mt-7 mb-3 text-3xl font-semibold">
            Мои объявления
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="border rounded-xl  p-3 flex justify-between items-center gap-4"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="listing cover"
                  className="h-24 w-36 rounded-xl object-contain"
                />
              </Link>
              <Link
                className=" font-semibold   hover:underline truncate flex-1"
                to={`/listing/${listing._id}`}
              >
                <p className="text-sm text-slate-800 line-clamp-2">{listing.name}</p>
              </Link>

              <div className="flex flex-col item-center">
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className="bg-slate-800 text-white border rounded-xl text-sm p-1 uppercase"
                >
                  Удалить
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className="bg-blue-500 text-white mt-3 text-sm border p-1 rounded-xl uppercase">
                    Редактировать
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      <p className="text-red-700 mt-5">
        {showListingsError ? "Ошибка в загрузке объявлений" : ""}
      </p>
      <div className="flex justify-between mt-3 mb-6">
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
          Выйти
        </span>
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer"
        >
          Удалить аккаунт
        </span>
      </div>
    </div>
  );
}
