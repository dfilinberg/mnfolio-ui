import {mapGetters} from 'vuex'

export default {
  name: 'BasePage',
  computed: mapGetters(['isAdmin', 'isAnonymous'])
}
