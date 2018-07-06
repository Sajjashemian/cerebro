import React, { PropTypes } from 'react';
import styles from './styles.css';

const LineResponse = ({ title, onSelect, onMouseOver, selected, subtitle, index }) => {
  const classNames = [
    styles.lineResponse,
    selected ? styles.selected : null
  ].join(' ');
  return (
    <div className={classNames} onClick={onSelect} onMouseOver={onMouseOver}>
      <div className={styles.details}>
        {title && <div className={styles.title}> {title} </div>}
        {subtitle && <div className={styles.subtitle}> {subtitle} </div>}
      </div>
      {index && <div className={styles.keycode}>⌘{index}</div>}
    </div>
  );
};

LineResponse.propTypes = {
  title: PropTypes.string,
  selected: PropTypes.bool,
  subtitle: PropTypes.string,
  index: PropTypes.integer,
  onSelect: PropTypes.func,
  onMouseOver: PropTypes.func,
};

export default LineResponse;
