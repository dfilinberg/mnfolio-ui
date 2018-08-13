<template>
  <b-container>
    <b-row>
      <b-col md="12">
        <b-breadcrumb :items="breadcrumbs"/>
        <b-form @submit="onSubmit">
          <b-row>
            <b-col cols="5">
              <fieldset>
                <legend>Общие</legend>
                <b-form-group
                  id="nameLabel"
                  label="Название монеты:"
                  label-for="name">
                  <b-form-input
                    id="name"
                    v-model="coin.name"
                    size="sm"
                    required
                    placeholder="Название монеты">
                  </b-form-input>
                </b-form-group>
                <b-form-group
                  id="tickerLabel"
                  label="Тикер монеты:"
                  label-for="ticker">
                  <b-form-input
                    id="name"
                    v-model="coin.ticker"
                    size="sm"
                    required
                    placeholder="Тикер монеты">
                  </b-form-input>
                </b-form-group>
                <b-form-group
                  id="typeLabel"
                  label="Тип монеты:"
                  label-for="type">
                  <b-form-select
                    id="type"
                    size="sm"
                    v-model="coin.type"
                    :options="types"
                    required/>
                </b-form-group>
                <b-form-group
                  v-if="coin.type === 'POW' || coin.type === 'POW_POS'"
                  id="algorithmLabel"
                  label="Алгоритм:"
                  label-for="algorithm">
                  <b-form-select
                    id="algorithm"
                    size="sm"
                    v-model="coin.algorithm"
                    :options="algorithms"
                    required/>
                </b-form-group>
                <b-form-group
                  id="blockTimeLabel"
                  label="Время блока:"
                  label-for="blockTime"
                  description="Расчетное время блока в секундах">
                  <b-form-input
                    id="blockTime"
                    size="sm"
                    type="number"
                    v-model="coin.blockTime"
                    min="1"
                    max="10000"
                    step="1"
                    required>
                  </b-form-input>
                </b-form-group>
              </fieldset>
              <fieldset>
                <legend>Мастерноды</legend>
                <masternode-price :coin="coin"></masternode-price>
              </fieldset>
              <fieldset>
                <legend>Вознаграждение за блок</legend>
                <block-reward :coin="coin" :reward="coin.reward"></block-reward>
              </fieldset>
            </b-col>
            <b-col cols="7">
              <fieldset>
                <legend>Ссылки:</legend>
                <b-form-group
                  id="siteUrlLabel"
                  label="Сайт:"
                  label-for="siteUrl">
                  <b-form-input
                    id="siteUrl"
                    size="sm"
                    v-model="coin.siteUrl"
                    placeholder="https://...">
                  </b-form-input>
                </b-form-group>
                <b-form-group
                  id="githubUrlLabel"
                  label="Github репозиторий:"
                  label-for="githubUrl">
                  <b-form-input
                    id="githubUrl"
                    size="sm"
                    v-model="coin.githubUrl"
                    placeholder="https://github.com/...">
                  </b-form-input>
                </b-form-group>
                <b-form-group
                  id="annUrlLabel"
                  label="Анонс:"
                  label-for="annUrl">
                  <b-form-input
                    id="annUrl"
                    size="sm"
                    v-model="coin.annUrl"
                    placeholder="https://bitcointalk.org/index.php?topic=...">
                  </b-form-input>
                </b-form-group>
                <b-form-group
                  id="twitterUrlLabel"
                  label="Twitter:"
                  label-for="twitterUrl">
                  <b-form-input
                    id="twitterUrl"
                    size="sm"
                    v-model="coin.twitterUrl"
                    placeholder="https://twitter.com/...">
                  </b-form-input>
                </b-form-group>
                <b-form-group
                  id="telegramUrlLabel"
                  label="Telegram:"
                  label-for="telegramUrl">
                  <b-form-input
                    id="telegramUrl"
                    size="sm"
                    v-model="coin.telegramUrl"
                    placeholder="https://t.me/...">
                  </b-form-input>
                </b-form-group>
                <b-form-group
                  id="facebookUrlLabel"
                  label="Facebook:"
                  label-for="facebookUrl">
                  <b-form-input
                    id="facebookUrl"
                    size="sm"
                    v-model="coin.facebookUrl"
                    placeholder="https://www.facebook.com/...">
                  </b-form-input>
                </b-form-group>
                <b-form-group
                  id="discordUrlLabel"
                  label="Discord:"
                  label-for="discordUrl">
                  <b-form-input
                    id="discordUrl"
                    size="sm"
                    v-model="coin.discordUrl"
                    placeholder="https://discord.gg/...">
                  </b-form-input>
                </b-form-group>
                <b-form-group
                  id="slackUrlLabel"
                  label="Slack:"
                  label-for="slackUrl">
                  <b-form-input
                    id="slackUrl"
                    size="sm"
                    v-model="coin.slackUrl"
                    placeholder="https://slack.com/join/shared_invite/...">
                  </b-form-input>
                </b-form-group>
                <b-form-group
                  id="explorerUrlLabel"
                  label="Explorer:"
                  label-for="explorerUrl">
                  <b-form-input
                    id="explorerUrl"
                    size="sm"
                    v-model="coin.explorerUrl"
                    placeholder="https://...">
                  </b-form-input>
                </b-form-group>
              </fieldset>
              <fieldset>
                <legend>API:</legend>
                <b-form-group
                  id="difficultUrlLabel"
                  label="API difficultUrl:"
                  label-for="difficultUrl">
                  <b-form-input
                    id="difficultUrl"
                    size="sm"
                    v-model="coin.difficultUrl"
                    placeholder="http(s)://.../api/getdifficulty">
                  </b-form-input>
                </b-form-group>
                <b-form-group
                  id="hashRateUrlLabel"
                  label="API hashRateUrl:"
                  label-for="hashRateUrl">
                  <b-form-input
                    id="hashRateUrl"
                    size="sm"
                    v-model="coin.hashRateUrl"
                    placeholder="http(s)://.../api/getnetworkhashps">
                  </b-form-input>
                </b-form-group>
                <b-form-group
                  id="hashRateUnitLabel"
                  label="API hashRateUnit:"
                  label-for="hashRateUnit"
                  description="Указывается если хешрейт сети берется из ext метода эксплорера">
                  <b-form-input
                    id="hashRateUnit"
                    size="sm"
                    v-model="coin.hashRateUnit"
                    type="number"
                    placeholder="0">
                  </b-form-input>
                </b-form-group>
                <b-form-group
                  id="heightUrlLabel"
                  label="API heightUrl:"
                  label-for="heightUrl">
                  <b-form-input
                    id="heightUrl"
                    size="sm"
                    v-model="coin.heightUrl"
                    placeholder="http(s)://.../api/getblockcount">
                  </b-form-input>
                </b-form-group>
              </fieldset>
              <fieldset>
                <legend>RPC:</legend>
                <b-form-group
                  id="rpcHostLabel"
                  label="RPC Host:"
                  label-for="rpcHost">
                  <b-form-input
                    id="rpcHost"
                    size="sm"
                    v-model="coin.rpcHost"
                    placeholder="127.0.0.1">
                  </b-form-input>
                </b-form-group>
                <b-form-group
                  id="rpcPortLabel"
                  label="RPC Port:"
                  label-for="rpcPort">
                  <b-form-input
                    id="rpcPort"
                    size="sm"
                    type="number"
                    min="1001"
                    max="65535"
                    step="1"
                    v-model="coin.rpcPort"
                    placeholder="19000">
                  </b-form-input>
                </b-form-group>
                <b-form-group
                  id="rpcUserLabel"
                  label="RPC User:"
                  label-for="rpcUser">
                  <b-form-input
                    id="rpcUser"
                    size="sm"
                    v-model="coin.rpcUser">
                  </b-form-input>
                </b-form-group>
                <b-form-group
                  id="rpcPasswordLabel"
                  label="RPC Password:"
                  label-for="rpcPassword">
                  <b-form-input
                    id="rpcPassword"
                    size="sm"
                    v-model="coin.rpcPassword">
                  </b-form-input>
                </b-form-group>
              </fieldset>
            </b-col>
            <b-col cols="12">
              <b-button type="submit" variant="primary">Сохранить</b-button>
            </b-col>
          </b-row>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import BasePage from '@/pages/BasePage'
  import CoinDao from '@/api/CoinDao'
  import MasternodePrice from '@/components/MasternodePrice'
  import BlockReward from '@/components/BlockReward'

  export default {
    name: 'CoinEditPage',
    mixins: [BasePage],
    created () {
      this.fetchData()
    },
    components: {
      'masternode-price': MasternodePrice,
      'block-reward': BlockReward
    },
    data () {
      return {
        coin: {
          name: '',
          ticker: '',
          algorithm: 'Scrypt',
          type: 'POW',
          blockTime: 120,
          masternode: false,
          masternodePrice: {
            type: 'fixed',
            price: 1000,
            blocks: []
          },
          logoUrl: '',

          siteUrl: '',
          annUrl: '',
          githubUrl: '',
          discordUrl: '',
          twitterUrl: '',
          telegramUrl: '',
          facebookUrl: '',
          slackUrl: '',

          explorerUrl: '',
          difficultUrl: '',
          hashRateUrl: '',

          markets: [],

          reward: {
            type: 'fixed',
            pow: 0,
            pos: 0,
            masternode: 0,
            blocks: []
          }
        },
        breadcrumbs: [
          {
            text: 'Монеты',
            to: '/'
          },
          {
            text: 'Новая монета',
            active: true
          }
        ],
        algorithms: [],
        types: []
      }
    },
    methods: {
      fetchData () {
        const self = this
        this.algorithms = CoinDao.getAlgorithms()
        this.types = CoinDao.getTypes()
        if (this.$route.params.ticker) {
          return CoinDao.findByTicker(this.$route.params.ticker).then(response => {
            self.coin = response.body
            self.breadcrumbs.push({
              text: self.coin.name,
              active: true
            })
          })
        }
      },
      onSubmit (e) {
        e.preventDefault()

        const $coin = {
          name: this.coin.name,
          ticker: this.coin.ticker,
          siteUrl: this.coin.siteUrl,
          annUrl: this.coin.annUrl,
          githubUrl: this.coin.githubUrl,
          discordUrl: this.coin.discordUrl,
          slackUrl: this.coin.slackUrl,
          twitterUrl: this.coin.twitterUrl,
          telegramUrl: this.coin.telegramUrl,
          facebookUrl: this.coin.facebookUrl,
          explorerUrl: this.coin.explorerUrl,
          algorithm: this.coin.algorithm,
          consensus: this.coin.consensus,
          heightUrl: this.coin.heightUrl,
          difficultUrl: this.coin.difficultUrl,
          hashRateUrl: this.coin.hashRateUrl,
          hashRateUnit: this.coin.hashRateUnit,
          blockTime: this.coin.blockTime,
          masternode: this.coin.masternode,
          rpcHost: this.coin.rpcHost,
          rpcPort: this.coin.rpcPort,
          rpcUser: this.coin.rpcUser,
          rpcPassword: this.coin.rpcPassword
        }

        if (this.coin.reward.type === 'fixed') {
          $coin.reward = {
            type: 'fixed',
            pow: this.coin.reward.pow,
            pos: this.coin.reward.pos,
            masternode: this.coin.reward.masternode
          }
        } else if (this.coin.reward.type === 'difficulty') {
          $coin.reward = {
            type: 'difficulty',
            expression: this.coin.reward.expression
          }
        } else {
          $coin.reward = {
            type: 'height',
            blocks: this.coin.reward.blocks.map(function (block) {
              const $block = {
                first: block.first,
                last: block.last,
                pow: block.pow,
                pos: block.pos,
                masternode: block.masternode
              }
              if (!block.id.startsWith('_')) {
                $block.id = block.id
              }
            })
          }
        }

        if ($coin.masternode) {
          if (this.coin.masternodePrice.type === 'fixed') {
            $coin.masternodePrice = {
              type: 'fixed',
              price: this.coin.masternodePrice.price
            }
          } else {
            $coin.masternodePrice = {
              type: 'height',
              blocks: this.coin.masternodePrice.blocks.map(function (block) {
                const $block = {
                  first: block.first,
                  last: block.last,
                  price: block.price
                }
                if (!block.id.startsWith('_')) {
                  $block.id = block.id
                }
                return $block
              })
            }
          }
        }

        const self = this
        this.$http.post('/api/coins', $coin, {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }).then(response => {
          self.$notify({
            group: 'saveCoin',
            type: 'success',
            title: 'Сохранение успешно',
            text: 'Добавлена монета ' + $coin.name
          })
          self.$router.push('/coins/' + $coin.ticker.toLowerCase())
        }, response => {
          self.$notify({
            group: 'saveCoin',
            type: 'danger',
            title: 'Ошибка при сохранении',
            text: 'Ошибка: ' + response.body
          })
        })
      }
    }
  }
</script>

<style scoped>
  fieldset {
    border: solid 1px #aaa !important;
    padding: 10px 20px 10px 20px;
    border-bottom: none;
    border-radius: 6px;
    margin-bottom: 20px;
  }

  legend {
    width: auto !important;
    border: none;
    font-size: 14px;
  }
</style>
