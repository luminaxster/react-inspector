import PropTypes from 'prop-types';

import { useStyles } from '../styles';
import shouldInline from './shouldInline';

const OpenTag = ({ tagName, attributes, styles }) => {
  return (
    <span css={styles.base}>
      {'<'}
      <span css={styles.tagName}>{tagName}</span>

      {(() => {
        if (attributes) {
          let attributeNodes = [];
          for (let i = 0; i < attributes.length; i++) {
            const attribute = attributes[i];
            attributeNodes.push(
              <span key={i}>
                {' '}
                <span css={styles.htmlAttributeName}>{attribute.name}</span>
                {'="'}
                <span css={styles.htmlAttributeValue}>{attribute.value}</span>
                {'"'}
              </span>
            );
          }
          return attributeNodes;
        }
      })()}

      {'>'}
    </span>
  );
};

// isChildNode style={{ marginLeft: -12 /* hack: offset placeholder */ }}
const CloseTag = ({ tagName, isChildNode = false, styles }) => (
  <span
    css={Object.assign({}, styles.base, isChildNode && styles.offsetLeft)}>
    {'</'}
    <span css={styles.tagName}>{tagName}</span>
    {'>'}
  </span>
);

const nameByNodeType = {
  1: 'ELEMENT_NODE',
  3: 'TEXT_NODE',
  7: 'PROCESSING_INSTRUCTION_NODE',
  8: 'COMMENT_NODE',
  9: 'DOCUMENT_NODE',
  10: 'DOCUMENT_TYPE_NODE', // http://stackoverflow.com/questions/6088972/get-doctype-of-an-html-as-string-with-javascript
  11: 'DOCUMENT_FRAGMENT_NODE',
};

const DOMNodePreview = ({ isCloseTag, data, expanded }) => {
  const styles = useStyles('DOMNodePreview');

  if (isCloseTag) {
    return (
      <CloseTag
        styles={styles.htmlCloseTag}
        isChildNode
        tagName={data.tagName}
      />
    );
  }

  switch (data.nodeType) {
    case Node.ELEMENT_NODE:
      return (
        <span>
          <OpenTag
            tagName={data.tagName}
            attributes={data.attributes}
            styles={styles.htmlOpenTag}
          />

          {shouldInline(data) ? data.textContent : !expanded && '…'}

          {!expanded && (
            <CloseTag tagName={data.tagName} styles={styles.htmlCloseTag} />
          )}
        </span>
      );
    case Node.TEXT_NODE:
      return <span>{data.textContent}</span>;
    case Node.CDATA_SECTION_NODE:
      return <span>{'<![CDATA[' + data.textContent + ']]>'}</span>;
    case Node.COMMENT_NODE:
      return (
        <span css={styles.htmlComment}>
          {'<!--'}
          {data.textContent}
          {'-->'}
        </span>
      );
    case Node.PROCESSING_INSTRUCTION_NODE:
      return <span>{data.nodeName}</span>;
    case Node.DOCUMENT_TYPE_NODE:
      return (
        <span css={styles.htmlDoctype}>
          {'<!DOCTYPE '}
          {data.name}
          {data.publicId ? ` PUBLIC "${data.publicId}"` : ''}
          {!data.publicId && data.systemId ? ' SYSTEM' : ''}
          {data.systemId ? ` "${data.systemId}"` : ''}
          {'>'}
        </span>
      );
    case Node.DOCUMENT_NODE:
      return <span>{data.nodeName}</span>;
    case Node.DOCUMENT_FRAGMENT_NODE:
      return <span>{data.nodeName}</span>;
    default:
      return <span>{nameByNodeType[data.nodeType]}</span>;
  }
};

DOMNodePreview.propTypes = {
  /** If true, just render a close tag */
  isCloseTag: PropTypes.bool,
  /**  */
  name: PropTypes.string,
  /** The DOM Node */
  data: PropTypes.object.isRequired,
  /** Whether the DOM node has been expanded. */
  expanded: PropTypes.bool.isRequired,
};

export default DOMNodePreview;
