import PopularMediaList from './components/popular_media_list/popular_media_list';
import NewestMediaList from './components/newest_media_list/newest_media_list';
import './index.css';

export default function Index() {
  return (
    <div className='home-page'>
      <section className='home-title'>
        <div>
          <PopularMediaList/>
          <NewestMediaList/>
        </div>
      </section>
    </div>
  );
}