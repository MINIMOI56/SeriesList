import { useState } from 'react';
import Media from '../../../../models/media';
import Modal from 'react-bootstrap/Modal';

function MediaDialog({ media }: { media: Media }, { lgShow }: {lgShow: boolean}) {

  return (
    <>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => lgShow = false}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            {media.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <img src={media.image_url} alt={media.title} className='media-card' />
            <p>
                {media.description}
            </p>
            <p>
                {media.start_date.getDate()} - {media.end_date.getDate()}
            </p>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default MediaDialog;