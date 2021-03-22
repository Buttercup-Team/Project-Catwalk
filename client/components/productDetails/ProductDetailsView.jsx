import React, { useState } from 'react';
import ProductDetails from './ProductDetails';
import ImageGallery from './ImageGallery';

const ProductDetailsView = (props) => {
  const {
    product,
    styles,
    overallRating,
    selectedStyle,
    selectedStyleImgMemory,
    imgView,
    thumbnailView,
    handleStyleClick,
    handleArrowClick,
    handleImgThumbnailClick,
  } = props;

  const [mouseXY, setMouseXY] = useState({ x: null, y: null });
  const [isImgViewClicked, setIsImgViewClicked] = useState(false);

  const imgSlideClickHandler = (e) => {
    setIsImgViewClicked(!isImgViewClicked);
  }

  const handleMainImgMoveHandler = (e) => {
    const xCoord = (coord) => {
      if (coord <= 100) {
        return 100;
      }
      if (coord >= 700) {
        return 700;
      }
      return coord;
    };
    const yCoord = (coord) => {
      if (coord <= 175) {
        return 175;
      }
      if (coord >= 685) {
        return 685;
      }
      return coord;
    };
    setMouseXY({
      x: xCoord(e.nativeEvent.layerX),
      y: yCoord(e.nativeEvent.layerY),
    });
  };

  return (
    <div id="productContainer" className="">
      <div id="productImageView" className="">
        <ImageGallery
          product={product}
          styles={styles}
          selectedStyle={selectedStyle}
          selectedStyleImgMemory={selectedStyleImgMemory}
          imgView={imgView}
          thumbnailView={thumbnailView}
          handleArrowClick={handleArrowClick}
          handleImgThumbnailClick={handleImgThumbnailClick}
          handleMainImgMoveHandler={handleMainImgMoveHandler}
          imgSlideClickHandler={imgSlideClickHandler}
        />
        <ProductDetails
          product={product}
          styles={styles}
          overallRating={overallRating}
          selectedStyle={selectedStyle}
          imgView={imgView}
          mouseXY={mouseXY}
          handleStyleClick={handleStyleClick}
          isImgViewClicked={isImgViewClicked}
        />
        {/* {console.log('log in view', mouseXY)} */}
      </div>
    </div>
  );
};

export default ProductDetailsView;
