import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ onModalOpen, previewURL, largeURL, alt }) => {
  return (
    <li
      className={css.gallery_item}
      onClick={() => {
        onModalOpen({ largeURL, alt });
      }}
    >
      <img className={css.image} src={previewURL} alt={alt} />
    </li>
  );
};

export default ImageGalleryItem;
