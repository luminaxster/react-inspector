import { useCallback, useState, useMemo } from 'react';

import { useStyles } from '../styles';
import {useTable} from "./Table";

const SortIconContainer = props => (
  <div
     css={{
      position: 'absolute',
      top: 1,
      right: 0,
      bottom: 1,
      display: 'flex',
      alignItems: 'center',
    }}>
    {props.children}
  </div>
);

const SortIcon = ({ sortAscending }) => {
  const styles = useStyles('TableInspectorSortIcon');
  const glyph = sortAscending ? '▲' : '▼';
  return <div css={styles}>{glyph}</div>;
};

const defaultStyle = {};

const TH = ({
   columnId,
  sortAscending = false,
  sorted = false,
  onClick = undefined,
  css = defaultStyle,
  children,
  ...thProps
}) => {
  const {base, div} = useStyles('TableInspectorTH');
  const {THComponent} = useTable();
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = useCallback(() => setHovered(true), []);
  const handleMouseLeave = useCallback(() => setHovered(false), []);
   
   const thCss= useMemo(
      () => {
         return {
            ...base,
            ...(hovered ? base[':hover'] : {}),
            ...css
         };
      },
      [css, base, hovered]
   );

  return (
    <THComponent
       columnId={columnId}
      {...thProps}
       css={thCss}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}>
      <div css={div}>{children}</div>
      {sorted && (
        <SortIconContainer>
          <SortIcon sortAscending={sortAscending} />
        </SortIconContainer>
      )}
    </THComponent>
  );
};

export default TH;
