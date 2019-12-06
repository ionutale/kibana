/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { HttpServiceBase } from 'kibana/public';
import { BASE_ALERT_API_PATH } from '../constants';
import { Alert, AlertType, AlertWithoutId } from '../../types';

export async function loadAlertTypes({ http }: { http: HttpServiceBase }): Promise<AlertType[]> {
  return await http.get(`${BASE_ALERT_API_PATH}/types`);
}

export async function loadAlerts({
  http,
  page,
  searchText,
  tagsFilter,
  typesFilter,
}: {
  http: HttpServiceBase;
  page: { index: number; size: number };
  searchText?: string;
  tagsFilter?: string[];
  typesFilter?: string[];
}): Promise<{
  page: number;
  perPage: number;
  total: number;
  data: Alert[];
}> {
  const filters = [];
  if (tagsFilter && tagsFilter.length) {
    filters.push(`alert.attributes.tags:(${tagsFilter.join(' and ')})`);
  }
  if (typesFilter && typesFilter.length) {
    filters.push(`alert.attributes.alertTypeId:(${typesFilter.join(' or ')})`);
  }
  return await http.get(`${BASE_ALERT_API_PATH}/_find`, {
    query: {
      page: page.index + 1,
      per_page: page.size,
      search_fields: searchText ? 'name' : undefined,
      search: searchText,
      filter: filters.length ? filters.join(' and ') : undefined,
    },
  });
}

export async function deleteAlerts({
  ids,
  http,
}: {
  ids: string[];
  http: HttpServiceBase;
}): Promise<void> {
  await Promise.all(ids.map(id => http.delete(`${BASE_ALERT_API_PATH}/${id}`)));
}

export async function createAlert({
  http,
  alert,
}: {
  http: HttpServiceBase;
  alert: Omit<AlertWithoutId, 'createdBy' | 'updatedBy' | 'muteAll' | 'mutedInstanceIds'>;
}): Promise<Alert> {
  return await http.post(`${BASE_ALERT_API_PATH}`, {
    body: JSON.stringify(alert),
  });
}

export async function updateAlert({
  http,
  alert,
  id,
}: {
  http: HttpServiceBase;
  alert: Pick<AlertWithoutId, 'throttle' | 'name' | 'tags' | 'interval' | 'params' | 'actions'>;
  id: string;
}): Promise<Alert> {
  return await http.put(`${BASE_ALERT_API_PATH}/${id}`, {
    body: JSON.stringify(alert),
  });
}

export async function enableAlerts({
  ids,
  http,
}: {
  ids: string[];
  http: HttpServiceBase;
}): Promise<void> {
  await Promise.all(ids.map(id => http.post(`${BASE_ALERT_API_PATH}/${id}/_enable`)));
}

export async function disableAlerts({
  ids,
  http,
}: {
  ids: string[];
  http: HttpServiceBase;
}): Promise<void> {
  await Promise.all(ids.map(id => http.post(`${BASE_ALERT_API_PATH}/${id}/_disable`)));
}

export async function muteAlerts({
  ids,
  http,
}: {
  ids: string[];
  http: HttpServiceBase;
}): Promise<void> {
  await Promise.all(ids.map(id => http.post(`${BASE_ALERT_API_PATH}/${id}/_mute_all`)));
}

export async function unmuteAlerts({
  ids,
  http,
}: {
  ids: string[];
  http: HttpServiceBase;
}): Promise<void> {
  await Promise.all(ids.map(id => http.post(`${BASE_ALERT_API_PATH}/${id}/_unmute_all`)));
}