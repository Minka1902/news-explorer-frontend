const Preloader = ({ text, backgroundColor }) => {
  return (
    <section className="preloader_container" style={{ backgroundColor: backgroundColor }}>
      <div className="preloader__circle"></div>
      <span className="preloader__text">Please wait, we are trying to {text}.</span>
    </section>
  );
};

export default Preloader;