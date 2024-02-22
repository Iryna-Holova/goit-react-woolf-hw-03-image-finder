import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

const ImageGallery = ({ onModalOpen, images }) => {
  return (
    <ul className={css.gallery}>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          onModalOpen={onModalOpen}
          previewURL={webformatURL}
          largeURL={largeImageURL}
          alt={tags}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
