import urlParse from 'url-parse';
import * as mobx from 'mobx';

import { L7Endpoint } from '~/domain/interactions/new-connections';
import { L7Kind } from '~/domain/hubble';
import { Method } from '~/domain/http';

export class Group {
  public endpoints: Map<string, L7Endpoint>;

  public static newFromMap(m: Map<L7Kind, Map<string, L7Endpoint>>): Group[] {
    const groups: Group[] = [];

    const httpEndpoints = m.get(L7Kind.HTTP);
    if (httpEndpoints == null) return groups;

    httpEndpoints.forEach(ep => {
      const http = ep.ref.http;
      if (http == null) return;

      const urlPath = http.parsedUrl.pathname;
      const parts = urlPath.split('/').filter(p => p.trim().length > 0);

      parts.forEach((part, idx) => {
        return;
      });
    });

    return groups;
  }

  constructor() {
    this.endpoints = new Map();

    mobx.makeAutoObservable(this, void 0, {
      autoBind: true,
    });
  }

  public addEndpoint(ep: L7Endpoint) {
    this.endpoints.set(ep.id, ep);
  }

  public get methods(): Set<Method> {
    const s = new Set<Method>();

    this.endpoints.forEach(ep => {
      if (ep.ref.http == null) return;

      s.add(ep.ref.http.method);
    });

    return s;
  }
}
