import React from 'react';
import styled from 'styled-components';
import { Form, Input, InputNumber, Button, Collapse, Radio } from 'antd';
import { FormComponentProps, FormProps, ValidateCallback } from 'antd/lib/form';
import {
  ISettings,
  ISettingsAction,
  SettingsActionType,
} from 'common/settings';
import { JSONValidator } from 'common/utils';

export interface ColumnsSettingsProps extends FormComponentProps, ISettings {
  handleChangeOption: (action: ISettingsAction) => void;
}

const ColumnsSettingsForm: React.FC<ColumnsSettingsProps> = props => {
  const { getFieldDecorator, validateFields, getFieldsValue } = props.form;
  const { columns, handleChangeOption } = props;

  return (
    <Form layout="vertical" colon={false}>
      <Form.Item
        labelCol={{ xs: 24, sm: 24 }}
        wrapperCol={{ xs: 24, sm: 24 }}
        label="columns"
        labelAlign="left"
      >
        {getFieldDecorator('columns', {
          initialValue: JSON.stringify(columns),
          rules: [
            {
              validator: JSONValidator,
            },
          ],
        })(<Input.TextArea rows={6} />)}
        <div style={{ textAlign: 'right' }}>
          <Button
            htmlType="button"
            type="primary"
            size="small"
            onClick={() => {
              props.form.validateFields(['columns'], (errors, values) => {
                handleChangeOption({
                  type: SettingsActionType.SET_COLUMNS,
                  value: JSON.parse(values.columns),
                });
              });
            }}
          >
            Apply
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};
const ColumnsSettings = Form.create<ColumnsSettingsProps>({})(
  ColumnsSettingsForm,
);
export default ColumnsSettings;
