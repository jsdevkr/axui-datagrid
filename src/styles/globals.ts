import { createGlobalStyle } from 'styled-components';

import './antd-theme.less';
import './styles.scss';
import 'react-github-button/assets/style.css';

export const GlobalStyles = createGlobalStyle`
  .clearfix:before, .clearfix:after {
    content: " ";
    display: table;
  }
  .clearfix:after {
    clear: both;
  }
`;
