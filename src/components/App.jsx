import { Component } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import css from './App.module.css';
import getImages from 'api/pixabay';
import Loader from './Loader/Loader';
import Message from './Message/Message';

class App extends Component {
  STATUS = {
    IDLE: 'IDLE',
    PENDING: 'PENDING',
    FAILED: 'FAILED',
    SUCCEEDED: 'SUCCEEDED',
  };

  PER_PAGE = 12;

  state = {
    images: [],
    q: '',
    page: 1,
    status: this.STATUS.IDLE,
    isLoadMore: false,
    isModalOpen: false,
    modalData: null,
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const q = evt.target.elements.query.value.trim();
    if (q === '') {
      return alert('Please enter search query');
    }
    this.setState({ images: [], q, page: 1, isLoadMore: false });
  };

  handleLoadMore = async () => {
    this.setState(prevState => ({
      page: (prevState.page += 1),
    }));
  };

  async loadImages() {
    const { q, page } = this.state;
    this.setState({ status: this.STATUS.PENDING });
    try {
      const data = await getImages({ q, page, per_page: this.PER_PAGE });
      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        isLoadMore: page < Math.ceil(data.totalHits / this.PER_PAGE),
        status: this.STATUS.SUCCEEDED,
      }));
    } catch (error) {
      this.setState({ status: this.STATUS.FAILED });
    }
  }

  handleModalOpen = data => {
    document.querySelector('html').classList.add('no-scroll');
    this.setState({ isModalOpen: true, modalData: data });
  };

  handleModalClose = () => {
    document.querySelector('html').classList.remove('no-scroll');
    this.setState({ isModalOpen: false, modalData: null });
  };

  componentDidUpdate(prevProps, prevState) {
    const { q: prevQuery, page: prevPage } = prevState;
    const { q, page } = this.state;
    if (prevQuery !== q || prevPage !== page) {
      this.loadImages();
    }
  }

  render() {
    const { images, status, isLoadMore, isModalOpen, modalData } = this.state;

    return (
      <div className={css.app}>
        <SearchBar onSubmit={this.handleSubmit} />
        <ImageGallery onModalOpen={this.handleModalOpen} images={images} />

        {isLoadMore && (
          <Button
            onLoadMore={this.handleLoadMore}
            isLoading={status === this.STATUS.PENDING}
          />
        )}

        {isModalOpen && (
          <Modal onModalClose={this.handleModalClose} {...modalData} />
        )}

        {status === this.STATUS.IDLE && (
          <Message>Enter search query to find pictures</Message>
        )}

        {status === this.STATUS.PENDING && images.length === 0 && <Loader />}

        {status === this.STATUS.SUCCEEDED && this.state.images.length === 0 && (
          <Message>Nothing found...</Message>
        )}

        {status === this.STATUS.FAILED && (
          <Message>Something went wrong...</Message>
        )}
      </div>
    );
  }
}

export default App;
