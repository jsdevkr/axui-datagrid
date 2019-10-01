import React from 'react';
import styled from 'styled-components';
import { Form, Input, InputNumber, Button } from 'antd';
import { FormComponentProps, FormProps, ValidateCallback } from 'antd/lib/form';
import { IDefaultOptions } from 'pages';

export enum OptionKeys {
  WIDTH = 'width',
  HEIGHT = 'height',
  SCROLL_LEFT = 'scrollLeft',
  SCROLL_TOP = 'scrollTop',
  FROZEN_COLUMN_INDEX = 'frozenColumnIndex',
  FROZEN_ROW_INDEX = 'frozenRowIndex',
  COLUMNS = 'columns',
  DATA = 'data',
}

export interface DefaultOptionsProps
  extends FormComponentProps,
  IDefaultOptions {
  onChangeOption?: (key: OptionKeys, value: any) => void;
}

const JSONValidator = (rule: any, value: any, callback: any) => {
  try {
    JSON.parse(value);
    callback();
  } catch (err) {
    callback('It is not JSON format');
  }
};

const Style = styled.div`
  .ant-form-item {
    margin-bottom: 12px;
  }
`;
const DefaultOptionsForm: React.FC<DefaultOptionsProps> = props => {
  const { getFieldDecorator, validateFields, getFieldsValue } = props.form;
  const handleSubmit: FormProps['onSubmit'] = e => {
    e.preventDefault();
    validateFields((err, values: IDefaultOptions) => {});
  };
  const handleChangeOption = (key: OptionKeys, value: any) => {
    props.onChangeOption && props.onChangeOption(key, value);
  };
  const {
    width = 400,
    height = 300,
    scrollLeft = 0,
    scrollTop = 0,
    frozenColumnIndex = 0,
    frozenRowIndex = 0,
    columns,
    data,
  } = props;
  return (
    <Style>
      <h3>Options</h3>
      <Form
        onSubmit={handleSubmit}
        labelCol={{ xs: { span: 24 }, sm: { span: 16 } }}
        wrapperCol={{
          xs: { span: 24 },
          sm: { span: 8 },
        }}
        colon={false}
      >
        <Form.Item label={OptionKeys.WIDTH + ''}>
          <InputNumber
            size="small"
            min={100}
            defaultValue={width}
            onChange={value => {
              handleChangeOption(OptionKeys.WIDTH, value);
            }}
          />
        </Form.Item>
        <Form.Item label={OptionKeys.HEIGHT}>
          <InputNumber
            size="small"
            min={100}
            onChange={value => {
              handleChangeOption(OptionKeys.HEIGHT, value);
            }}
          />
        </Form.Item>
        <Form.Item label={OptionKeys.SCROLL_LEFT}>
          <InputNumber
            size="small"
            onChange={value => {
              handleChangeOption(OptionKeys.SCROLL_LEFT, value);
            }}
          />
        </Form.Item>
        <Form.Item label={OptionKeys.SCROLL_TOP}>
          <InputNumber
            size="small"
            onChange={value => {
              handleChangeOption(OptionKeys.SCROLL_TOP, value);
            }}
          />
        </Form.Item>
        <Form.Item label={OptionKeys.FROZEN_COLUMN_INDEX}>
          <InputNumber
            size="small"
            onChange={value => {
              handleChangeOption(OptionKeys.FROZEN_COLUMN_INDEX, value);
            }}
          />
        </Form.Item>
        <Form.Item label={OptionKeys.FROZEN_ROW_INDEX}>
          <InputNumber
            size="small"
            onChange={value => {
              handleChangeOption(OptionKeys.FROZEN_ROW_INDEX, value);
            }}
          />
        </Form.Item>
        <Form.Item
          labelCol={{ xs: 24, sm: 24 }}
          wrapperCol={{ xs: 24, sm: 24 }}
          label="columns"
          labelAlign="left"
        >
          {getFieldDecorator(OptionKeys.COLUMNS + '', {
            initialValue: JSON.stringify(columns),
            rules: [
              {
                validator: JSONValidator,
              },
            ],
          })(<Input.TextArea rows={6} />)}
        </Form.Item>
        <div style={{ textAlign: 'right' }}>
          <Button
            type="primary"
            size="small"
            onClick={() => {
              props.form.validateFields(
                [OptionKeys.COLUMNS + ''],
                (errors, values) => {
                  handleChangeOption(
                    OptionKeys.COLUMNS,
                    JSON.parse(values.columns),
                  );
                },
              );
            }}
          >
            Apply
          </Button>
        </div>
        <Form.Item
          labelCol={{ xs: 24, sm: 24 }}
          wrapperCol={{ xs: 24, sm: 24 }}
          label="data"
          labelAlign="left"
        >
          {getFieldDecorator(OptionKeys.DATA + '', {
            initialValue: JSON.stringify(data),
            rules: [
              {
                validator: JSONValidator,
              },
            ],
          })(<Input.TextArea rows={12} />)}
        </Form.Item>
        <div style={{ textAlign: 'right' }}>
          <Button
            type="primary"
            size="small"
            onClick={() => {
              props.form.validateFields([OptionKeys.DATA], (errors, values) => {
                handleChangeOption(OptionKeys.DATA, JSON.parse(values.data));
              });
            }}
          >
            Apply
          </Button>
        </div>
      </Form>
    </Style>
  );
};
const DefaultOptions = Form.create<DefaultOptionsProps>({})(DefaultOptionsForm);
export default DefaultOptions;
