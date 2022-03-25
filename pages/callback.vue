<template>
  <VContainer fluid fill-height>
    <VLayout class="align-center justify-center">
      <div class="text-center">
        <VProgressCircular
          :size="170"
          :width="10"
          color="green"
          indeterminate
        />
      </div>
    </VLayout>
  </VContainer>
</template>

<script>
export default {
  name: 'CallbackPage',
  layout: 'empty',
};
</script>
