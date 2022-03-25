<template>
  <VCard
    class="mx-auto"
    :to="link"
  >
    <div v-if="type" class="ml-4 pt-4">
      <PoolImage
        :short-name="type"
      />
    </div>

    <VCardTitle v-if="name" v-text="name" />

    <VCardSubtitle>
      <VTooltip bottom>
        <template #activator="{ on, attrs }">
          <span
            v-bind="attrs"
            v-on="on"
            v-text="`${hashRateRounded} TH/s`"
          />
        </template>
        <span v-text="$t('Avg10mHashRate')" />
      </VTooltip>
      <VSpacer />
      <VTooltip bottom>
        <template #activator="{ on, attrs }">
          <span
            v-bind="attrs"
            v-on="on"
            v-text="`${income24HoursRounded} ${poolTypeName}`"
          />
        </template>
        <span v-text="$t('Income24h')" />
      </VTooltip>
      <VSpacer />
      <PoolAccountsItemGraph />
    </VCardSubtitle>
  </VCard>
</template>

<script>
export default {
  name: 'PoolAccountsItem',
  props: {
    type: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    link: {
      type: String,
      default: null,
    },
    hashRate: {
      type: Number,
      default: null,
    },
    income24Hours: {
      type: Number,
      default: null,
    },
    offline: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    show: false,
  }),
  computed: {
    hashRateRounded() {
      return (this.hashRate || 0).toFixed(2);
    },
    income24HoursRounded() {
      return (this.income24Hours || 0).toFixed(6);
    },
    poolTypeName() {
      return this.type?.toUpperCase?.();
    },
  },
  methods: {
    // ...
  },
};
</script>
