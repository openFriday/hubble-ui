// TODO: its probably not a good place for such helpers
// consider moving it outside of domain types
import {
  HubbleFlow,
  Time,
  HubbleService,
  HubbleLink,
  IPProtocol,
} from '~/domain/hubble';

import * as uiPb from '~backend/proto/ui/ui_pb';

import { StateChange } from '~/domain/misc';
import { KV } from '~/domain/misc';
import { Flow } from '~/domain/flows';

import * as verdictHelpers from './verdict';
export { verdictHelpers as verdict };

import * as notifications from './notifications';
export { notifications };

import * as flows from './flows';
export { flows };

import * as tcpFlags from './tcp-flags';
export { tcpFlags };

import * as protocol from './protocol';
export { protocol };

import * as l7 from './l7';
export { l7 };

export * as time from './time';

export const stateChangeFromPb = (change: uiPb.StateChange): StateChange => {
  switch (change) {
    case uiPb.StateChange.ADDED:
      return StateChange.Added;
    case uiPb.StateChange.MODIFIED:
      return StateChange.Modified;
    case uiPb.StateChange.DELETED:
      return StateChange.Deleted;
    case uiPb.StateChange.EXISTS:
      return StateChange.Exists;
  }

  return StateChange.Unknown;
};

export const relayServiceFromPb = (svc: uiPb.Service): HubbleService => {
  const obj = svc.toObject();
  const labels: Array<KV> = [];

  obj.labelsList.forEach(l => {
    const parts = l.split('=');

    const key = parts[0];
    const value = parts.slice(1).join('=');

    labels.push({ key, value });
  });

  return {
    id: obj.id,
    name: obj.name,
    namespace: obj.namespace,
    labels,
    dnsNames: obj.dnsNamesList,
    egressPolicyEnforced: obj.egressPolicyEnforced,
    ingressPolicyEnforced: obj.ingressPolicyEnforced,
    visibilityPolicyStatus: obj.visibilityPolicyStatus,
    creationTimestamp: obj.creationTimestamp ?? msToPbTimestamp(Date.now()),
  };
};

export const relayServiceLinkFromPb = (link: uiPb.ServiceLink): HubbleLink => {
  const obj = link.toObject();

  return {
    id: obj.id,
    sourceId: obj.sourceId,
    destinationId: obj.destinationId,
    destinationPort: obj.destinationPort,
    ipProtocol: ipProtocolFromPb(obj.ipProtocol),
    verdict: verdictHelpers.verdictFromPb(obj.verdict),
  };
};

export const ipProtocolFromPb = (ipp: uiPb.IPProtocol): IPProtocol => {
  switch (ipp) {
    case uiPb.IPProtocol.TCP:
      return IPProtocol.TCP;
    case uiPb.IPProtocol.UDP:
      return IPProtocol.UDP;
    case uiPb.IPProtocol.ICMP_V4:
      return IPProtocol.ICMPv4;
    case uiPb.IPProtocol.ICMP_V6:
      return IPProtocol.ICMPv6;
  }

  return IPProtocol.Unknown;
};

export const msToPbTimestamp = (ms: number): Time => {
  const seconds = (ms / 1000) | 0;
  const nanos = (ms - seconds * 1000) * 1e6;

  return { seconds, nanos };
};

export const flowFromRelay = (hubbleFlow: HubbleFlow): Flow => {
  return new Flow(hubbleFlow);
};
