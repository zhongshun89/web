<template>
  <v-container class="pa-0" fluid>
    <v-data-table
      :headers="headers"
      :items="users"
      :options.sync="pagination"
      :server-items-length="count"
      :loading="loading"
      loading-text="加载中,请稍后..."
      :footer-props="{'items-per-page-options': [10, 15, 20, -1]}"
      multi-sort
      must-sort
      class="elevation-1 c-table"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-spacer />
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark v-on="on">
                <v-icon dark>
                  mdi-plus
                </v-icon>
              </v-btn>
            </template>
            <v-card>
              <ValidationObserver ref="observer" v-slot="{ invalid, passes }">
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <form class="px-1 page__form__input" @submit.prevent="passes(save)">
                      <v-row>
                        <v-col cols="6">
                          <ValidationProvider v-slot="{ errors }" name="用户名" rules="required|max:10">
                            <v-text-field
                              v-model="actionItem.username"
                              prepend-icon="mdi-account"
                              label="用户名"
                            />
                            <p class="error--text caption mb-0 text-right">
                              {{ errors[0] }}
                            </p>
                          </ValidationProvider>
                        </v-col>
                        <v-col v-if="!isEdit" cols="6">
                          <v-file-input
                            v-model="actionItem.avatar"
                            show-size
                            accept="image/*"
                            :rules="avatarRules"
                            label="头像"
                          />
                        </v-col>
                        <v-col cols="6">
                          <ValidationProvider v-slot="{ errors }" name="电话" rules="required|digits:11">
                            <v-text-field
                              v-model="actionItem.phone"
                              prepend-icon="mdi-phone"
                              label="电话"
                            />
                            <p class="error--text caption mb-0 text-right">
                              {{ errors[0] }}
                            </p>
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="6">
                          <ValidationProvider v-slot="{ errors }" name="邮箱" rules="required|email">
                            <v-text-field
                              v-model="actionItem.email"
                              prepend-icon="mdi-email"
                              label="邮箱"
                            />
                            <p class="error--text caption mb-0 text-right">
                              {{ errors[0] }}
                            </p>
                          </ValidationProvider>
                        </v-col>
                        <v-col v-if="!isEdit" cols="6">
                          <ValidationProvider v-slot="{ errors }" name="密码" rules="required|min:6">
                            <v-text-field
                              v-model="actionItem.password"
                              prepend-icon="mdi-lock-question"
                              label="密码"
                              :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                              :type="showPassword ? 'text' : 'password'"
                              @click:append="showPassword = !showPassword"
                            />
                            <p class="error--text caption mb-0 text-right">
                              {{ errors[0] }}
                            </p>
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="6">
                          <v-switch v-model="actionItem.is_active" label="激活" />
                        </v-col>
                      </v-row>
                    </form>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn @click.prevent="close">
                    取消
                  </v-btn>
                  <v-btn
                    :disabled="invalid"
                    @click.prevent="passes(save)"
                  >
                    保存
                  </v-btn>
                </v-card-actions>
              </ValidationObserver>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.avatar="{ item }">
        <v-avatar>
          <img :src="item.avatar">
        </v-avatar>
      </template>
      <template v-slot:item.create_at="{ item }">
        {{ $moment(item.create_at, $moment.ISO_8601).format('MMM Do a h:mm') }}
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:nodata>
        <v-container>
          <p class="text-center mb-0">
            没有数据
          </p>
        </v-container>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import objectToFormData from 'object-to-formdata'
import sleep from 'sleep-promise'
import cloneDeep from 'lodash.clonedeep'
import { mapState, mapMutations, mapActions } from 'vuex'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { required, max, min, digits, email, length } from 'vee-validate/dist/rules'
import zh from 'vee-validate/dist/locale/zh_CN'
import { DEFAULT_PASSWORD } from '~/public/constants'

const moduleName = 'users'

const PAGINATION = {
  page: 1,
  itemsPerPage: 4,
  sortBy: ['create_at'],
  sortDesc: [true]
}

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      dialog: false,
      showPassword: true,
      editedIndex: -1,
      headers: [
        { value: 'avatar', text: '头像', sortable: false, align: 'center' },
        { value: 'username', text: '用户名', sortable: false, align: 'center' },
        { value: 'create_at', text: '创建时间', align: 'center' },
        { value: 'phone', text: '电话', sortable: false, align: 'center' },
        { value: 'email', text: '邮箱', sortable: false, align: 'center' },
        { value: 'action', text: '操作', sortable: false, align: 'center' }
      ],
      pagination: cloneDeep(PAGINATION),
      editedItem: {
        id: '',
        username: '',
        phone: '',
        email: '',
        is_active: true
      },
      defaultItem: {
        username: '',
        avatar: null,
        phone: '',
        email: '',
        password: DEFAULT_PASSWORD,
        is_active: true
      }
    }
  },
  computed: {
    ...mapState([
      'search'
    ]),
    ...mapState(moduleName, [
      'loading',
      'users',
      'count'
    ]),
    avatarRules () {
      return [ value => !value || value.size < 2000000 || '头像不能大于2M!' ]
    },
    isEdit () {
      return this.editedIndex !== -1
    },
    actionItem () {
      return this.isEdit ? this.editedItem : this.defaultItem
    },
    formTitle () {
      return this.isEdit ? '编辑用户' : '创建用户'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    search (val) {
      this.pagination = cloneDeep(PAGINATION)
    },
    pagination: {
      handler () {
        this.setPagination(this.pagination)
        this.fetch()
      },
      deep: true
    }
  },
  created () {
    extend('required', {
      ...required,
      message: zh.messages.required
    })
    extend('max', {
      ...max,
      message: zh.messages.max
    })
    extend('min', {
      ...min,
      message: zh.messages.min
    })
    extend('digits', {
      ...digits,
      message: zh.messages.digits
    })
    extend('length', {
      ...length,
      message: zh.messages.length
    })
    extend('email', {
      ...email,
      message: zh.messages.email
    })
  },
  methods: {
    ...mapMutations(moduleName, [
      'setPagination'
    ]),
    ...mapActions(moduleName, [
      'fetch',
      'create',
      'update',
      'remove'
    ]),
    editItem (item) {
      this.editedIndex = this.users.indexOf(item)
      this.editedItem.id = item.id
      this.editedItem.username = item.username
      this.editedItem.phone = item.phone
      this.editedItem.email = item.email
      this.editedItem.is_active = item.is_active
      this.dialog = true
    },
    deleteItem (item) {
      this.$confirm(
        `确定要删除用户${item.username}吗？`,
        {
          buttonTrueText: '确定',
          buttonFalseText: '取消'
        }).then((res) => {
        if (res) {
          this.remove(item)
        }
      })
    },
    resetDefaultItem () {
      this.defaultItem = {
        username: '',
        avatar: null,
        phone: '',
        email: '',
        password: DEFAULT_PASSWORD,
        is_active: true
      }
    },
    async close () {
      this.dialog = false
      await sleep(300)
      this.editedIndex = -1
      this.resetDefaultItem()
      this.$refs.observer.reset()
    },
    async save () {
      if (this.isEdit) {
        await this.update(this.actionItem)
      } else {
        const data = objectToFormData(this.actionItem, { nullsAsUndefineds: true })
        await this.create(data)
      }
      this.close()
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
