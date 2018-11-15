import React, { PropTypes, Component } from 'react';
import SmartIcon from '../../SmartIcon';
import styles from './styles.css';

export default class Row extends Component {
  static propTypes = {
    title: PropTypes.string,
    icon: PropTypes.string,
    selected: PropTypes.bool,
    subtitle: PropTypes.string,
    onSelect: PropTypes.func,
    onMouseMove: PropTypes.func,
  }
  classNames() {
    return [
      styles.row,
      this.props.selected ? styles.selected : null
    ].join(' ');
  }
  renderIcon() {
    const { icon } = this.props;
    if (!icon) return null;
    return <SmartIcon path={icon} className={styles.icon} />;
  }
  render() {
    const {
      title,
      onSelect,
      onMouseMove,
      subtitle
    } = this.props;
    return (
      <div className={this.classNames()} onClick={onSelect} onMouseMove={onMouseMove}>
        {this.renderIcon()}
        <div className={styles.details}>
          {title && <div className={styles.title}> {title} </div>}
          {subtitle && <div className={styles.subtitle}> {subtitle} </div>}
        </div>
      </div>
    );
  }
}
