import { Component } from 'react';
import getImages from 'api/pixabay';
import css from './App.module.css';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import Message from './Message/Message';

class App extends Component {
  STATUS = {
    IDLE: 'IDLE',
    PENDING: 'PENDING',
    SUCCEEDED: 'SUCCEEDED',
    EMPTY: 'EMPTY',
    FAILED: 'FAILED',
  };

  PER_PAGE = 12;

  state = {
    images: [],
    q: '',
    page: 1,
    status: this.STATUS.IDLE,
    isLoadMore: false,
    modalData: null,
  };

  componentDidUpdate(_, prevState) {
    const { q: prevQuery, page: prevPage } = prevState;
    const { q, page } = this.state;
    if (prevQuery !== q || prevPage !== page) {
      this.loadImages();
    }
  }

  handleQueryChange = q => {
    this.setState({ images: [], q, page: 1, isLoadMore: false });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  async loadImages() {
    const { q, page } = this.state;
    this.setState({ status: this.STATUS.PENDING });
    try {
      const { hits, totalHits } = await getImages({
        q,
        page,
        per_page: this.PER_PAGE,
      });

      if (!hits.length) {
        this.setState({
          status: this.STATUS.EMPTY,
        });
        return;
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        isLoadMore: page < Math.ceil(totalHits / this.PER_PAGE),
        status: this.STATUS.SUCCEEDED,
      }));
    } catch (error) {
      this.setState({ status: this.STATUS.FAILED });
    }
  }

  handleModalOpen = modalData => {
    this.setState({ modalData });
  };

  handleModalClose = () => {
    this.setState({ modalData: null });
  };

  render() {
    const { status, images, isLoadMore, modalData } = this.state;

    return (
      <div className={css.app}>
        <SearchBar onFormSubmit={this.handleQueryChange} />
        <ImageGallery onModalOpen={this.handleModalOpen} images={images} />

        {isLoadMore && (
          <Button
            onLoadMore={this.handleLoadMore}
            isLoading={status === this.STATUS.PENDING}
          />
        )}

        {modalData && (
          <Modal onModalClose={this.handleModalClose} {...modalData} />
        )}

        {status === this.STATUS.IDLE && (
          <Message>Enter search query to find pictures</Message>
        )}

        {status === this.STATUS.PENDING && images.length === 0 && <Loader />}

        {status === this.STATUS.EMPTY && <Message>Nothing found...</Message>}

        {status === this.STATUS.FAILED && (
          <Message warning>Something went wrong...</Message>
        )}
      </div>
    );
  }
}

export default App;
