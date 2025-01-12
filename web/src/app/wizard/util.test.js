import { DateTime } from 'luxon'
import {
  getService,
  getEscalationPolicy,
  getSchedule,
  getScheduleTargets,
} from './util'
import { usersSchedules, rotationsNoFTS, rotationsAndFTS } from './utilTestData'

const description = 'Generated by Setup Wizard'

describe('wizard tests', () => {
  it('get service', () => {
    expect(getService(usersSchedules)).toEqual({
      name: 'Test Service',
      description,
      favorite: true,
      newIntegrationKeys: [
        {
          type: usersSchedules.key.value,
          name: `${usersSchedules.key.label} Integration Key`,
        },
      ],
    })
  })

  it('get escalation policy', () => {
    expect(getEscalationPolicy(usersSchedules)).toEqual({
      name: 'Test Escalation Policy',
      description,
      repeat: usersSchedules.repeat,
    })
  })

  it('get primary schedule', () => {
    expect(getSchedule('primarySchedule', usersSchedules)).toEqual({
      name: 'Test Primary Schedule',
      description,
      timeZone: usersSchedules.primarySchedule.timeZone,
    })
  })

  it('get secondary schedule', () => {
    expect(getSchedule('secondarySchedule', usersSchedules)).toEqual({
      name: 'Test Secondary Schedule',
      description,
      timeZone: usersSchedules.secondarySchedule.timeZone,
    })
  })

  it('get primary schedule targets as users', () => {
    expect(getScheduleTargets('primarySchedule', usersSchedules)).toEqual([
      {
        target: {
          id: '50322144-1e88-43dc-b638-b16a5be7bad6',
          type: 'user',
        },
        rules: [{}],
      },
      {
        target: {
          id: 'dfcc0684-f045-4a9f-8931-56da8a014a44',
          type: 'user',
        },
        rules: [{}],
      },
      {
        target: {
          id: '016d5895-b20f-42fd-ad6c-7f1e4c11354d',
          type: 'user',
        },
        rules: [{}],
      },
    ])
  })

  it('get secondary schedule targets as users', () => {
    expect(getScheduleTargets('secondarySchedule', usersSchedules)).toEqual([
      {
        target: {
          id: '50322144-1e88-43dc-b638-b16a5be7bad6',
          type: 'user',
        },
        rules: [{}],
      },
      {
        target: {
          id: 'dfcc0684-f045-4a9f-8931-56da8a014a44',
          type: 'user',
        },
        rules: [{}],
      },
      {
        target: {
          id: '016d5895-b20f-42fd-ad6c-7f1e4c11354d',
          type: 'user',
        },
        rules: [{}],
      },
    ])
  })

  it('get primary schedule targets as rotation, no fts', () => {
    const timeZone = rotationsNoFTS.primarySchedule.timeZone
    const start = rotationsNoFTS.primarySchedule.rotation.startDate
    const type = rotationsNoFTS.primarySchedule.rotation.type
    const userIDs = rotationsNoFTS.primarySchedule.users

    expect(getScheduleTargets('primarySchedule', rotationsNoFTS)).toEqual([
      {
        newRotation: {
          name: 'Test Primary America-Chicago Rotation',
          description,
          timeZone,
          start: DateTime.fromISO(start)
            .minus({ day: 1 })
            .toISO(),
          type,
          userIDs,
        },
        rules: [{}],
      },
    ])
  })

  it('get secondary schedule targets as rotation, no fts', () => {
    const timeZone = rotationsNoFTS.secondarySchedule.timeZone
    const start = rotationsNoFTS.secondarySchedule.rotation.startDate
    const type = rotationsNoFTS.secondarySchedule.rotation.type
    const userIDs = rotationsNoFTS.secondarySchedule.users

    expect(getScheduleTargets('secondarySchedule', rotationsNoFTS)).toEqual([
      {
        newRotation: {
          name: 'Test Secondary Africa-Accra Rotation',
          description,
          timeZone,
          start: DateTime.fromISO(start)
            .minus({ week: 1 })
            .toISO(),
          type,
          userIDs,
        },
        rules: [{}],
      },
    ])
  })

  it('get primary schedule targets as rotation, fts', () => {
    const timeZone = rotationsAndFTS.primarySchedule.timeZone
    const ftsTimeZone =
      rotationsAndFTS.primarySchedule.followTheSunRotation.timeZone
    const start = rotationsAndFTS.primarySchedule.rotation.startDate
    const type = rotationsAndFTS.primarySchedule.rotation.type
    const userIDs = rotationsAndFTS.primarySchedule.users
    const ftsUserIDs =
      rotationsAndFTS.primarySchedule.followTheSunRotation.users

    expect(getScheduleTargets('primarySchedule', rotationsAndFTS)).toEqual([
      {
        newRotation: {
          name: 'Test Primary Etc-UTC Rotation',
          description,
          timeZone,
          start: DateTime.fromISO(start)
            .minus({ week: 1 })
            .toISO(),
          type,
          userIDs,
        },
        rules: [{ start: '09:00', end: '21:00' }],
      },
      {
        newRotation: {
          name: 'Test Primary America-Chicago Rotation',
          description,
          timeZone: ftsTimeZone,
          start: DateTime.fromISO(start)
            .minus({ week: 1 })
            .toISO(),
          type,
          userIDs: ftsUserIDs,
        },
        rules: [{ start: '21:00', end: '09:00' }],
      },
    ])
  })

  it('get secondary schedule targets as rotation, fts', () => {
    const timeZone = rotationsAndFTS.secondarySchedule.timeZone
    const ftsTimeZone =
      rotationsAndFTS.secondarySchedule.followTheSunRotation.timeZone
    const start = rotationsAndFTS.secondarySchedule.rotation.startDate
    const type = rotationsAndFTS.secondarySchedule.rotation.type
    const userIDs = rotationsAndFTS.secondarySchedule.users
    const ftsUserIDs =
      rotationsAndFTS.secondarySchedule.followTheSunRotation.users

    expect(getScheduleTargets('secondarySchedule', rotationsAndFTS)).toEqual([
      {
        newRotation: {
          name: 'Test Secondary Africa-Accra Rotation',
          description,
          timeZone,
          start: DateTime.fromISO(start)
            .minus({ day: 1 })
            .toISO(),
          type,
          userIDs,
        },
        rules: [{ start: '09:00', end: '21:00' }],
      },
      {
        // also tests if FTS time zone is the same as the original, prepend FTS
        // so names don't conflict
        newRotation: {
          name: 'Test Secondary Africa-Accra FTS Rotation',
          description,
          timeZone: ftsTimeZone,
          start: DateTime.fromISO(start)
            .minus({ day: 1 })
            .toISO(),
          type,
          userIDs: ftsUserIDs,
        },
        rules: [{ start: '21:00', end: '09:00' }],
      },
    ])
  })
})
