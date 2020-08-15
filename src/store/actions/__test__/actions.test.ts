import addPage from '../add-page'
import changeCardStatus from '../change-card-status'
import * as types from '../../types'

describe('Action Creators', () => {
  test('addPage', () => {
    const values = { id: 'card', payload: { filter: true, name: 'content' } }
    const actual = addPage(values)
    const expected = { type: types.ADD_PAGE, ...values }

    expect(actual).toStrictEqual(expected)
  })

  test('changeCardStatus', () => {
    const values = { id: 2, status: 'pending' }
    const actual = changeCardStatus(values)
    const expected = { type: types.UPDATE_CARD_STATUS, payload: values }

    expect(actual).toStrictEqual(expected)
  })
})
