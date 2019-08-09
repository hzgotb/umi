import React from 'react';
import { Icon } from 'antd';
import { formatMessage, FormattedMessage, getLocale, setLocale } from 'umi-plugin-react/locale';
import { IUi } from 'umi-types';
import Context from './Context';
import Footer from './Footer';
import styles from './Layout.less';
import { PROJECT_STATUS, IProjectStatus, LOCALES } from '@/enums';

interface ILayoutProps {}

interface ILayoutState {
  logVisible: boolean;
}

class Layout extends React.Component<ILayoutProps, ILayoutState> {
  constructor(props) {
    super(props);
    this.state = {
      logVisible: false,
    };
  }
  componentDidMount() {
    if (window.g_uiEventEmitter) {
      window.g_uiEventEmitter.on('SHOW_LOG', () => {
        this.setState({
          logVisible: true,
        });
      });
      window.g_uiEventEmitter.on('HIDE_LOG', () => {
        this.setState({
          logVisible: false,
        });
      });
    }
  }
  componentWillUnmount() {
    if (window.g_uiEventEmitter) {
      window.g_uiEventEmitter.removeListener('SHOW_LOG', () => {});
      window.g_uiEventEmitter.removeListener('HIDE_LOG', () => {});
    }
  }
  showLog = () => {
    this.setState({
      logVisible: true,
    });
  };
  hideLog = () => {
    this.setState({
      logVisible: false,
    });
  };
  render() {
    const locale = getLocale();
    const { logVisible } = this.state;
    window.g_uiContext = Context;

    return (
      <Context.Provider
        value={{
          locale,
          formatMessage,
          showLog: this.showLog,
          hideLog: this.hideLog,
          setLocale,
          FormattedMessage,
        }}
      >
        {this.props.children}
        <Footer logVisible={logVisible} showLog={this.showLog} hideLog={this.hideLog} />
      </Context.Provider>
    );
  }
}

export default Layout;
