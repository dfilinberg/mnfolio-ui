<template>
  <b-container>
    <b-row>
      <b-col md="6">
        <b-form-group class="mb-12">
          <b-form-input v-model="filter" class="w-300" placeholder="Filter ..."/>
        </b-form-group>
        <b-form-group class="mb-12 d-none d-sm-none">
          <a href="#">Advanced filter</a>
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group class="text-right">
          <b-form-select :options="currencies"
                         v-model="baseCurrency"
                         class="w-25">
          </b-form-select>
          <b-button v-if="true" to="/coins/edit" variant="primary" class="ml-3">Add Coin</b-button>
        </b-form-group>
      </b-col>
    </b-row>
    <b-table
      responsive
      show-empty
      stacked="md"
      :items="coins"
      :fields="fields"
      :filter="filter">
      <template slot="coin" slot-scope="coin">
        <div class="nowrap">
          <img width="24" class="mr-1" :src="coin.item.logoUrl">
          <router-link class="text-primary" :to="{path: '/coins/' + coin.item.ticker.toLowerCase()}">
            <strong>{{coin.item.name}}</strong>
            <strong>({{coin.item.ticker}})</strong>
          </router-link>
        </div>
      </template>
      <template slot="price" slot-scope="coin">
        <div class="nowrap text-center"
             v-bind:class="{'text-danger': coin.item.change < 0, 'text-success': coin.item.change >= 0}">
          <span v-if="baseCurrency === 'USD'" title="Price in USD">
            <icon name="usd"></icon> {{coin.item.price.usd}}</span>
          <span v-else-if="baseCurrency === 'EUR'" title="Price in EUR">
            <icon name="eur"></icon> {{coin.item.price.eur}}</span>
          <span v-else-if="baseCurrency === 'BTC'" title="Price in BTC">
            <icon name="btc"></icon> {{coin.item.price.btc}}</span>
        </div>
        <div class="nowrap text-center"
             v-bind:class="{'text-danger': coin.item.change < 0, 'text-success': coin.item.change >= 0}">
          <span v-if="coin.item.change > 0">+</span>
          <small title="Change 24h">{{coin.item.change}} %</small>
        </div>
      </template>
      <template slot="market" slot-scope="coin">
        <div class="nowrap text-center">
          <strong v-if="baseCurrency === 'USD'" title="Marketcap">
            <icon name="usd"></icon>
            {{coin.item.market.usd.cap | formatNumber}}</strong>
          <strong v-else-if="baseCurrency === 'EUR'" title="Marketcap">
            <icon name="eur"></icon>
            {{coin.item.market.eur.cap | formatNumber}}</strong>
          <strong v-else-if="baseCurrency === 'BTC'" title="Marketcap">
            <icon name="btc"></icon>
            {{coin.item.market.btc.cap | formatNumber}}</strong>
        </div>
        <div class="nowrap text-center text-muted">
          <small v-if="baseCurrency === 'USD'" title="Volume 24h">
            Volume:
            <icon name="usd" scale="0.7"></icon>
            {{coin.item.market.usd.volume | formatNumber}}
          </small>
          <small v-else-if="baseCurrency === 'EUR'" title="Volume 24h">
            Volume:
            <icon name="eur" scale="0.7"></icon>
            {{coin.item.market.eur.volume | formatNumber}}
          </small>
          <small v-else-if="baseCurrency === 'BTC'" title="Volume 24h">
            Volume:
            <icon name="btc" scale="0.7"></icon>
            {{coin.item.market.btc.volume | formatNumber}}
          </small>
        </div>
        <div class="nowrap text-center text-muted">
          <small v-if="baseCurrency === 'USD'" title="Circulating Supply">
            Supply:
            <icon name="usd" scale="0.7"></icon>
            {{coin.item.market.usd.supply | formatNumber}}
          </small>
          <small v-else-if="baseCurrency === 'EUR'" title="Circulating Supply">
            Supply:
            <icon name="eur" scale="0.7"></icon>
            {{coin.item.market.eur.supply | formatNumber}}
          </small>
          <small v-else-if="baseCurrency === 'BTC'" title="Circulating Supply">
            Supply:
            <icon name="btc" scale="0.7"></icon>
            {{coin.item.market.btc.supply | formatNumber}}
          </small>
        </div>
        <div class="nowrap text-center text-muted">
          <small v-if="baseCurrency === 'USD'" title="Coins locked">
            Locked:
            {{100 * coin.item.market.usd.locked / coin.item.market.usd.supply | formatPercent}}%
          </small>
          <small v-else-if="baseCurrency === 'EUR'" title="Coins locked">
            Locked:
            {{100 * coin.item.market.eur.locked / coin.item.market.usd.supply | formatPercent}}%
          </small>
          <small v-else-if="baseCurrency === 'BTC'" title="Coins locked">
            Locked:
            {{100 * coin.item.market.btc.locked / coin.item.market.usd.supply | formatPercent}}%
          </small>
        </div>
      </template>
      <template slot="roi" slot-scope="coin">
        <div class="nowrap text-center">
          <strong title="Annual">{{coin.item.roi.annual}} %</strong>
        </div>
        <div class="nowrap text-center text-muted">
          <small class="text-muted">month: {{coin.item.roi.month}} %</small>
        </div>
      </template>
      <template slot="blockReward" slot-scope="coin">
        <div v-if="coin.item.blockRewards.type === 'fixed'">
          <div class="nowrap text-center">
            <strong>{{coin.item.blockRewards.pow + coin.item.blockRewards.pos + coin.item.blockRewards.masternode}}
              {{coin.item.ticker}}</strong>
          </div>
          <div class="nowrap text-center">
            <small class="text-muted">
              <span v-if="coin.item.blockRewards.pow > 0">
                {{100 * coin.item.blockRewards.pow / (coin.item.blockRewards.pow + coin.item.blockRewards.pos + coin.item.blockRewards.masternode) | formatPercent}}% POW
              </span>
              <strong v-if="coin.item.blockRewards.pow > 0 && coin.item.blockRewards.pos > 0">+</strong>
              <span v-if="coin.item.blockRewards.pos > 0">
                {{100 * coin.item.blockRewards.pos / (coin.item.blockRewards.pow + coin.item.blockRewards.pos + coin.item.blockRewards.masternode) | formatPercent}}% POS
              </span>
              <strong v-if="coin.item.blockRewards.masternode > 0">+</strong>
              <span v-if="coin.item.blockRewards.masternode > 0">
                {{100 * coin.item.blockRewards.masternode / (coin.item.blockRewards.pow + coin.item.blockRewards.pos + coin.item.blockRewards.masternode) | formatPercent}}% MN
              </span>
            </small>
          </div>
          <div v-if="coin.item.blockRewards.pow > 0" class="nowrap text-center">
            <small class="text-muted">{{coin.item.algorithm}}</small>
          </div>
        </div>
        <div v-if="coin.item.blockRewards.type === 'height'">
          <div class="nowrap text-center">
            <strong>
              {{coin.item.blockRewards.pow + coin.item.blockRewards.pos + coin.item.blockRewards.masternode}}
              {{coin.item.ticker}}
            </strong>
            <icon :id="'blockRewardHeight' + coin.id"
                  name="question-circle"
                  class="ml-2 help"></icon>
            <b-popover :target="'blockRewardHeight' + coin.id" triggers="click blur">
              <template slot="title">Block rewards by height</template>
              <p v-for="reward in coin.item.blockRewards.rewards"
                 :key="reward.first"
                 v-bind:class="{'text-primary': reward.current, 'text-muted': !reward.current}">
                blocks <strong>{{reward.first}}</strong> .. <strong
                v-if="reward.last > 0">{{reward.last}}</strong><strong v-if="reward.last === 0">&infin;</strong>
                <br>
                <strong>{{reward.pow + reward.pos + reward.masternode}} {{coin.item.ticker}}</strong>&nbsp;
                (<span v-if="reward.pow > 0">
                  {{100 * reward.pow / (reward.pow + reward.pos + reward.masternode) | formatPercent}}% POW
                </span>
                <strong v-if="reward.pow > 0 && reward.pos > 0">+</strong>
                <span v-if="reward.pos > 0">
                  {{100 * reward.pos / (reward.pow + reward.pos + reward.masternode) | formatPercent}}% POS
                </span>
                <strong v-if="reward.masternode > 0">+</strong>
                <span v-if="reward.masternode > 0">
                  {{100 * reward.masternode / (reward.pow + reward.pos + reward.masternode) | formatPercent}}% MN
                </span>)
                <span v-if="reward.current">&nbsp;(current block <em>{{coin.item.height}}</em>)</span>
              </p>
            </b-popover>
          </div>
          <div class="nowrap text-center">
            <small class="text-muted">
              <span v-if="coin.item.blockRewards.pow > 0">
                {{100 * coin.item.blockRewards.pow / (coin.item.blockRewards.pow + coin.item.blockRewards.pos + coin.item.blockRewards.masternode) | formatPercent}}% POW
              </span>
              <strong v-if="coin.item.blockRewards.pow > 0 && coin.item.blockRewards.pos > 0">+</strong>
              <span v-if="coin.item.blockRewards.pos > 0">
                {{100 * coin.item.blockRewards.pos / (coin.item.blockRewards.pow + coin.item.blockRewards.pos + coin.item.blockRewards.masternode) | formatPercent}}% POS
              </span>
              <strong v-if="coin.item.blockRewards.masternode > 0">+</strong>
              <span v-if="coin.item.blockRewards.masternode > 0">
                {{100 * coin.item.blockRewards.masternode / (coin.item.blockRewards.pow + coin.item.blockRewards.pos + coin.item.blockRewards.masternode) | formatPercent}}% MN
              </span>
            </small>
          </div>
          <div v-if="coin.item.blockRewards.pow > 0" class="nowrap text-center">
            <small class="text-muted">{{coin.item.algorithm}}</small>
          </div>
        </div>
        <div v-if="coin.item.blockRewards.type === 'difficulty'">

        </div>
      </template>
      <template slot="nodes" slot-scope="coin">
        <div class="nowrap text-center">
          <strong title="Nodes">
            {{coin.item.nodes}}</strong>
        </div>
        <div class="nowrap text-center text-muted">
          <small v-bind:class="{'text-danger': coin.item.nodesChange < 0, 'text-success': coin.item.nodesChange >= 0}"
                 title="Changes nodes 24h">
            {{coin.item.nodesChange}}%
          </small>
        </div>
      </template>
      <template slot="collateralPrice" slot-scope="coin">
        <div v-if="coin.item.masternodePrice.type === 'fixed'">
          <div class="nowrap text-center">
            <strong>
              {{coin.item.masternodePrice.price}}
              {{coin.item.ticker}}
            </strong>
          </div>
          <div class="nowrap text-center text-muted">
            <small v-if="baseCurrency === 'USD'" title="Collateral price in USD">
              <icon name="usd" scale="0.7"></icon>
              {{coin.item.masternodePrice.price * coin.item.price.usd | formatNumber}}
            </small>
            <small v-else-if="baseCurrency === 'EUR'" title="Collateral price in EUR">
              <icon name="eur" scale="0.7"></icon>
              {{coin.item.masternodePrice.price * coin.item.price.eur | formatNumber}}
            </small>
            <small v-else-if="baseCurrency === 'BTC'" title="Collateral price in BTC">
              <icon name="btc" scale="0.7"></icon>
              {{coin.item.masternodePrice.price * coin.item.price.btc | formatNumber}}
            </small>
          </div>
        </div>
        <div v-if="coin.item.masternodePrice.type === 'height'">
          <div class="nowrap text-center">
            <strong>
              {{coin.item.masternodePrice.price}}
              {{coin.item.ticker}}
            </strong>
            <icon :id="'masternodePriceHeight' + coin.id"
                  name="question-circle"
                  class="ml-2 help"></icon>
            <b-popover :target="'masternodePriceHeight' + coin.id" triggers="click blur">
              <template slot="title">Masternode price by height</template>
              <p v-for="masternodePrice in coin.item.masternodePrice.prices"
                 :key="masternodePrice.first"
                 v-bind:class="{'text-primary': masternodePrice.current, 'text-muted': !masternodePrice.current}">
                blocks <strong>{{masternodePrice.first}}</strong> .. <strong
                v-if="masternodePrice.last > 0">{{masternodePrice.last}}</strong><strong
                v-if="masternodePrice.last === 0">&infin;</strong>
                <br>
                <strong>{{masternodePrice.price}} {{coin.item.ticker}}</strong>&nbsp;
                <span v-if="masternodePrice.current">&nbsp;(current block <em>{{coin.item.height}}</em>)</span>
              </p>
            </b-popover>
          </div>
          <div class="nowrap text-center text-muted">
            <small v-if="baseCurrency === 'USD'" title="Collateral price in USD">
              <icon name="usd" scale="0.7"></icon>
              {{coin.item.masternodePrice.price * coin.item.price.usd | formatNumber}}
            </small>
            <small v-else-if="baseCurrency === 'EUR'" title="Collateral price in EUR">
              <icon name="eur" scale="0.7"></icon>
              {{coin.item.masternodePrice.price * coin.item.price.eur | formatNumber}}
            </small>
            <small v-else-if="baseCurrency === 'BTC'" title="Collateral price in BTC">
              <icon name="btc" scale="0.7"></icon>
              {{coin.item.masternodePrice.price * coin.item.price.btc | formatNumber}}
            </small>
          </div>
        </div>
      </template>
      <template slot="exchanges" slot-scope="coin">
        <div class="text-center">
          <a v-for="exchange in coin.item.exchanges"
             :key="exchange.url"
             :href="exchange.url"
             :title="exchange.name"
             rel="nofollow"
             target="_blank"
             class="mr-1">
            <img width="16" height="16" :src="exchange.image">
          </a>
        </div>
      </template>
      <template slot="actions" slot-scope="coin">
        <b-dropdown variant="link" size="lg" no-caret>
          <template slot="button-content">
            <b-button variant="outline-primary">
              <icon name="ellipsis-v"></icon>
            </b-button>
          </template>
          <b-dropdown-item :to="'/coins/edit/' + coin.item.ticker">Edit</b-dropdown-item>
        </b-dropdown>
      </template>
    </b-table>
  </b-container>
</template>

<script>
  import BasePage from '@/pages/BasePage'

  export default {
    name: 'IndexPage',
    mixins: [BasePage],
    data () {
      return {
        baseCurrency: 'USD',
        currencies: [
          'USD', 'EUR', 'BTC'
        ],
        coins: [{
          name: 'Tune',
          ticker: 'TUN',
          logoUrl: 'https://masternodes.online/coin_image/TUN.png?v=1',
          exchanges: [
            {
              url: 'https://graviex.net/markets/prufbtc',
              name: 'Graviex.net',
              image: 'https://graviex.net/favicon.ico'
            },
            {
              url: 'https://wallet.crypto-bridge.org/market/BRIDGE.SLC_BRIDGE.BTC',
              name: 'CryptoBridge',
              image: 'https://wallet.crypto-bridge.org/favicon.ico'
            }
          ],
          price: {
            btc: 0.00223,
            usd: 16.00983,
            eur: 14.11982
          },
          change: -8.99,
          market: {
            btc: {
              cap: 10948966,
              volume: 11009,
              locked: 21000,
              supply: 198999
            },
            usd: {
              cap: 10948966,
              volume: 11009,
              locked: 21000,
              supply: 198999
            },
            eur: {
              cap: 10948966,
              volume: 11009,
              locked: 21000,
              supply: 198999
            }
          },
          roi: {
            annual: 3401.27,
            month: 283.43,
            days: 3
          },
          blockRewards: {
            type: 'fixed',
            pow: 3,
            pos: 0,
            masternode: 10
          },
          height: 21000,
          nodes: 156,
          nodesChange: 12.33,
          algorithm: 'X11',
          masternodePrice: {
            type: 'fixed',
            price: 1000
          }
        }, {
          name: 'Innova',
          ticker: 'INN',
          logoUrl: 'https://masternodes.online/coin_image/INN.png',
          exchanges: [
            {
              url: 'https://graviex.net/markets/prufbtc',
              name: 'Graviex.net',
              image: 'https://graviex.net/favicon.ico'
            },
            {
              url: 'https://wallet.crypto-bridge.org/market/BRIDGE.SLC_BRIDGE.BTC',
              name: 'CryptoBridge',
              image: 'https://wallet.crypto-bridge.org/favicon.ico'
            }
          ],
          price: {
            btc: 0.0008166,
            usd: 2.0072,
            eur: 1.4118
          },
          change: 12.99,
          market: {
            btc: {
              cap: 106778966.11,
              volume: 123009.3,
              locked: 30000,
              supply: 198999
            },
            usd: {
              cap: 106778966.111,
              volume: 123009.3,
              locked: 30000,
              supply: 198999
            },
            eur: {
              cap: 106778966.11,
              volume: 123009.4,
              locked: 30000,
              supply: 198999
            }
          },
          roi: {
            annual: 7804.21,
            month: 650.35
          },
          blockRewards: {
            type: 'height',
            pow: 0,
            pos: 10,
            masternode: 10,
            rewards: [
              {
                first: 1,
                last: 10000,
                pow: 10,
                pos: 0,
                masternode: 10
              },
              {
                first: 10001,
                last: 100000,
                pow: 0,
                pos: 10,
                masternode: 10,
                current: true
              },
              {
                first: 100001,
                last: 0,
                pow: 0,
                pos: 5,
                masternode: 15
              }
            ]
          },
          height: 22000,
          nodes: 277,
          nodesChange: -22.3,
          algorithm: 'Neoscrypt',
          masternodePrice: {
            type: 'height',
            price: 2000,
            prices: [
              {
                first: 1,
                last: 10000,
                price: 1000
              },
              {
                first: 10001,
                last: 20000,
                price: 1500
              },
              {
                first: 20001,
                last: 30000,
                price: 2000,
                current: true
              },
              {
                first: 30001,
                last: 0,
                price: 3000
              }
            ]
          }
        }],
        fields: [
          {
            key: 'coin',
            label: 'Coin',
            sortable: true
          },
          {
            key: 'price',
            label: 'Price',
            thClass: 'text-center',
            sortable: true
          },
          {
            key: 'market',
            label: 'Marketcap',
            thClass: 'text-center',
            sortable: true
          },
          {
            key: 'roi',
            label: 'ROI',
            thClass: 'text-center',
            sortable: true
          },
          {
            key: 'blockReward',
            label: 'Block reward',
            thClass: 'text-center',
            sortable: true
          },
          {
            key: 'nodes',
            label: 'Nodes',
            thClass: 'text-center',
            sortable: true
          },
          {
            key: 'collateralPrice',
            label: 'Collateral Price',
            thClass: 'text-center',
            sortable: true
          },
          {
            key: 'exchanges',
            label: 'Exchanges',
            thClass: 'text-center',
            sortable: false
          }
        ],
        filter: null
      }
    },
    methods: {
      showSettings: function () {
        return false
      }
    },
    filters: {
      formatPercent: function (value) {
        if (!value) return ''
        if (typeof value !== 'number') {
          return value
        }
        return value.toFixed(2)
      },
      formatNumber: function (value) {
        if (!value) return ''
        if (typeof value !== 'number') {
          return value
        }
        const fixedPart = (value.toFixed(2) - value.toFixed(0)) === 0 ? 0 : 2
        let val = (value / 1).toFixed(fixedPart)
        if (fixedPart > 0) {
          val = val.replace('.', ',')
        }
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
      }
    }
  }
</script>

<style>

  .nowrap {
    white-space: nowrap !important;
  }

  .table td {
    vertical-align: middle !important;
  }

  .help {
    cursor: help;
  }
</style>
