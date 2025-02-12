export { chromeLight, chromeDark } from './styles/themes';

export ObjectInspector, {useObjectIterator} from './object-inspector/ObjectInspector';
export DOMInspector, {useDOMIterator} from './dom-inspector/DOMInspector';
export ResizableTableInspector, {useResizableTable, resizableTableAcceptor}
  from './table-inspector/ResizableTableInspector';
export TableInspector from './table-inspector/TableInspector';
export { tableAcceptor, useTable } from './table-inspector/Table';
export ObjectLabel from './object-inspector/ObjectLabel';
export ObjectPreview from './object-inspector/ObjectPreview';
export ObjectRootLabel from './object-inspector/ObjectRootLabel';

export ObjectValue from './object/ObjectValue';
export ObjectName from './object/ObjectName';

export { useStyles, themeAcceptor } from './styles';

export {typeComparator, isObject, isArray, isIterable, isFunction, isNode}
  from './utils/typeUtils';

// Wrapping the inspectors
import ObjectInspector from './object-inspector/ObjectInspector';
import TableInspector from './table-inspector/TableInspector';
import ResizableTableInspector from './table-inspector/ResizableTableInspector';
import DOMInspector from './dom-inspector/DOMInspector';

import React from 'react';
import PropTypes from 'prop-types';
import {isNode as isDOM} from './utils/typeUtils';

const Inspector = ({ table = false, resizable = false, data, ...rest }) => {
  if (table) {
    if(resizable){
      return <ResizableTableInspector data={data} {...rest} />;
    }
    return <TableInspector data={data} {...rest} />;
  }

  if (isDOM(data)) return <DOMInspector data={data} {...rest} />;

  return <ObjectInspector data={data} {...rest} />;
};

Inspector.propTypes = {
  data: PropTypes.any,
  name: PropTypes.string,
  table: PropTypes.bool,
  resizable: PropTypes.bool,
};

export { Inspector };

export default Inspector;
