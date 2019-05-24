import nanoid from 'nanoid'
export function generatorClientId (len = 32) {
  return nanoid(len)
}

export class LocalStorage {
  static setItem (key, value) {
    if (typeof value === 'string') {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }
  static getItem (key) {
    const val = localStorage.getItem(key)
    if (val === null) {
      return null
    }

    return JSON.parse(val)
  }
}

export function delay (ms) {
  // eslint-disable-next-line promise/param-names
  return new Promise(res => {
    setTimeout(() => {
      res(true)
    }, ms)
  })
}
