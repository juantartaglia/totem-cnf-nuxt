<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
    
    >
    <WizardAppoinment></WizardAppoinment>
    </v-flex>
  </v-layout>
</template>

<script>
import WizardAppoinment from '~/components/WizardAppoinment.vue'
import News from '~/components/News.vue'

export default {
  components: {
    WizardAppoinment, News
  }
}
</script>
