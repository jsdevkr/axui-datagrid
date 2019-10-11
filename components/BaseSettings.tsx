import React from 'react';
import styled from 'styled-components';
import { Form, Input, InputNumber, Button, Collapse, Radio } from 'antd';
import { FormComponentProps, FormProps, ValidateCallback } from 'antd/lib/form';
import {
  ISettings,
  ISettingsAction,
  SettingsActionType,
} from 'common/settings';

export interface BaseSettingsProps extends FormComponentProps, ISettings {
  handleChangeOption: (action: ISettingsAction) => void;
}

const BaseSettingsForm: React.FC<BaseSettingsProps> = props => {
  const { getFieldDecorator, validateFields, getFieldsValue } = props.form;
  const {
    width = 400,
    height = 300,
    headerHeight,
    headerAlign,
    bodyRowHeight,
    bodyAlign,
    handleChangeOption,
  } = props;

  return (
    <Form layout="vertical" colon={false}>
      <Form.Item label={'width'}>
        <InputNumber
          size="small"
          min={100}
          defaultValue={width}
          onChange={value => {
            handleChangeOption({
              type: SettingsActionType.SET_WIDTH,
              value,
            });
          }}
        />
      </Form.Item>
      <Form.Item label={'height'}>
        <InputNumber
          size="small"
          min={100}
          defaultValue={height}
          onChange={value => {
            handleChangeOption({
              type: SettingsActionType.SET_HEIGHT,
              value,
            });
          }}
        />
      </Form.Item>
      <Form.Item label={'headerHeight'}>
        <InputNumber
          size="small"
          min={100}
          defaultValue={headerHeight}
          onChange={value => {
            handleChangeOption({
              type: SettingsActionType.SET_HEADER_HEIGHT,
              value,
            });
          }}
        />
      </Form.Item>
      <Form.Item label={'headerAlign'}>
        <Radio.Group
          onChange={value => {
            handleChangeOption({
              type: SettingsActionType.SET_HEADER_ALIGN,
              value,
            });
          }}
          defaultValue={headerAlign}
          buttonStyle="solid"
        >
          <Radio.Button value="left">Left</Radio.Button>
          <Radio.Button value="center">Center</Radio.Button>
          <Radio.Button value="right">Right</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label={'bodyRowHeight'}>
        <InputNumber
          size="small"
          min={100}
          defaultValue={bodyRowHeight}
          onChange={value => {
            handleChangeOption({
              type: SettingsActionType.SET_BODY_ROW_HEIGHT,
              value,
            });
          }}
        />
      </Form.Item>
      <Form.Item label={'bodyAlign'}>
        <Radio.Group
          onChange={value => {
            handleChangeOption({
              type: SettingsActionType.SET_BODY_ALIGN,
              value,
            });
          }}
          defaultValue={bodyAlign}
          buttonStyle="solid"
        >
          <Radio.Button value="left">Left</Radio.Button>
          <Radio.Button value="center">Center</Radio.Button>
          <Radio.Button value="right">Right</Radio.Button>
        </Radio.Group>
      </Form.Item>
    </Form>
  );
};
const BaseSettings = Form.create<BaseSettingsProps>({})(BaseSettingsForm);
export default BaseSettings;
