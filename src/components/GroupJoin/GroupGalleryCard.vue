<template>
  <div class="inline-block">
    <q-card
      class="groupPreviewCard"
      :color="cardColor"
      :class="{highlight: group.isCurrentGroup}"
      :style="cardStyle"
    >
      <q-card-title class="ellipsis">
        {{ group.name }}
        <span slot="subtitle">
          {{ group.members.length }} {{ $tc('JOINGROUP.NUM_MEMBERS', group.members.length) }}
        </span>
      </q-card-title>
      <q-card-main class="fixed-height">
        <div
          v-if="group.publicDescription"
          class="smaller-text"
        >
          <Markdown :source="group.publicDescription.slice(0, 150)" />
        </div>
        <span
          v-else
          class="text-italic"
        >
          {{ $t('JOINGROUP.NO_PUBLIC_DESCRIPTION') }}
        </span>
      </q-card-main>
      <q-card-separator />
      <q-card-actions>
        <q-btn
          v-if="group.isMember"
          @click="$emit('visit')"
          class="q-btn-flat"
        >
          <q-icon name="fa-home" />
          <q-tooltip>
            {{ $t('GROUPINFO.MEMBER_VIEW') }}
          </q-tooltip>
        </q-btn>
        <q-btn
          @click="$emit('preview', group)"
          class="q-btn-flat"
        >
          <q-icon name="fa-info-circle" />
          <q-tooltip>
            {{ $t('GROUPINFO.META') }}
          </q-tooltip>
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { QCard, QCardTitle, QCardMain, QCardSeparator, QCardActions, QBtn, QTooltip, QIcon } from 'quasar'
import Markdown from '@/components/Markdown'

export default {
  components: { Markdown, QCard, QCardTitle, QCardMain, QCardSeparator, QCardActions, QBtn, QTooltip, QIcon },
  props: {
    group: {
      type: Object,
      default: () => ({
        members: [],
      }),
    },
  },
  computed: {
    cardColor () {
      return this.group.isPlayground ? 'secondary' : undefined
    },
    cardStyle () {
      const reduceOpacity = this.group.isInactive && !this.group.isMember
      if (reduceOpacity) {
        return { opacity: 0.5 }
      }
    },
  },
}
</script>

<style scoped lang="stylus">
@import '~variables'
.highlight
  border 2px solid $positive
.q-card *
  overflow: hidden
.fixed-height
  min-height: 60px
  max-height: 60px
.groupPreviewCard
  transition all .5s
.groupPreviewCard
  box-shadow: 0 2px 6px 0 rgba(0,0,0,0.2);
.groupPreviewCard:hover
  box-shadow: 0 7px 11px 0 rgba(0,0,0,0.2);
</style>

<style lang="stylus">
.groupPreviewCard .smaller-text > * > *
  font-size 1em
</style>
