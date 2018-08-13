import Vue from 'vue'

export default {
  name: 'CoinDao',
  findAll () {
    return Vue.http.get('/api/coins')
  },
  findByTicker (ticker) {
    return Vue.http.get('/api/coins/' + ticker)
  },
  getTypes () {
    return [
      {
        value: 'POW',
        text: 'POW'
      },
      {
        value: 'POW_POS',
        text: 'POW+POS'
      },
      {
        value: 'POS',
        text: 'POS'
      }
    ]
  },
  getAlgorithms () {
    return [
      'SHA-256',
      'SHA-256D',
      'SHA-512',
      'Dagger-Hashimoto',
      'Scrypt',
      'blake2b',
      'X11',
      'X13',
      'X14',
      'X15',
      'CryptoNight',
      'Equihash',
      'Qubit',
      'Skein',
      'Groestl',
      'Blake256',
      'LBRY',
      'Lyra2RE',
      'X11gost',
      'Quark',
      'Keccak',
      'Yescrypt',
      'Scrypt-jane',
      'Scrypt-N',
      'Neoscrypt',
      'NIST5',
      'C11',
      'Hevan'
    ]
  }
}
