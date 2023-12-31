/**
 * 父级面包屑面板
 *
 * At 2023/11/14
 * By TangJiaHui
 */
import { Breadcrumb } from 'antd';
import { useEffect, useState } from 'react';
import { engine, JsonNode } from '@/core';

interface IProps {
  jsonNode?: JsonNode;
}

export default function (props: IProps) {
  const [list, setList] = useState<JsonNode[]>([]);

  useEffect(() => {
    if (!props?.jsonNode) {
      setList([]);
      return;
    }
    const reverseParents = engine.instance.getAllParentJsonNode(props?.jsonNode?.id, true);
    setList([...reverseParents, props?.jsonNode]);
  }, [props?.jsonNode]);

  return (
    <Breadcrumb
      separator='>'
      style={{ fontSize: 14, padding: '2px 0', borderBottom: '1px solid #e8e8e8' }}
    >
      {list.map((node: JsonNode) => {
        const isSelf = node.id === props?.jsonNode?.id;
        return (
          <Breadcrumb.Item key={node?.id}>
            <span
              onMouseEnter={() => {
                if (isSelf) return;
                engine.instance.get(node?.id)?.handleHover();
              }}
              onMouseLeave={() => {
                if (isSelf) return;
                engine.instance.get(node?.id)?.handleUnHover();
              }}
              style={{ cursor: isSelf ? 'default' : 'pointer' }}
              onClick={() => {
                if (isSelf) return;
                const instance = engine.instance.get(node?.id);
                instance?.handleUnHover();
                instance?.handleSelect();
              }}
            >
              {node?.cName}
            </span>
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
}
