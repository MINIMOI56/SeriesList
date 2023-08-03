import { useParams } from 'react-router-dom';
import './index.css';
import MediaInfo from './components/media_info/media-info';

export default function Index() {
  let { id } = useParams();
  console.log(id);

  return (
    <div className='home-page'>
      <section className='home-title'>
        <div>
          <MediaInfo id={id} />
        </div>
      </section>
    </div>
  );
}