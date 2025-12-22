function Box({ children, className, padding }) {
  return (
    <div className={`${className} bg-box-background  ${padding}`}>
      {children}
    </div>
  );
}

export default Box;
