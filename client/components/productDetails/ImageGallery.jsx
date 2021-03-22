import React from 'react';

const ImageGallery = (props) => {
  const {
    product,
    styles,
    selectedStyle,
    selectedStyleImgMemory,
    imgView,
    thumbnailView,
    handleArrowClick,
    handleImgThumbnailClick,
    handleMainImgMoveHandler,
    imgSlideClickHandler,
  } = props;

  return (
    <div id="imgSlider">
      <div
        className="imgContainer"
        style={
          { left: imgView * -800, width: styles[selectedStyle].photos.length * 800 }
        }
        onMouseMove={handleMainImgMoveHandler}
      >
        {styles[selectedStyle].photos.map((photo) => (
          <img
            src={photo.url}
            alt={photo.url}
            key={`photo${photo.url}`}
            className="imgNormalSlide"
            onClick={imgSlideClickHandler}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={handleArrowClick}
        name="image carousel left arrow"
      >
        <img
          src="./img/arrow.png"
          alt="arrow.png"
          value="left"
          imgviewvalue={imgView}
          className={`leftArrow ${imgView === 0 && 'hiddenEle'}`}
        />
      </button>
      <button
        type="button"
        onClick={handleArrowClick}
        name="image carousel right arrow"
      >
        <img
          src="./img/arrow.png"
          alt="arrow.png"
          value="right"
          imgviewvalue={imgView}
          className={`rightArrow ${imgView === styles[selectedStyle].photos.length - 1 && 'hiddenEle'}`}
          // style={{ left: 750 }}
        />
      </button>
      <div
        className="mainImgThumbnailSlider"
      >
        <div
          className="mainImgThumbnailContainer"
          style={{ top: thumbnailView * -75 }}
        >
          {styles[selectedStyle].photos.map((photo, idx) => (
            <button
              type="button"
              onClick={handleImgThumbnailClick}
              key={`button${photo.thumbnail_url}`}
              className="mainImgThumbnailButton"
              style={{ top: idx * 75 }}
              name={`thumbnail for style ${styles[selectedStyle].name}`}
            >
              <img
                src={photo.thumbnail_url}
                alt={photo.thumbnail_url}
                key={`img${photo.thumbnail_url}`}
                value={idx}
                className={imgView === idx ? 'mainImgThumbnail highlight' : 'mainImgThumbnail'}
              />
            </button>
          ))}
        </div>
      </div>
      <button
        type="button"
        name="image carousel thumbnail up arrow"
        className={thumbnailView === 0 ? 'hiddenEle' : 'thumbnailArrowButton thumbnailArrowUpper'}
        onClick={handleArrowClick}
      >
        <img
          src="./img/slimArrow.png"
          alt="upper thumbnail arrow"
          className="thumbnailArrow thumbnailArrowUpper"
          value="up"
          thumbnailview={thumbnailView}
        />
      </button>
      <button
        type="button"
        name="image carousel thumbnail down arrow"
        className={thumbnailView + 7 >= styles[selectedStyle].photos.length ? 'hiddenEle' : 'thumbnailArrowButton thumbnailArrowLower'}
        onClick={handleArrowClick}
      >
        <img
          src="./img/slimArrow.png"
          alt="lower thumbnail arrow"
          className="thumbnailArrow thumbnailArrowLower rotate180"
          value="down"
          thumbnailview={thumbnailView}
        />
      </button>
    </div>
  );
};

export default ImageGallery;
