import React, { useState } from 'react';

const AnswersAccordion = (props) => {
  const [active, setActive] = useState('');
  const [height, setHeight] = useState('0px');
  const [list, setList] = useState(false);

  // const content = useRef(null);
  // ref={content}

  const toggleAccordion = () => {
    setActive(active === '' ? 'active' : '');
    setHeight(
      active === 'active' ? '0px' : '500px',
    );
    setList(!list);
    // console.log(content.current.scrollHeight);
  };

  return (
    <div className="accordion-a-section">
      <button className={`accordion-a ${active}`} type="submit" onClick={toggleAccordion}>
        <div className="accordion-a-title">{list ? 'Collapse Answers' : 'See More Answers'}</div>
      </button>
      <div style={{ maxHeight: `${height}` }} className="accordion-a-content">
        <div
          className="accordion-a-text"
        >
          {props.content}
        </div>
      </div>
    </div>
  );
};

export default AnswersAccordion;