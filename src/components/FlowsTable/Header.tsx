import React, { memo } from 'react';
import classnames from 'classnames';

import { CommonProps, getFlowsTableColumnLabel } from './general';

import css from './styles.scss';

export const Header = memo<CommonProps>(function FlowsTableHeader(props) {
  return (
    <div className={classnames(css.row, css.head)}>
      {props.isVisibleColumn?.('SrcPod') && (
        <div className={css.cell}>{getFlowsTableColumnLabel('SrcPod')}</div>
      )}
      {props.isVisibleColumn?.('SrcIp') && (
        <div className={css.cell}>{getFlowsTableColumnLabel('SrcIp')}</div>
      )}
      {props.isVisibleColumn?.('SrcService') && (
        <div className={css.cell}>{getFlowsTableColumnLabel('SrcService')}</div>
      )}
      {props.isVisibleColumn?.('DstPod') && (
        <div className={css.cell}>{getFlowsTableColumnLabel('DstPod')}</div>
      )}
      {props.isVisibleColumn?.('DstIp') && (
        <div className={css.cell}>{getFlowsTableColumnLabel('DstIp')}</div>
      )}
      {props.isVisibleColumn?.('DstService') && (
        <div className={css.cell}>{getFlowsTableColumnLabel('DstService')}</div>
      )}
      {props.isVisibleColumn?.('DstPort') && (
        <div className={css.cell}>{getFlowsTableColumnLabel('DstPort')}</div>
      )}
      {props.isVisibleColumn?.('Verdict') && (
        <div className={css.cell}>{getFlowsTableColumnLabel('Verdict')}</div>
      )}
      {props.isVisibleColumn?.('Timestamp') && (
        <div className={css.cell}>{getFlowsTableColumnLabel('Timestamp')}</div>
      )}
    </div>
  );
});
