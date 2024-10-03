import classNames from "classnames/bind";
import styles from './Below.module.scss';
import {
  Link,
  useLocation
} from "react-router-dom";
import {
  useRef
} from "react";
import {
  useEffect
} from "react";
const cx = classNames.bind(styles)
function Below() {
  const home = useRef()
  const important = useRef()
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/') {
      home.current.style.color = '#ff8f26'
      important.current.style.color = '#000'
    }
    if (location.pathname === '/important') {
      home.current.style.color = '#000'
      important.current.style.color = '#ff8f26'
    }
  },
    [location.pathname])

  return (
    <div className={cx('below')}>
      <Link to='/'>
        <div className={cx('belowElement')}>
          <i ref={home} className="fa-solid fa-house"></i>
          <span>Trang chủ</span>

        </div>
      </Link>
      <Link to='/important'>
        <div className={cx('belowElement')}>
          <i ref={important} className="fa-solid fa-lock"></i>
          <span>Quan trọng</span>

        </div>
      </Link>
    </div>
  )
}
export default Below;