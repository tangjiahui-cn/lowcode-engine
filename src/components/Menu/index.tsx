import { Component, cType } from '@/core';
import Template, { AttributesType } from './Template';
import Attributes from './Attributes';

export default {
  cId: 'menu',
  cType: cType.Layout,
  cName: '菜单',
  icon: undefined,
  template: Template,
  attributeTemplate: Attributes,
  defaultAttributes: {
    title: '演示系统',
    options: [{ key: '1', label: '首页', route: '/' }],
  },
} as Component<AttributesType>;
