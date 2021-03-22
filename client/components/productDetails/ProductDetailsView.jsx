import React from 'react';
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

  // console.log(product, styles, selectedStyle);
  // console.log(styles[selectedStyle].photos[0].url)

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
        />
        <ProductDetails
          product={product}
          styles={styles}
          overallRating={overallRating}
          selectedStyle={selectedStyle}
          handleStyleClick={handleStyleClick}
        />
      </div>
    </div>
  );
};

export default ProductDetailsView;
