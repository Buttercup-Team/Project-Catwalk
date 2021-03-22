import React, { useState } from 'react';
import axios from 'axios';
// import reviews from '../Sample_data/SampleReviews';
import ReviewCard from './review-card';
import AddModal from './new-review';

const Reviews = ({ reviews, metaData, setReviews }) => {
  const [reviewNum, setNum] = useState(0);
  const [sortOrder, setSort] = useState('relevant');
  const [openAdd, setOpen] = useState(false);

  // get new reviews
  const newList = (sort) => {
    if (sort) {
      axios.get(`/reviews/${metaData.product_id}/${sort}`)
        .then((resData) => setReviews(resData.data.results))
        .catch((err) => console.log('error in the post', err));
    } else {
      axios.get(`/reviews/${metaData.product_id}/${sortOrder}`)
        .then((resData) => setReviews(resData.data.results))
        .catch((err) => console.log('error in the post', err));
    }
  };

  // resorting the reviews on the options click
  function handleSortChange(e) {
    const sort = e.target.value;
    if (sort !== sortOrder) {
      setSort(sort);
      newList(sort);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  // opening or closing the picture modals
  function handleMoreClick() {
    setNum(reviewNum + 2);
  }

  // opening Add a Review modal
  function handleAddClick() {
    setOpen(!openAdd);
  }

  // check length of reviews section
  const DisplayReviews = () => {
    const moreReviews = ((reviews.length - reviewNum === 1) ? 1 : 2);
    return (
      <div>
        {[...Array(reviewNum + moreReviews)].map((item, idx) => (
          <ReviewCard
            key={reviews[idx].id + reviews[idx].date}
            review={reviews[idx]}
            newList={newList}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <form className="review-head" onSubmit={handleSubmit}>
        <span>{reviews.length}</span>
        <span className="review-head"> reviews, </span>
        <label htmlFor="reviewSort">
          sorted by
          <select
            id="reviewSort"
            className="sort-options"
            onChange={handleSortChange}
            value={sortOrder}
          >
            <option value="relevant">relevance</option>
            <option value="helpful">helpfulness</option>
            <option value="newest">newest</option>
          </select>
        </label>
      </form>
      <div className="review-cards">
        { (reviews.length > 0) ? <DisplayReviews /> : null }
      </div>
      {reviews.length - reviewNum > 2
        ? (
          <button
            type="submit"
            className="big-review-btn"
            onClick={handleMoreClick}
          >
            More Reviews
          </button>
        )
        : null}
      <button type="submit" className="big-review-btn" onClick={handleAddClick}>Add A Review +</button>
      {openAdd
        ? (
          <AddModal
            metaData={metaData}
            closeClick={handleAddClick}
            newList={newList}
          />
        )
        : null
      }
    </div>
  );
};

export default Reviews;
