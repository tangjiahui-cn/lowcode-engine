/**
 * 当前注册的组件库
 *
 * At 2023/10/31
 * By TangJiaHui
 */
import * as React from 'react';
import { CType } from '../../enum/component';
import { globalVariable } from '../../data';
import { DOMAttributes } from 'react';
import { StyleProcessorData } from '..';

export type Base = {
  x: string;
  y: string;
  w: string;
  h: string;
};

// 组件私有属性
export type AttributesProps<T> = {
  attributes: T;
  onChange: (attributes: T) => void;
};

// 组件定义事件类型
export type ComEvent<T = string> = {
  eventType: T; // 事件类型
  eventName: string; // 事件名称（用于事件面板下拉展示）
};

// 模板组件属性
export type TemplateProps<Attributes, E = any> = {
  id: string;
  getDomFn: (fn: () => E | null) => void;
  // 属性
  attributes?: Attributes;
  // 事件
  events?: DOMAttributes<E>;
  // 子元素
  children?: React.ReactNode[];
  // 预处理样式
  styleData?: StyleProcessorData;

  // 触发事件
  triggerEvents?: (events: string[]) => void;
  // 暴露事件
  exposeEvents?: (events: string[]) => void;
};

// 开发环境事件拦截
export function getEvent(
  injectEvent: DOMAttributes<any> = {},
  events: DOMAttributes<any> = {},
): any {
  return globalVariable.isDev() ? injectEvent : events;
}

// 模板组件类型
export type TemplateType = React.FunctionComponent<TemplateProps<any>>;

// 自定义组件类型
export type RegisterComponent<Attributes = any> = {
  cId: string; // 组件类型id
  name?: string; // 组件名称
  icon?: string; // 组件占位图标
  isPage?: boolean; // 是否是页面组件（根组件唯一）
  isContainer?: boolean; // 是否是容器类组件（可以嵌套children）
  template: TemplateType; // 组件模板
  attributeTemplate?: any; // 组件私有属性模板
  // defaultStyle?: React.CSSProperties; // 默认样式属性
  defaultAttributes?: Attributes; // 默认私有属性
  cType: CType; // 组件类型（代办同一类组件，用于分类）
  styleData?: StyleProcessorData; // 待处理样式对象

  /********** 事件系统 *********/
  triggerEvents?: ComEvent[]; // 组件触发事件
  exposeEvents?: ComEvent[]; // 组件暴露事件

  /**** 将要抛弃的属性 ****/
  defaultBase?: Base; // 默认基础属性
};

interface CurrentComponents {
  // 添加一个组件
  add: (component: RegisterComponent) => void;
  // 移出一个组件
  remove: (cId: string) => void;
  // 获取所拥有的所有组件
  getAllComponents: (cType?: string) => RegisterComponent[];
  // 获取一个指定的组件
  getComponent: (cId?: string) => RegisterComponent | undefined;
}

const components: Map<string, RegisterComponent> = new Map();
export const currentComponents: CurrentComponents = {
  add(component: RegisterComponent) {
    components.set(component.cId, component);
  },
  remove(cId: string) {
    components.delete(cId);
  },
  getAllComponents(cType?: string): RegisterComponent[] {
    const componentList: RegisterComponent[] = [...components.values()];
    return cType ? componentList.filter((x) => x.cType === cType) : componentList;
  },
  getComponent(cId?: string): RegisterComponent | undefined {
    return cId ? components.get(cId) : undefined;
  },
};