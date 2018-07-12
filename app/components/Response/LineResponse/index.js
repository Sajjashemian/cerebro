import React, { PropTypes, Component } from 'react';
import NativeIcon from '../../NativeIcon';
import styles from './styles.css';

export default class LineResponse extends Component {
  static propTypes = {
    title: PropTypes.string,
    icon: PropTypes.string,
    selected: PropTypes.bool,
    subtitle: PropTypes.string,
    keycode: PropTypes.integer,
    onSelect: PropTypes.func,
    onMouseMove: PropTypes.func,
  }

  classNames() {
    return [
      styles.lineResponse,
      this.props.selected ? styles.selected : null
    ].join(' ');
  }
  renderIcon() {
    const { icon } = this.props;
    if (!icon) return null;
    if (icon.match(/\.(icns|app)$/)) {
      return <NativeIcon path={icon} className={styles.icon} />;
    }
    return <img src={icon} alt="" className={styles.icon} />;
  }
  render() {
    const {
      title,
      onSelect,
      onMouseMove,
      subtitle,
      keycode
    } = this.props;
    return (
      <div className={this.classNames()} onClick={onSelect} onMouseMove={onMouseMove}>
        {this.renderIcon()}
        <div className={styles.details}>
          {title && <div className={styles.title}> {title} </div>}
          {subtitle && <div className={styles.subtitle}> {subtitle} </div>}
        </div>
        {keycode && <div className={styles.keycode}>⌘{keycode}</div>}
      </div>
    );
  }
}
