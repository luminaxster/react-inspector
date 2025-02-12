import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import TreeView from '../tree-view/TreeView';

import ObjectRootLabel from './ObjectRootLabel';
import ObjectLabel from './ObjectLabel';

import { propertyIsEnumerable } from '../utils/objectPrototype';
import { getPropertyValue } from '../utils/propertyUtils';
import {isObject, isArray, isIterable, isFunction} from '../utils/typeUtils';

import { themeAcceptor } from '../styles';

const createIterator = (showNonenumerable= false, sortObjectKeys) => {
  const objectIterator = function*(data) {
    const shouldIterate = isObject(data) || isFunction(data);
    if (!shouldIterate) return;

    const dataIsArray = isArray(data);

    // iterable objects (except arrays)
    if (!dataIsArray && isIterable(data)) {
      let i = 0;
      for (let entry of data) {
        if (isArray(entry) && entry.length === 2) {
          const [k, v] = entry;
          yield {
            name: k,
            data: v,
          };
        } else {
          yield {
            name: i.toString(),
            data: entry,
          };
        }
        i++;
      }
    } else {
      const keys = Object.getOwnPropertyNames(data);
      if (sortObjectKeys === true && !dataIsArray) {
        // Array keys should not be sorted in alphabetical order
        keys.sort();
      } else if (typeof sortObjectKeys === 'function') {
        keys.sort(sortObjectKeys);
      }

      for (const propertyName of keys) {
        if (propertyIsEnumerable.call(data, propertyName)) {
          const propertyValue = getPropertyValue(data, propertyName);
          yield {
            name: propertyName || `""`,
            data: propertyValue,
          };
        } else if (showNonenumerable) {
          // To work around the error (happens some time when propertyName === 'caller' || propertyName === 'arguments')
          // 'caller' and 'arguments' are restricted function properties and cannot be accessed in this context
          // http://stackoverflow.com/questions/31921189/caller-and-arguments-are-restricted-function-properties-and-cannot-be-access
          let propertyValue;
          try {
            propertyValue = getPropertyValue(data, propertyName);
          } catch (e) {
            // console.warn(e)
          }

          if (propertyValue !== undefined) {
            yield {
              name: propertyName,
              data: propertyValue,
              isNonenumerable: true,
            };
          }
        }
      }

      // [[Prototype]] of the object: `Object.getPrototypeOf(data)`
      // the property name is shown as "__proto__"
      if (showNonenumerable && data !== Object.prototype /* already added */) {
        yield {
          name: '__proto__',
          data: Object.getPrototypeOf(data),
          isNonenumerable: true,
        };
      }
    }
  };

  return objectIterator;
};

const defaultNodeRenderer = ({ depth, name, data, isNonenumerable }) =>
  depth === 0 ? (
    <ObjectRootLabel name={name} data={data} />
  ) : (
    <ObjectLabel name={name} data={data} isNonenumerable={isNonenumerable} />
  );

/**
 * Iterator for objects
 */
export const useObjectIterator = (showNonenumerable, sortObjectKeys)=>{
  return useMemo(
     ()=>createIterator(showNonenumerable, sortObjectKeys),
     [showNonenumerable, sortObjectKeys]
  );
};

/**
 * Tree-view for objects
 */
const ObjectInspector = ({
  showNonenumerable,
  sortObjectKeys,
  nodeRenderer = defaultNodeRenderer,
  ...treeViewProps
}) => {
  const dataIterator = useObjectIterator(showNonenumerable, sortObjectKeys);

  return (
    <TreeView
      nodeRenderer={nodeRenderer}
      dataIterator={dataIterator}
      {...treeViewProps}
    />
  );
};

ObjectInspector.propTypes = {
  /** An integer specifying to which level the tree should be initially expanded. */
  expandLevel: PropTypes.number,
  
  /** An array containing all the paths that should be expanded when the component is initialized, or a string of just one path */
  expandPaths: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  
  /** An array containing controlled expandedPaths' state and setter, (e.g. const expandedPaths = useState({}); )*/
  expandedPaths: PropTypes.array,
  
  /** A custom function to  determiner if the path should be expanded (e.g. a search match) */
  getExpandedPaths:PropTypes.func,
  
  name: PropTypes.string,
  
  /** Not required prop because we also allow undefined value */
  data: PropTypes.any,

  /** Show non-enumerable properties */
  showNonenumerable: PropTypes.bool,
  
  /** Sort object keys with optional compare function. */
  sortObjectKeys: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),

  /** Provide a custom nodeRenderer */
  nodeRenderer: PropTypes.func,
};

export default themeAcceptor(ObjectInspector);
