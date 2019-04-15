import nanoid from 'nanoid'
export function generatorClientId (len = 32) {
  return nanoid(len)
}

export class LocalStorage {
  static setItem (key, value) {
    if (typeof value === 'string') {
      localStorage.setItem(key, JSON.stringify({
        _format: 'string',
        value
      }))
    }
    if (typeof value === 'object') {
      localStorage.setItem(key, JSON.stringify({
        _format: 'object',
        value
      }))
    }
  }
  static getItem (key) {
    const val = localStorage.getItem(key)
    if (val === null) {
      return null
    }

    return JSON.parse(val).value
  }
}
