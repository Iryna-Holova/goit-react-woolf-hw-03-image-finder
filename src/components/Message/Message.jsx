const Message = ({ children, warning }) => {
  return (
    <p style={{ textAlign: 'center', color: warning && 'red' }}>{children}</p>
  );
};

export default Message;
