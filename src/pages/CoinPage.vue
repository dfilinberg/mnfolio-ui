<template>
  <b-container>
    <b-row>
      <b-col md="12">
        <b-breadcrumb :items="breadcrumbs"/>
        <b-tabs>
          <b-tab title="Masternode stats" active>
            <b-row class="pt-4">
              <b-col md="3">
                <h1 class="mb-5">
                  <img :src="coin.logoUrl" width="45px" height="45px"> {{coin.name}} ({{coin.ticker}})
                </h1>
                <h3 class="mb-3">Links</h3>
                <ul class="list-unstyled">
                  <li v-if="coin.announcementUrl">
                    <a :href="coin.announcementUrl" rel="nofollow" target="_blank">Announcement</a>
                  </li>
                  <li v-if="coin.githubUrl">
                    <a :href="coin.githubUrl" rel="nofollow" target="_blank">Source Code</a>
                  </li>
                  <li v-if="coin.siteUrl">
                    <a :href="coin.siteUrl" rel="nofollow" target="_blank">Website</a>
                  </li>
                  <li v-if="coin.explorerUrl">
                    <a :href="coin.explorerUrl" rel="nofollow" target="_blank">Explorer</a>
                  </li>
                </ul>
                <h3 class="mb-3">Community</h3>
                <ul class="list-unstyled">
                  <li v-if="coin.discordUrl">
                    <a :href="coin.discordUrl" rel="nofollow" target="_blank">Discord</a>
                  </li>
                  <li v-if="coin.twitterUrl">
                    <a :href="coin.twitterUrl" rel="nofollow" target="_blank">Twitter</a>
                  </li>
                  <li v-if="coin.telegramUrl">
                    <a :href="coin.telegramUrl" rel="nofollow" target="_blank">Telegram</a>
                  </li>
                  <li v-if="coin.facebookUrl">
                    <a :href="coin.facebookUrl" rel="nofollow" target="_blank">Facebook</a>
                  </li>
                  <li v-if="coin.redditUrl">
                    <a :href="coin.redditUrl" rel="nofollow" target="_blank">Reddit</a>
                  </li>
                  <li v-if="coin.pinterestUrl">
                    <a :href="coin.pinterestUrl" rel="nofollow" target="_blank">Pinterest</a>
                  </li>
                  <li v-if="coin.instagramUrl">
                    <a :href="coin.instagramUrl" rel="nofollow" target="_blank">Instagram</a>
                  </li>
                  <li v-if="coin.forumUrl">
                    <a :href="coin.forumUrl" rel="nofollow" target="_blank">Forum</a>
                  </li>
                </ul>
                <h3 class="mb-3">Exchanges</h3>
                <ul class="list-unstyled mb-5">
                  <li v-for="exchange in coin.exchanges" v-bind:key="exchange.name">
                    <a v-bind:href="exchange.url" target="_blank">{{exchange.name}}</a>
                  </li>
                </ul>
                <a href="/" class="mt-5">Back to coin list</a>
              </b-col>
              <b-col md="9">
                <b-card-group deck class="mb-4">
                  <b-card border-variant="primary"
                          bg-variant="light"
                          header="Daily income"
                          header-bg-variant="primary"
                          header-text-variant="white"
                          class="text-center">
                    <p class="card-text m-0">${{coin.income.daily * coin.price.usd | formatUSD}}</p>
                    <p class="card-text m-0">{{coin.income.daily * coin.price.btc | formatBTC}} BTC</p>
                    <p class="card-text m-0"><strong class="text-primary">{{coin.income.daily | formatCoin}}
                      GIC</strong></p>
                  </b-card>
                  <b-card border-variant="warning"
                          bg-variant="light"
                          header="Weekly income"
                          header-bg-variant="warning"
                          header-text-variant="white"
                          class="text-center">
                    <p class="card-text m-0">${{coin.income.weekly * coin.price.usd | formatUSD}}</p>
                    <p class="card-text m-0">{{coin.income.weekly * coin.price.btc | formatBTC}} BTC</p>
                    <p class="card-text m-0"><strong class="text-warning">{{coin.income.weekly | formatCoin}}
                      GIC</strong></p>
                  </b-card>
                  <b-card border-variant="success"
                          bg-variant="light"
                          header="Monthly income"
                          header-bg-variant="success"
                          header-text-variant="white"
                          class="text-center">
                    <p class="card-text m-0">${{coin.income.monthly * coin.price.usd | formatUSD}}</p>
                    <p class="card-text m-0">{{coin.income.monthly * coin.price.btc | formatBTC}} BTC</p>
                    <p class="card-text m-0"><strong class="text-success">{{coin.income.monthly | formatCoin}}
                      GIC</strong></p>
                  </b-card>
                  <b-card border-variant="danger"
                          bg-variant="light"
                          header="Yearly income"
                          header-bg-variant="danger"
                          header-text-variant="white"
                          class="text-center">
                    <p class="card-text m-0">${{coin.income.yearly * coin.price.usd | formatUSD}}</p>
                    <p class="card-text m-0">{{coin.income.yearly * coin.price.btc | formatBTC}} BTC</p>
                    <p class="card-text m-0"><strong class="text-danger">{{coin.income.yearly | formatCoin}}
                      GIC</strong></p>
                  </b-card>
                </b-card-group>

                <b-card-group deck class="mt-4">
                  <b-card border-variant="default"
                          bg-variant="light"
                          :header="'ROI: ' + coin.roi.annual + '% / ' + coin.roi.days +  ' days'"
                          header-bg-variant="default"
                          header-text-variant="black"
                          class="text-center">
                    <roi-chart></roi-chart>
                  </b-card>
                  <b-card border-variant="default"
                          bg-variant="light"
                          :header="'Masternodes: ' + coin.roi.masternodes"
                          header-bg-variant="default"
                          header-text-variant="black"
                          class="text-center">
                  </b-card>
                </b-card-group>

                <b-card-group deck class="mt-4">
                  <b-card border-variant="default"
                          bg-variant="light"
                          header="Price, USD"
                          header-bg-variant="default"
                          header-text-variant="black"
                          class="text-center">
                  </b-card>
                  <b-card border-variant="default"
                          bg-variant="light"
                     ld     header="Price, BTC"
                          header-bg-variant="default"
                          header-text-variant="black"
                          class="text-center">
                  </b-card>
                </b-card-group>

                <b-card-group deck class="mt-4">
                  <b-card border-variant="default"
                          bg-variant="light"
                          header="Income"
                          header-bg-variant="default"
                          header-text-variant="black"
                          class="text-center">
                  </b-card>
                  <b-card border-variant="default"
                          bg-variant="light"
                          header="Supply/Locked"
                          header-bg-variant="default"
                          header-text-variant="black"
                          class="text-center">
                  </b-card>
                </b-card-group>
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="Masternode owners">
            <b-row>
              <b-col md="12">
                <br>Masternode owners
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="Masternode map">
            <b-row>
              <b-col md="12">
                <br>Masternode map
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="Masternode team">
            <b-row>
              <b-col md="12">
                <br>Masternode team
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="Tracking premine">
            <b-row>
              <b-col md="12">
                <br>Tracking premine
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="Specification">
            <b-row>
              <b-col md="12">
                <br>Coin specification
              </b-col>
            </b-row>
          </b-tab>
        </b-tabs>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import numeral from 'numeral'
  import RoiChart from '@/components/chart/Roi'

  export default {
    name: 'CoinPage',
    data () {
      return {
        breadcrumbs: [{
          text: 'Coins',
          href: '/'
        }, {
          text: 'Tune',
          active: true
        }],
        coin: {
          name: 'Tune',
          ticker: 'TUN',
          logoUrl: 'https://masternodes.online/coin_image/TUN.png?v=1',
          announcementUrl: '#',
          githubUrl: '#',
          siteUrl: '#',
          explorerUrl: '#',
          discordUrl: '#',
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
          income: {
            daily: 12.12323,
            weekly: 12.12323 * 7,
            monthly: 12.12323 * 30,
            yearly: 12.12323 * 365
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
            days: 3,
            masternodes: 114
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
        }
      }
    },
    components: {
      'roi-chart': RoiChart
    },
    filters: {
      formatUSD: function (value) {
        if (!value) return ''
        if (typeof value !== 'number') {
          return value
        }
        return numeral(value).format('0,0.0000')
      },
      formatBTC: function (value) {
        if (!value) return ''
        if (typeof value !== 'number') {
          return value
        }
        return numeral(value).format('0,0.00000000')
      },
      formatCoin: function (value) {
        if (!value) return ''
        if (typeof value !== 'number') {
          return value
        }
        return numeral(value).format('0,0.0000')
      }
    }
  }
</script>

<style scoped>

</style>
