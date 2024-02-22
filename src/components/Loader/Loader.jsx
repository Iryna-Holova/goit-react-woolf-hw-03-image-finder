import { ThreeDots } from 'react-loader-spinner';

const Loader = ({ button }) => {
  return (
    <ThreeDots
      visible={true}
      height={button ? '40' : '80'}
      width={button ? '40' : '80'}
      color={button ? '#fff' : '#3f51b5'}
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{
        justifyContent: 'center',
        alignItems: 'center',
        height: button ? '100%' : 'calc(100vh - 128px)',
      }}
    />
  );
};

export default Loader;
