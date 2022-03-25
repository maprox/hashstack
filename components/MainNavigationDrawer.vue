<template>
  <VNavigationDrawer
    v-if="$auth.loggedIn"
    v-model="local.drawer"
    :value="false"
    :clipped="clipped"
    :fixed="fixed"
    app
    temporary
  >
    <template #prepend>
      <VListItem two-line>
        <VListItemAvatar color="indigo">
          <VIcon dark>
            mdi-account-circle
          </VIcon>
        </VListItemAvatar>
        <VListItemContent>
          <VListItemTitle v-text="$auth.user.name" />
          <VListItemSubtitle v-text="'Logged In'" />
        </VListItemContent>
      </VListItem>
    </template>
    <VDivider />
    <VList>
      <VListItem to="/home" router exact>
        <VListItemAction>
          <VIcon>mdi-home</VIcon>
        </VListItemAction>
        <VListItemContent>
          <VListItemTitle v-text="$t('Home')" />
        </VListItemContent>
      </VListItem>
      <VListItem to="/pools" router exact>
        <VListItemAction>
          <VIcon>mdi-pickaxe</VIcon>
        </VListItemAction>
        <VListItemContent>
          <VListItemTitle v-text="$t('PoolAccounts')" />
        </VListItemContent>
      </VListItem>
    </VList>
    <template #append>
      <div class="pa-2">
        <VBtn block @click="$auth.logout()">
          Logout
        </VBtn>
      </div>
    </template>
  </VNavigationDrawer>
</template>

<script>
export default {
  name: 'MainNavigationDrawer',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    clipped: {
      type: Boolean,
      default: false,
    },
    fixed: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      local: {
        drawer: this.value,
      },
      poolAccounts: [
        ['Create', 'mdi-plus-outline'],
        ['Read', 'mdi-file-outline'],
      ],
    };
  },
  computed: {
    localDrawer() {
      return this.local.drawer;
    },
  },
  watch: {
    value(value) {
      this.local.drawer = value;
    },
    localDrawer(value) {
      this.$emit('input', value);
    },
  },
};
</script>
