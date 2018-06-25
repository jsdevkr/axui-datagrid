import * as React from 'react';
import { IDataGridStore } from '../providers';
import { connectStore } from '../hoc';
import { classNames as CX } from '../utils';

interface IProps extends IDataGridStore {}
interface IState {}

class DataGridPage extends React.Component<IProps, IState> {
  state = {};

  onClickPageButton = (e:any) => {};

  render() {
    const { options = {}, styles = {} } = this.props;
    const { pageButtonsContainerWidth } = styles;
    const { page: optionPage = {} } = options;
    const {
      buttons: pageButtons = [],
      buttonHeight: pageButtonHeight = 0,
    } = optionPage;

    return (
      <div className="axui-datagrid-page" style={{ height: styles.pageHeight }}>
        <div
          className="axui-datagrid-page-buttons"
          style={{ width: pageButtonsContainerWidth }}
        >
          {pageButtons.map((button, bi) => {
            return (
              <button
                key={bi}
                style={{
                  height: pageButtonHeight,
                  width: button.width || pageButtonHeight,
                }}
              >
                <div data-button-svg className={CX(button.className)} />
              </button>
            );
          })}
        </div>
      </div>
    );
  }
}

export default connectStore(DataGridPage);
