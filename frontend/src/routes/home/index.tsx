import PopularMediaList from './components/popular_media_list/popular_media_list';
import './index.css';

export default function Index() {
  return (
    <div className='home-page'>
      <section className='home-title'>
        <h2>Hello World</h2>
        <div className='liste-evenements'>
          <PopularMediaList/>
        </div>
      </section>
    </div>
  );
}