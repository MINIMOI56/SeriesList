import PopularMediaList from './components/popular_media_list/popular_media_list';
import NewestMediaList from './components/newest_media_list/newest_media_list';
import './index.css';

export default function Index() {
  return (
    <div className='home-page'>
        <div>
          <PopularMediaList/>
          <hr/>
          <NewestMediaList/>
        </div>
    </div>
  );
}