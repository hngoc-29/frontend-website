import {
  useContext,
  useState,
  useRef
} from 'react';
import classNames from 'classnames/bind';
import {
  toast
} from 'react-toastify';
import styles from './UpdateInfo.module.scss';
import {
  AuthContext
} from '../../components/context/auth.context';
import '../../assets/css/close.scss';
import axios from '../../util/axios.req';
const cx = classNames.bind(styles);
function UpdateInfo(props) {
  const [loading,
    setLoading] = useState(false);
  const [newAvata,
    setNewAvata] = useState(null);
  const btn = useRef();
  const {
    setShowUpdate,
    typeUpdate
  } = props;
  const {
    auth,
    setAuth
  } = useContext(AuthContext);
  const [changeInput,
    setChangeInput] = useState( {
      name: auth.user.name,
      username: auth.user.username,
      avata: auth.user.avata,
      password: '',
      newPassword: ''
    })
  const handleClickUpdate = (event)=> {
    event.stopPropagation()
  }
  const handleClose = () => {
    if (!loading) {
      setShowUpdate(false)
    } else {
      toast.warning('Vui lòng đợi')
    }
  }
  const updateAvata = async()=> {
    try {
      if(!newAvata) {
        toast.error('Vui lòng chọn avata')
        return
      }
      setLoading(true)
      btn.current.disabled = true;
      const res = await axios.updateAvata(auth.user.id, {
        avata: newAvata
      });
      setAuth({
        isAuthenticated: true,
        user: {
          ...auth.user,
          avata: res?.data?.user?.image??''
        }
      });
      toast.success(res?.data?.message)
    } catch(err) {
      toast.error(err?.response?.data?.message)
    }
    setLoading(false);
    btn.current.disabled = false;
  };
  const handleUpdate = async (type) => {
    const changeValue = {
      name: auth.user.name,
      username: auth.user.username,
      avata: auth.user.avata
    };
    if (type === 'name') {
      changeValue.username = auth.user.username;
      changeValue.avata = auth.user.avata;
      if (changeInput.name.trim() !== auth.user.name) {
        changeValue.name = changeInput.name.trim();
      } else {
        toast.error('Vui lòng nhập tên mới');
        return;
      }
    } else if (type === 'username') {
      changeValue.name = auth.user.name;
      changeValue.avata = auth.user.avata;
      if (changeInput.username.trim() !== auth.user.username) {
        changeValue.username = (changeInput.username).trim();
      } else {
        toast.error('Vui lòng nhập tên người dùng mới');
        return;
      }
    }
    btn.current.disabled = true;
    setLoading(true);
    try {
      const res = await axios.updateInfo(auth.user.id, changeValue);
      if (res.data.success) {
        toast.success(res.data.message)
        setAuth({
          isAuthenticated: true,
          user: {
            id: res?.data?.user?._id??null,
            name: res?.data?.user?.name??'',
            username: res?.data?.user?.username??'',
            email: res?.data?.user?.email??'',
            role: res?.data?.user?.role??'',
            avata: res?.data?.user?.image??''
          }
        });
        setShowUpdate(false);
      } else {
        toast.error(res.data.message)
      }
    } catch(err) {
      if (err?.response?.data?.message) {
        toast.error(err?.response?.data?.message);
      } else {
        toast.error('Lỗi không xác định');
      }
    }
    btn.current.disabled = false;
    setLoading(false);
  }
  const changeAvata = async(e)=> {
    const avata = e.target.files[0];
    setNewAvata(avata);
    const avata_url = URL.createObjectURL(avata)
    setChangeInput({
      ...changeInput, avata: avata_url
    });
  };
  const changePassword = async() => {
    const {
      password,
      newPassword
    } = changeInput;
    if (password.trim() === '') {
      toast.error('Vui lòng nhập mật khẩu hiện tại');
      return;
    };
    if (newPassword.trim() === '') {
      toast.error('Vui lòng nhập mật khẩu mới');
      return;
    }
    if (password.trim() === newPassword.trim()) {
      toast.error('Mật khẩu mới phải khác mật khẩu hiện tại');
      return;
    }
    if (password.trim().length < 6) {
      toast.error('Mật khẩu hiện tại sai');
      return
    }
    if (newPassword.trim().length < 6) {
      toast.error('Mật khẩu mới phải >= 6 kí tự')
      return
    }
    setLoading(true);
    btn.current.disabled = true;
    try {
      const res = await axios.updatePassword(auth.user.id, {
        password, newPassword
      })
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message)
      }
    } catch(err) {
      if (err?.response?.data?.message) {
        toast.error(err?.response?.data?.message)
      } else {
        toast.error('Lỗi không xác định')
      }
    }
    btn.current.disabled = false;
    setLoading(false);
  };
  return (
    <div className={cx('updateInfo')} onClick={handleClose}>
      {typeUpdate === 'name'?(
        <div onClick={handleClickUpdate} className={cx('update')}>
          <i onClick={handleClose} className="fa-solid fa-xmark"></i>
          <h3 className={cx('title')}>Chỉnh sửa tên</h3>
          <input value={changeInput.name}
          onChange={e=>setChangeInput({
            ...changeInput,
            name: e.target.value })}
          placeholder='Nhập tên mới' />
        <button ref={btn} onClick={()=> { handleUpdate('name')}}>{loading ? <i className="fa-solid fa-spinner"></i>: <span>Xác nhận</span>}</button>
      </div>
    ): typeUpdate === 'username'?(
      <div onClick={handleClickUpdate} className={cx('update')}>
        <i onClick={handleClose} className="fa-solid fa-xmark"></i>
        <h3 className={cx('title')}>Chỉnh sửa tên người dùng</h3>
        <input value={changeInput.username}
        onChange={e=>setChangeInput({
          ...changeInput,
          username: e.target.value })}
        placeholder='Nhập tên người dùng mới' />
      <button ref={btn} onClick={()=> { handleUpdate('username')}}>{loading ? <i className="fa-solid fa-spinner"></i>: <span>Xác nhận</span>}</button>
    </div>
  ): typeUpdate === 'avata'?(
    <div onClick={handleClickUpdate} className={cx('update')}>
      <i onClick={handleClose} className="fa-solid fa-xmark"></i>
      <h3 className={cx('title')}>Chỉnh sửa ảnh đại diện</h3>
      <img src={changeInput.avata} alt='avata' />
    <input accept="image/*" type='file' onChange={changeAvata} />
  <button onClick={updateAvata} ref={btn}>{loading ? <i className="fa-solid fa-spinner"></i>: <span>Xác nhận</span>}</button>
</div>
): (
<div onClick={handleClickUpdate} className={cx('update')}>
  <i onClick={handleClose} className="fa-solid fa-xmark"></i>
  <h3 className={cx('title')}>Đổi mật khẩu</h3>
  <input type='password' value={changeInput.password}
  onChange={e=>setChangeInput({
    ...changeInput,
    password: e.target.value })} placeholder='Nhập mật khẩu hiện tại' />
<input type='password' value={changeInput.newPassword}
onChange={e=>setChangeInput({
  ...changeInput,
  newPassword: e.target.value })} placeholder='Nhập mật khẩu mới' />
<button ref={btn} onClick={changePassword}>{loading ? <i className="fa-solid fa-spinner"></i>: <span>Xác nhận</span>}</button>
</div>
)}
</div>
)
}
export default UpdateInfo;