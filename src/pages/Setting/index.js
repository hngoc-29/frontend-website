import classNames from 'classnames/bind';
import styles from './Setting.module.scss';
import {
  useNavigate,
} from 'react-router-dom';
import {
  AuthContext
} from '../../components/context/auth.context';
import UpdateInfo from '../UpdateInfo';
import {
  useContext,
  useEffect,
  useState
} from 'react';
const cx = classNames.bind(styles);
function Setting() {
  const navigate = useNavigate();
  const {
    auth,
  } = useContext(AuthContext);
  const [showUpdate,
    setShowUpdate] = useState(false);
  const [typeUpdate,
    setTypeUpdate] = useState('');
  useEffect(()=> {
    if (!auth.isAuthenticated) {
      navigate('/');
    }
  })
  return(
    <div className={cx('Setting')}>
      <h2 className={cx('title')}>Thông tin cá nhân</h2>
      <div className={cx('info')}>

        <div className={cx('inUser')} onClick={()=> { setShowUpdate(true)
          setTypeUpdate('name')}}>
          <div className={cx('between')}>
            <h4 className={cx('name-title')}>Họ tên</h4>
            <p className={cx('name_p')}>
              {auth.user.name}
            </p>
          </div>
          <i className="fa-solid fa-chevron-right"></i>
        </div>

        <div className={cx('inUser')} onClick={()=> { setShowUpdate(true)
          setTypeUpdate('username')}}>
          <div className={cx('between')}>
            <h4 className={cx('username-title')}>Tên người dùng</h4>
            <p className={cx('username_p')}>
              {auth.user.username}
            </p>
          </div>
          <i className="fa-solid fa-chevron-right"></i>
        </div>
        <div className={cx('inUser')} onClick={()=> { setShowUpdate(true)
          setTypeUpdate('avata')}}>
          <div className={cx('between')}>
            <h4 className={cx('avata-title')}>Ảnh đại diện</h4>
            <img src={auth.user.avata} className={cx('avata')}></img>
          </div>
          <i className="fa-solid fa-chevron-right"></i>
        </div>
      </div>
      <h2 className={cx('title')}>Bảo mật</h2>
      <div className={cx('info')}>
        <div className={cx('inUser')} onClick={()=> { setShowUpdate(true)
          setTypeUpdate('password')}}>
          <div className={cx('between')}>
            <h4 className={cx('changePassword')}>Đổi mật khẩu</h4>
          </div>
          <i className="fa-solid fa-chevron-right"></i>
        </div>
      </div>
      {showUpdate && (<UpdateInfo setShowUpdate={setShowUpdate} typeUpdate={typeUpdate} />)}
    </div>
  )
};

export default Setting;