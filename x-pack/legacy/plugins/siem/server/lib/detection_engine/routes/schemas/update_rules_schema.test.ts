/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { updateRulesSchema } from './update_rules_schema';
import { UpdateRuleAlertParamsRest } from '../../rules/types';
import { ThreatParams } from '../../types';

describe('update rules schema', () => {
  test('empty objects do not validate as they require at least id or rule_id', () => {
    expect(updateRulesSchema.validate<Partial<UpdateRuleAlertParamsRest>>({}).error).toBeTruthy();
  });

  test('made up values do not validate', () => {
    expect(
      updateRulesSchema.validate<Partial<UpdateRuleAlertParamsRest & { madeUp: string }>>({
        madeUp: 'hi',
      }).error
    ).toBeTruthy();
  });

  test('[id] does validate', () => {
    expect(
      updateRulesSchema.validate<Partial<UpdateRuleAlertParamsRest>>({
        id: 'rule-1',
      }).error
    ).toBeFalsy();
  });

  test('[rule_id] does validate', () => {
    expect(
      updateRulesSchema.validate<Partial<UpdateRuleAlertParamsRest>>({
        rule_id: 'rule-1',
      }).error
    ).toBeFalsy();
  });

  test('[id and rule_id] does not validate', () => {
    expect(
      updateRulesSchema.validate<Partial<UpdateRuleAlertParamsRest>>({
        id: 'id-1',
        rule_id: 'rule-1',
      }).error
    ).toBeTruthy();
  });

  test('[rule_id, description] does validate', () => {
    expect(
      updateRulesSchema.validate<Partial<UpdateRuleAlertParamsRest>>({
        rule_id: 'rule-1',
        description: 'some description',
      }).error
    ).toBeFalsy();
  });

  test('[id, description] does validate', () => {
    expect(
      updateRulesSchema.validate<Partial<UpdateRuleAlertParamsRest>>({
        id: 'rule-1',
        description: 'some description',
      }).error
    ).toBeFalsy();
  });

  test('[id, risk_score] does validate', () => {
    expect(
      updateRulesSchema.validate<Partial<UpdateRuleAlertParamsRest>>({
        id: 'rule-1',
        risk_score: 10,
      }).error
    ).toBeFalsy();
  });

  test('[rule_id, description, from] does validate', () => {
    expect(
      updateRulesSchema.validate<Partial<UpdateRuleAlertParamsRest>>({
        rule_id: 'rule-1',
        description: 'some description',
        from: 'now-5m',
      }).error
    ).toBeFalsy();
  });

  test('[id, description, from] does validate', () => {
    expect(
      updateRulesSchema.validate<Partial<UpdateRuleAlertParamsRest>>({
        id: 'rule-1',
        description: 'some description',
        from: 'now-5m',
      }).error
    ).toBeFalsy();
  });

  test('[rule_id, description, from, to] does validate', () => {
    expect(
      updateRulesSchema.validate<Partial<UpdateRuleAlertParamsRest>>({
        rule_id: 'rule-1',
        description: 'some description',
        from: 'now-5m',
        to: 'now',
      }).error
    ).toBeFalsy();
  });

  test('[id, description, from, to] does validate', () => {
    expect(
      updateRulesSchema.validate<Partial<UpdateRuleAlertParamsRest>>({
        id: 'rule-1',
        description: 'some description',
        from: 'now-5m',
        to: 'now',
      }).error
    ).toBeFalsy();
  });

  test('[rule_id, description, from, to, name] does validate', () => {
    expect(
      updateRulesSchema.validate<Partial<UpdateRuleAlertParamsRest>>({
        rule_id: 'rule-1',
        description: 'some description',
        from: 'now-5m',
        to: 'now',
        name: 'some-name',
      }).error
    ).toBeFalsy();
  });

  test('[id, description, from, to, name] does validate', () => {
    expect(
      updateRulesSchema.validate<Partial<UpdateRuleAlertParamsRest>>({
        id: 'rule-1',
        description: 'some description',
        from: 'now-5m',
        to: 'now',
        name: 'some-name',
      }).error
    ).toBeFalsy();
  });

  test('[rule_id, description, from, to, name, severity] does validate', () => {
    expect(
      updateRulesSchema.validate<Partial<UpdateRuleAlertParamsRest>>({
        rule_id: 'rule-1',
        description: 'some description',
        from: 'now-5m',
        to: 'now',
        name: 'some-name',
        severity: 'low',
      }).error
    ).toBeFalsy();
  });

  test('[id, description, from, to, name, severity] does validate', () => {
    expect(
      updateRulesSchema.validate<Partial<UpdateRuleAlertParamsRest>>({
        id: 'rule-1',
        description: 'some description',
        from: 'now-5m',
        to: 'now',
        name: 'some-name',
        severity: 'low',
      }).error
    ).toBeFalsy();
  });

  test('[rule_id, description, from, to, name, severity, type] does validate', () => {
    expect(
      updateRulesSchema.validate<Partial<UpdateRuleAlertParamsRest>>({
        rule_id: 'rule-1',
        description: 'some description',
        from: 'now-5m',
        to: 'now',
        name: 'some-name',
        severity: 'low',
        type: 'query',
      }).error
    ).toBeFalsy();
  });

  test('[id, description, from, to, name, severity, type] does validate', () => {
    expect(
      updateRulesSchema.validate<Partial<UpdateRuleAlertParamsRest>>({
        id: 'rule-1',
        description: 'some description',
        from: 'now-5m',
        to: 'now',
        name: 'some-name',
        severity: 'low',
        type: 'query',
      }).error
    ).toBeFalsy();
  });

  test('[rule_id, description, from, to, name, severity, type, interval] does validate', () => {
    expect(
      updateRulesSchema.validate<Partial<UpdateRuleAlertParamsRest>>({
        rule_id: 'rule-1',
        description: 'some description',
        from: 'now-5m',
        to: 'now',
        name: 'some-name',
        severity: 'low',
        interval: '5m',
        type: 'query',
      }).error
    ).toBeFalsy();
  });

  test('[id, description, from, to, name, severity, type, interval] does validate', () => {
    expect(
      updateRulesSchema.validate<Partial<UpdateRuleAlertParamsRest>>({
        id: 'rule-1',
        description: 'some description',
        from: 'now-5m',
        to: 'now',
        name: 'some-name',
        severity: 'low',
        interval: '5m',
        type: 'query',
      }).error
    ).toBeFalsy();
  });

  test('[rule_id, description, from, to, index, name, severity, interval, type] does validate', () => {
    expect(
      updateRulesSchema.validate<Partial<UpdateRuleAlertParamsRest>>({
        rule_id: 'rule-1',
        description: 'some description',
        from: 'now-5m',
        to: 'now',
        index: ['index-1'],
        name: 'some-name',
        severity: 'low',
        interval: '5m',
        type: 'query',
      }).error
    ).toBeFalsy();
  });

  test('[id, description, from, to, index, name, severity, interval, type] does validate', () => {
    expect(
      updateRulesSchema.validate<Partial<UpdateRuleAlertParamsRest>>({
        id: 'rule-1',
        description: 'some description',
        from: 'now-5m',
        to: 'now',
        index: ['index-1'],
        name: 'some-name',
        severity: 'low',
        interval: '5m',
        type: 'query',
      }).error
    ).toBeFalsy();
  });

  test('[rule_id, description, from, to, index, name, severity, interval, type, query] does validate', () => {
    expect(
      updateRulesSchema.validate<Partial<UpdateRuleAlertParamsRest>>({
        rule_id: 'rule-1',
        description: 'some description',
        from: 'now-5m',
        to: 'now',
        index: ['index-1'],
        name: 'some-name',
        severity: 'low',
        interval: '5m',
        type: 'query',
        query: 'some query',
      }).error
    ).toBeFalsy();
  });

  test('[id, description, from, to, index, name, severity, interval, type, query] does validate', () => {
    expect(
      updateRulesSchema.validate<Partial<UpdateRuleAlertParamsRest>>({
        id: 'rule-1',
        description: 'some description',
        from: 'now-5m',
        to: 'now',
        index: ['index-1'],
        name: 'some-name',
        severity: 'low',
        interval: '5m',
        type: 'query',
        query: 'some query',
      }).error
    ).toBeFalsy();
  });

  test('[rule_id, description, from, to, index, name, severity, interval, type, query, language] does validate', () => {
    expect(
      updateRulesSchema.validate<Partial<UpdateRuleAlertParamsRest>>({
        rule_id: 'rule-1',
        description: 'some description',
        from: 'now-5m',
        to: 'now',
        index: ['index-1'],
        name: 'some-name',
        severity: 'low',
        interval: '5m',
        type: 'query',
        query: 'some query',
        language: 'kuery',
      }).error
    ).toBeFalsy();
  });

  test('[id, description, from, to, index, name, severity, interval, type, query, language] does validate', () => {
    expect(
      updateRulesSchema.validate<Partial<UpdateRuleAlertParamsRest>>({
        id: 'rule-1',
        description: 'some description',
        from: 'now-5m',
        to: 'now',
        index: ['index-1'],
        name: 'some-name',
        severity: 'low',
        interval: '5m',
        type: 'query',
        query: 'some query',
        language: 'kuery',
      }).error
    ).toBeFalsy();
  });

  test('[rule_id, description, from, to, index, name, severity, type, filter] does validate', () => {
    expect(
      updateRulesSchema.validate<Partial<UpdateRuleAlertParamsRest>>({
        rule_id: 'rule-1',
        description: 'some description',
        from: 'now-5m',
        to: 'now',
        index: ['index-1'],
        name: 'some-name',
        severity: 'low',
        interval: '5m',
        type: 'query',
      }).error
    ).toBeFalsy();
  });

  test('[id, description, from, to, index, name, severity, type, filter] does validate', () => {
    expect(
      updateRulesSchema.validate<Partial<UpdateRuleAlertParamsRest>>({
        id: 'rule-1',
        description: 'some description',
        from: 'now-5m',
        to: 'now',
        index: ['index-1'],
        name: 'some-name',
        severity: 'low',
        interval: '5m',
        type: 'query',
      }).error
    ).toBeFalsy();
  });

  test('allows references to be sent as a valid value to update with', () => {
    expect(
      updateRulesSchema.validate<Partial<UpdateRuleAlertParamsRest>>({
        id: 'rule-1',
        description: 'some description',
        from: 'now-5m',
        to: 'now',
        index: ['index-1'],
        name: 'some-name',
        severity: 'low',
        interval: '5m',
        type: 'query',
        references: ['index-1'],
        query: 'some query',
        language: 'kuery',
      }).error
    ).toBeFalsy();
  });

  test('does not default references to an array', () => {
    expect(
      updateRulesSchema.validate<Partial<UpdateRuleAlertParamsRest>>({
        id: 'rule-1',
        description: 'some description',
        from: 'now-5m',
        to: 'now',
        index: ['index-1'],
        name: 'some-name',
        severity: 'low',
        interval: '5m',
        type: 'query',
        query: 'some-query',
        language: 'kuery',
      }).value.references
    ).toEqual(undefined);
  });

  test('does not default interval', () => {
    expect(
      updateRulesSchema.validate<Partial<UpdateRuleAlertParamsRest>>({
        id: 'rule-1',
        description: 'some description',
        from: 'now-5m',
        to: 'now',
        index: ['index-1'],
        name: 'some-name',
        severity: 'low',
        type: 'query',
      }).value.interval
    ).toEqual(undefined);
  });

  test('does not default max signal', () => {
    expect(
      updateRulesSchema.validate<Partial<UpdateRuleAlertParamsRest>>({
        id: 'rule-1',
        description: 'some description',
        from: 'now-5m',
        to: 'now',
        index: ['index-1'],
        name: 'some-name',
        severity: 'low',
        interval: '5m',
        type: 'query',
      }).value.max_signals
    ).toEqual(undefined);
  });

  test('references cannot be numbers', () => {
    expect(
      updateRulesSchema.validate<
        Partial<Omit<UpdateRuleAlertParamsRest, 'references'>> & { references: number[] }
      >({
        id: 'rule-1',
        description: 'some description',
        from: 'now-5m',
        to: 'now',
        index: ['index-1'],
        name: 'some-name',
        severity: 'low',
        interval: '5m',
        type: 'query',
        query: 'some-query',
        language: 'kuery',
        references: [5],
      }).error.message
    ).toEqual(
      'child "references" fails because ["references" at position 0 fails because ["0" must be a string]]'
    );
  });

  test('indexes cannot be numbers', () => {
    expect(
      updateRulesSchema.validate<
        Partial<Omit<UpdateRuleAlertParamsRest, 'index'>> & { index: number[] }
      >({
        id: 'rule-1',
        description: 'some description',
        from: 'now-5m',
        to: 'now',
        index: [5],
        name: 'some-name',
        severity: 'low',
        interval: '5m',
        type: 'query',
        query: 'some-query',
        language: 'kuery',
      }).error.message
    ).toEqual(
      'child "index" fails because ["index" at position 0 fails because ["0" must be a string]]'
    );
  });

  test('saved_id is not required when type is saved_query and will validate without it', () => {
    expect(
      updateRulesSchema.validate<Partial<UpdateRuleAlertParamsRest>>({
        id: 'rule-1',
        description: 'some description',
        from: 'now-5m',
        to: 'now',
        index: ['index-1'],
        name: 'some-name',
        severity: 'low',
        interval: '5m',
        type: 'saved_query',
      }).error
    ).toBeFalsy();
  });

  test('saved_id validates with saved_query', () => {
    expect(
      updateRulesSchema.validate<Partial<UpdateRuleAlertParamsRest>>({
        id: 'rule-1',
        description: 'some description',
        from: 'now-5m',
        to: 'now',
        index: ['index-1'],
        name: 'some-name',
        severity: 'low',
        interval: '5m',
        type: 'saved_query',
        saved_id: 'some id',
      }).error
    ).toBeFalsy();
  });

  test('saved_query type can have filters with it', () => {
    expect(
      updateRulesSchema.validate<Partial<UpdateRuleAlertParamsRest>>({
        id: 'rule-1',
        description: 'some description',
        from: 'now-5m',
        to: 'now',
        index: ['index-1'],
        name: 'some-name',
        severity: 'low',
        interval: '5m',
        type: 'saved_query',
        saved_id: 'some id',
        filters: [],
      }).error
    ).toBeFalsy();
  });

  test('language validates with kuery', () => {
    expect(
      updateRulesSchema.validate<Partial<UpdateRuleAlertParamsRest>>({
        id: 'rule-1',
        description: 'some description',
        from: 'now-5m',
        to: 'now',
        index: ['index-1'],
        name: 'some-name',
        severity: 'low',
        interval: '5m',
        type: 'query',
        references: ['index-1'],
        query: 'some query',
        language: 'kuery',
      }).error
    ).toBeFalsy();
  });

  test('language validates with lucene', () => {
    expect(
      updateRulesSchema.validate<Partial<UpdateRuleAlertParamsRest>>({
        id: 'rule-1',
        description: 'some description',
        from: 'now-5m',
        to: 'now',
        index: ['index-1'],
        name: 'some-name',
        severity: 'low',
        interval: '5m',
        type: 'query',
        references: ['index-1'],
        query: 'some query',
        language: 'lucene',
      }).error
    ).toBeFalsy();
  });

  test('language does not validate with something made up', () => {
    expect(
      updateRulesSchema.validate<Partial<UpdateRuleAlertParamsRest>>({
        id: 'rule-1',
        description: 'some description',
        from: 'now-5m',
        to: 'now',
        index: ['index-1'],
        name: 'some-name',
        severity: 'low',
        interval: '5m',
        type: 'query',
        references: ['index-1'],
        query: 'some query',
        language: 'something-made-up',
      }).error.message
    ).toEqual('child "language" fails because ["language" must be one of [kuery, lucene]]');
  });

  test('max_signals cannot be negative', () => {
    expect(
      updateRulesSchema.validate<Partial<UpdateRuleAlertParamsRest>>({
        id: 'rule-1',
        description: 'some description',
        from: 'now-5m',
        to: 'now',
        index: ['index-1'],
        name: 'some-name',
        severity: 'low',
        interval: '5m',
        type: 'query',
        references: ['index-1'],
        query: 'some query',
        language: 'kuery',
        max_signals: -1,
      }).error.message
    ).toEqual('child "max_signals" fails because ["max_signals" must be greater than 0]');
  });

  test('max_signals cannot be zero', () => {
    expect(
      updateRulesSchema.validate<Partial<UpdateRuleAlertParamsRest>>({
        id: 'rule-1',
        description: 'some description',
        from: 'now-5m',
        to: 'now',
        index: ['index-1'],
        name: 'some-name',
        severity: 'low',
        interval: '5m',
        type: 'query',
        references: ['index-1'],
        query: 'some query',
        language: 'kuery',
        max_signals: 0,
      }).error.message
    ).toEqual('child "max_signals" fails because ["max_signals" must be greater than 0]');
  });

  test('max_signals can be 1', () => {
    expect(
      updateRulesSchema.validate<Partial<UpdateRuleAlertParamsRest>>({
        id: 'rule-1',
        description: 'some description',
        from: 'now-5m',
        to: 'now',
        index: ['index-1'],
        name: 'some-name',
        severity: 'low',
        interval: '5m',
        type: 'query',
        references: ['index-1'],
        query: 'some query',
        language: 'kuery',
        max_signals: 1,
      }).error
    ).toBeFalsy();
  });

  test('meta can be updated', () => {
    expect(
      updateRulesSchema.validate<Partial<UpdateRuleAlertParamsRest>>({
        id: 'rule-1',
        meta: { whateverYouWant: 'anything_at_all' },
      }).error
    ).toBeFalsy();
  });

  test('You cannot update meta as a string', () => {
    expect(
      updateRulesSchema.validate<
        Partial<Omit<UpdateRuleAlertParamsRest, 'meta'> & { meta: string }>
      >({
        id: 'rule-1',
        meta: 'should not work',
      }).error.message
    ).toEqual('child "meta" fails because ["meta" must be an object]');
  });

  test('filters cannot be a string', () => {
    expect(
      updateRulesSchema.validate<
        Partial<Omit<UpdateRuleAlertParamsRest, 'filters'> & { filters: string }>
      >({
        rule_id: 'rule-1',
        type: 'query',
        filters: 'some string',
      }).error.message
    ).toEqual('child "filters" fails because ["filters" must be an array]');
  });

  test('threats is not defaulted to empty array on update', () => {
    expect(
      updateRulesSchema.validate<Partial<UpdateRuleAlertParamsRest>>({
        id: 'rule-1',
        description: 'some description',
        from: 'now-5m',
        to: 'now',
        index: ['index-1'],
        name: 'some-name',
        severity: 'low',
        interval: '5m',
        type: 'query',
        references: ['index-1'],
        query: 'some query',
        language: 'kuery',
        max_signals: 1,
      }).value.threats
    ).toBe(undefined);
  });

  test('threats is not defaulted to undefined on update with empty array', () => {
    expect(
      updateRulesSchema.validate<Partial<UpdateRuleAlertParamsRest>>({
        id: 'rule-1',
        description: 'some description',
        from: 'now-5m',
        to: 'now',
        index: ['index-1'],
        name: 'some-name',
        severity: 'low',
        interval: '5m',
        type: 'query',
        references: ['index-1'],
        query: 'some query',
        language: 'kuery',
        max_signals: 1,
        threats: [],
      }).value.threats
    ).toMatchObject([]);
  });

  test('threats is valid when updated with all sub-objects', () => {
    const expected: ThreatParams[] = [
      {
        framework: 'fake',
        tactic: {
          id: 'fakeId',
          name: 'fakeName',
          reference: 'fakeRef',
        },
        techniques: [
          {
            id: 'techniqueId',
            name: 'techniqueName',
            reference: 'techniqueRef',
          },
        ],
      },
    ];
    expect(
      updateRulesSchema.validate<Partial<UpdateRuleAlertParamsRest>>({
        id: 'rule-1',
        description: 'some description',
        from: 'now-5m',
        to: 'now',
        index: ['index-1'],
        name: 'some-name',
        severity: 'low',
        interval: '5m',
        type: 'query',
        references: ['index-1'],
        query: 'some query',
        language: 'kuery',
        max_signals: 1,
        threats: [
          {
            framework: 'fake',
            tactic: {
              id: 'fakeId',
              name: 'fakeName',
              reference: 'fakeRef',
            },
            techniques: [
              {
                id: 'techniqueId',
                name: 'techniqueName',
                reference: 'techniqueRef',
              },
            ],
          },
        ],
      }).value.threats
    ).toMatchObject(expected);
  });

  test('threats is invalid when updated with missing property framework', () => {
    expect(
      updateRulesSchema.validate<
        Partial<Omit<UpdateRuleAlertParamsRest, 'threats'>> & {
          threats: Array<Partial<Omit<ThreatParams, 'framework'>>>;
        }
      >({
        id: 'rule-1',
        description: 'some description',
        from: 'now-5m',
        to: 'now',
        index: ['index-1'],
        name: 'some-name',
        severity: 'low',
        interval: '5m',
        type: 'query',
        references: ['index-1'],
        query: 'some query',
        language: 'kuery',
        max_signals: 1,
        threats: [
          {
            tactic: {
              id: 'fakeId',
              name: 'fakeName',
              reference: 'fakeRef',
            },
            techniques: [
              {
                id: 'techniqueId',
                name: 'techniqueName',
                reference: 'techniqueRef',
              },
            ],
          },
        ],
      }).error.message
    ).toEqual(
      'child "threats" fails because ["threats" at position 0 fails because [child "framework" fails because ["framework" is required]]]'
    );
  });

  test('threats is invalid when updated with missing tactic sub-object', () => {
    expect(
      updateRulesSchema.validate<
        Partial<Omit<UpdateRuleAlertParamsRest, 'threats'>> & {
          threats: Array<Partial<Omit<ThreatParams, 'tactic'>>>;
        }
      >({
        id: 'rule-1',
        description: 'some description',
        from: 'now-5m',
        to: 'now',
        index: ['index-1'],
        name: 'some-name',
        severity: 'low',
        interval: '5m',
        type: 'query',
        references: ['index-1'],
        query: 'some query',
        language: 'kuery',
        max_signals: 1,
        threats: [
          {
            framework: 'fake',
            techniques: [
              {
                id: 'techniqueId',
                name: 'techniqueName',
                reference: 'techniqueRef',
              },
            ],
          },
        ],
      }).error.message
    ).toEqual(
      'child "threats" fails because ["threats" at position 0 fails because [child "tactic" fails because ["tactic" is required]]]'
    );
  });

  test('threats is invalid when updated with missing techniques', () => {
    expect(
      updateRulesSchema.validate<
        Partial<Omit<UpdateRuleAlertParamsRest, 'threats'>> & {
          threats: Array<Partial<Omit<ThreatParams, 'techniques'>>>;
        }
      >({
        id: 'rule-1',
        description: 'some description',
        from: 'now-5m',
        to: 'now',
        index: ['index-1'],
        name: 'some-name',
        severity: 'low',
        interval: '5m',
        type: 'query',
        references: ['index-1'],
        query: 'some query',
        language: 'kuery',
        max_signals: 1,
        threats: [
          {
            framework: 'fake',
            tactic: {
              id: 'techniqueId',
              name: 'techniqueName',
              reference: 'techniqueRef',
            },
          },
        ],
      }).error.message
    ).toEqual(
      'child "threats" fails because ["threats" at position 0 fails because [child "techniques" fails because ["techniques" is required]]]'
    );
  });

  test('validates with timeline_id and timeline_title', () => {
    expect(
      updateRulesSchema.validate<Partial<UpdateRuleAlertParamsRest>>({
        id: 'rule-1',
        description: 'some description',
        from: 'now-5m',
        to: 'now',
        index: ['index-1'],
        name: 'some-name',
        severity: 'low',
        interval: '5m',
        type: 'saved_query',
        saved_id: 'some id',
        timeline_id: 'some-id',
        timeline_title: 'some-title',
      }).error
    ).toBeFalsy();
  });

  test('You cannot omit timeline_title when timeline_id is present', () => {
    expect(
      updateRulesSchema.validate<Partial<UpdateRuleAlertParamsRest>>({
        id: 'rule-1',
        description: 'some description',
        from: 'now-5m',
        to: 'now',
        index: ['index-1'],
        name: 'some-name',
        severity: 'low',
        interval: '5m',
        type: 'saved_query',
        saved_id: 'some id',
        timeline_id: 'some-id',
      }).error.message
    ).toEqual('child "timeline_title" fails because ["timeline_title" is required]');
  });

  test('You cannot have a null value for timeline_title when timeline_id is present', () => {
    expect(
      updateRulesSchema.validate<Partial<UpdateRuleAlertParamsRest>>({
        id: 'rule-1',
        description: 'some description',
        from: 'now-5m',
        to: 'now',
        index: ['index-1'],
        name: 'some-name',
        severity: 'low',
        interval: '5m',
        type: 'saved_query',
        saved_id: 'some id',
        timeline_id: 'timeline-id',
        timeline_title: null,
      }).error.message
    ).toEqual('child "timeline_title" fails because ["timeline_title" must be a string]');
  });

  test('You cannot have empty string for timeline_title when timeline_id is present', () => {
    expect(
      updateRulesSchema.validate<Partial<UpdateRuleAlertParamsRest>>({
        id: 'rule-1',
        description: 'some description',
        from: 'now-5m',
        to: 'now',
        index: ['index-1'],
        name: 'some-name',
        severity: 'low',
        interval: '5m',
        type: 'saved_query',
        saved_id: 'some id',
        timeline_id: 'some-id',
        timeline_title: '',
      }).error.message
    ).toEqual('child "timeline_title" fails because ["timeline_title" is not allowed to be empty]');
  });

  test('You cannot have timeline_title with an empty timeline_id', () => {
    expect(
      updateRulesSchema.validate<Partial<UpdateRuleAlertParamsRest>>({
        id: 'rule-1',
        description: 'some description',
        from: 'now-5m',
        to: 'now',
        index: ['index-1'],
        name: 'some-name',
        severity: 'low',
        interval: '5m',
        type: 'saved_query',
        saved_id: 'some id',
        timeline_id: '',
        timeline_title: 'some-title',
      }).error.message
    ).toEqual('child "timeline_id" fails because ["timeline_id" is not allowed to be empty]');
  });

  test('You cannot have timeline_title without timeline_id', () => {
    expect(
      updateRulesSchema.validate<Partial<UpdateRuleAlertParamsRest>>({
        id: 'rule-1',
        description: 'some description',
        from: 'now-5m',
        to: 'now',
        index: ['index-1'],
        name: 'some-name',
        severity: 'low',
        interval: '5m',
        type: 'saved_query',
        saved_id: 'some id',
        timeline_title: 'some-title',
      }).error.message
    ).toEqual('child "timeline_title" fails because ["timeline_title" is not allowed]');
  });

  test('You cannot set the severity to a value other than low, medium, high, or critical', () => {
    expect(
      updateRulesSchema.validate<Partial<UpdateRuleAlertParamsRest>>({
        id: 'rule-1',
        risk_score: 50,
        description: 'some description',
        name: 'some-name',
        severity: 'junk',
        type: 'query',
        references: ['index-1'],
        query: 'some query',
        language: 'kuery',
        max_signals: 1,
        version: 1,
      }).error.message
    ).toEqual(
      'child "severity" fails because ["severity" must be one of [low, medium, high, critical]]'
    );
  });
});
