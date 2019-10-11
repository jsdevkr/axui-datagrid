import React from 'react';
import styled from 'styled-components';
import { Form, Input, InputNumber, Button, Collapse, Radio } from 'antd';
import { FormComponentProps, FormProps, ValidateCallback } from 'antd/lib/form';
import {
  ISettings,
  ISettingsAction,
  SettingsActionType,
} from 'common/settings';

export interface ScrollSettingsProps extends FormComponentProps, ISettings {
  handleChangeOption: (action: ISettingsAction) => void;
}

const ScrollSettingsForm: React.FC<ScrollSettingsProps> = props => {
  const { getFieldDecorator, validateFields, getFieldsValue } = props.form;
  const { scrollLeft = 0, scrollTop = 0, handleChangeOption } = props;

  return (
    <Form layout="vertical" colon={false}>
      <Form.Item label={'scrollLeft'}>
        <InputNumber
          size="small"
          defaultValue={scrollLeft}
          onChange={value => {
            handleChangeOption({
              type: SettingsActionType.SET_SCROLL_LEFT,
              value,
            });
          }}
        />
      </Form.Item>
      <Form.Item label={'scrollTop'}>
        <InputNumber
          size="small"
          defaultValue={scrollTop}
          onChange={value => {
            handleChangeOption({
              type: SettingsActionType.SET_SCROLL_TOP,
              value,
            });
          }}
        />
      </Form.Item>
    </Form>
  );
};
const ScrollSettings = Form.create<ScrollSettingsProps>({})(ScrollSettingsForm);
export default ScrollSettings;
