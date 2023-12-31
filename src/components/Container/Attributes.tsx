import { Attributes } from './Template';
import { InputNumber, Space } from 'antd';
import { useEffect, useState } from 'react';
import { AttributesProps } from '@/core';
import ICustomSelect from '@/common/ICustomSelect';
import {
  alignContent,
  alignItems,
  displayOptions,
  flexDirectionOptions,
  flexWrap,
  justifyContent,
} from './enum';

const width = 200;

/**
 * 属性面板
 */
const labelStyle = { width: 100 };
export default function (props: AttributesProps<Attributes>) {
  const [attributes, setAttributes] = useState<Attributes>(props.attributes);

  function handleChange(attributes: Attributes) {
    setAttributes(attributes);
    props?.onChange?.(attributes);
  }

  useEffect(() => {
    setAttributes(props?.attributes);
  }, [props?.attributes]);

  return (
    <Space style={{ width: '100%' }} direction={'vertical'}>
      <b>布局</b>
      <Space>
        <div style={labelStyle}>display：</div>
        <ICustomSelect
          allowClear
          value={attributes?.childrenStyle?.display}
          onChange={(display?: any) => {
            handleChange({
              ...attributes,
              childrenStyle: {
                ...attributes?.childrenStyle,
                display,
              },
            });
          }}
          style={{ width }}
          requestFn={async () => displayOptions}
        />
      </Space>

      {attributes?.childrenStyle?.display === 'flex' && (
        <>
          <Space>
            <div style={labelStyle}>flexDirection：</div>
            <ICustomSelect
              value={attributes?.childrenStyle?.flexDirection}
              onChange={(flexDirection?: any) => {
                handleChange({
                  ...attributes,
                  childrenStyle: {
                    ...attributes?.childrenStyle,
                    flexDirection,
                  },
                });
              }}
              allowClear
              style={{ width }}
              requestFn={async () => flexDirectionOptions}
            />
          </Space>

          <Space>
            <div style={labelStyle}>flexWrap：</div>
            <ICustomSelect
              value={attributes?.childrenStyle?.flexWrap}
              onChange={(flexWrap?: any) => {
                handleChange({
                  ...attributes,
                  childrenStyle: {
                    ...attributes?.childrenStyle,
                    flexWrap,
                  },
                });
              }}
              allowClear
              style={{ width }}
              requestFn={async () => flexWrap}
            />
          </Space>

          <Space>
            <div style={labelStyle}>justify-content：</div>
            <ICustomSelect
              value={attributes?.childrenStyle?.justifyContent}
              onChange={(justifyContent?: any) => {
                handleChange({
                  ...attributes,
                  childrenStyle: {
                    ...attributes?.childrenStyle,
                    justifyContent,
                  },
                });
              }}
              allowClear
              style={{ width }}
              requestFn={async () => justifyContent}
            />
          </Space>

          <Space>
            <div style={labelStyle}>align-items：</div>
            <ICustomSelect
              value={attributes?.childrenStyle?.alignItems}
              onChange={(alignItems?: any) => {
                handleChange({
                  ...attributes,
                  childrenStyle: {
                    ...attributes?.childrenStyle,
                    alignItems,
                  },
                });
              }}
              allowClear
              style={{ width }}
              requestFn={async () => alignItems}
            />
          </Space>

          <Space>
            <div style={labelStyle}>align-content：</div>
            <ICustomSelect
              value={attributes?.childrenStyle?.alignContent}
              onChange={(alignContent?: any) => {
                handleChange({
                  ...attributes,
                  childrenStyle: {
                    ...attributes?.childrenStyle,
                    alignContent,
                  },
                });
              }}
              allowClear
              style={{ width }}
              requestFn={async () => alignContent}
            />
          </Space>

          <Space>
            <div style={labelStyle}>gap：</div>
            <InputNumber
              placeholder={'请输入'}
              value={attributes?.childrenStyle?.gap}
              onChange={(gap?: any) => {
                handleChange({
                  ...attributes,
                  childrenStyle: {
                    ...attributes?.childrenStyle,
                    gap,
                  },
                });
              }}
              style={{ width }}
            />
          </Space>
        </>
      )}
    </Space>
  );
}
