import React from 'react';

const ProductDescription = (props) => {
  const { product } = props;


  return (
    <div id="productDiscContainer" className="">
      <div className="flexGrow3">
        <h3>{product.slogan}</h3>
        <span>
          {product.description}
        </span>
      </div>
      <div className="flexGrow1">
        <ul>
          {product.features.map((feature) => (
            <li key={`li${feature.value}`}>
              <img
                src="./img/checkmark.png"
                className="featureCheckmark"
                alt="checkmark"
                key={`checkmark${feature.value}`}
              />
              <span key={`feature${feature.value}`}>{`${feature.feature} `}</span>
              {feature.value === null ? <span key={`value${feature.value}`} /> : <span key={`value${feature.value}`}>{feature.value}</span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductDescription;
