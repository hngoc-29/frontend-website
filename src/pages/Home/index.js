import {
  useEffect,
  useState
} from 'react';
import axios from '../../util/axios.req';
import {
  toast
} from 'react-toastify';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
const cx = classNames.bind(styles);
function Home() {
  const [banners,
    setBanners] = useState([]);
  useEffect(()=> {
    const fetchBanner = async () => {
      try {
        const res = await axios.getBanner();
        if (res.data.success) {
          const {
            listBanner
          } = res.data;
          setBanners(listBanner);
        } else {
          toast.error(res.data?.message);
        }
      } catch (error) {
        toast.error('Đã xảy ra lỗi');
      }
    };
    fetchBanner();
  },
    [])
  console.log(banners)
  return(
    <div className={cx('home')}>
      {
      banners.map(item => (
        <div className={cx('category')} key={`id-${item._id}`}>
          <div className={cx('image')}>
            <img className={cx('bannerImage')} src={item.image_url} />
        </div>
        <div className={cx('content')}>
          <h3 className={cx('title')}>{item.title}</h3>
          <div className={cx('numberOfTracks')}>
            <i class="fa-solid fa-circle-play">  {item.number_of_tracks}</i>
          </div>
        </div>
      </div>
      ))}
  </div>
)
}
export default Home;