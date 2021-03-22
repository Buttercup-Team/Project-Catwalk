import React, { useState } from 'react';
import axios from 'axios';
import StarRating from './StarRating';
import ImageModal from './imageModal';

const ReviewCard = ({ review, newList }) => {
  const [help, setHelp] = useState(false);
  const [report, setReport] = useState('Report');

  // adding the recommend line if applicable
  const Recommend = () => {
    if (review.recommend) {
      return (
        <div className="recommend">
          <img
            src="./img/checkmark.png"
            className="featureCheckmark"
            alt="checkmark"
          />
          <span className="recommend">I recommend this item.</span>
        </div>
      );
    }
    return <></>;
  };

  // adding the response section, if applicable
  const Response = () => {
    if (review.response) {
      return (
        <div className="review-response">
          <div className="response-header" style={{ fontWeight: 'bold' }}>Response:</div>
          <span className="response-body">{review.response}</span>
        </div>
      );
    }
    return <></>;
  };

  // incrementing the helpful counter on the review
  function handleYesClick() {
    if (!help) {
      review.helpfulness += 1;
      axios.put('/reviews/help', { id: review.id })
        .then(() => {
          setHelp(true);
          newList();
        })
        .catch((err) => console.log('error in the post', err));
    }
  }

  // reporting the review will remove it from the database
  function handleReportClick() {
    if (report === 'Report') {
      axios.put('/reviews/report', { id: review.id })
        .then(() => {
          setReport('Reported');
          newList();
        })
        .catch((err) => console.log('error in the post', err));
    }
  }

  function correctDate(date) {
    const temp = new Date(date).toLocaleDateString('en-gb', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    const array = temp.split(' ');
    return `${array[1]} ${array[0]}, ${array[2]}`;
  }

  // main render
  return (
    <div>
      <StarRating number={review.rating} uniqNum={review.date} />
      <span className="review-info">
        <span>{review.reviewer_name}</span>
        <span>,  </span>
        <span>{correctDate(review.date)}</span>
      </span>
      <div className="review-summary">{review.summary}</div>
      <div className="review-body">{review.body}</div>
      {review.photos.map((photo) => (
        <ImageModal key={photo.id} photo={photo} />
      ))}
      <Recommend />
      <Response />
      <div className="review-help">
        <span className="normal">Helpful?  </span>
        <button
          type="submit"
          className="clickable"
          onClick={handleYesClick}
        >
          Yes (
          {review.helpfulness}
          )
        </button>
        <span className="normal">  |  </span>
        <button
          type="submit"
          className="clickable"
          onClick={handleReportClick}
        >
          {report}
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;
