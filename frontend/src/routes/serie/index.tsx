import { useParams } from 'react-router-dom';
import './index.css';
import MediaInfo from './components/media_info/media-info';
import MediaComments from './components/media_comments/media-comments';

export default function Index() {
  let { id } = useParams();

  return (
    <div className='serie-page'>
      <div>
          <MediaInfo id={id} />
          <MediaComments id={id} />
      </div>
    </div>
  );
}