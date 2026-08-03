<script setup lang="ts">
import { Download } from '@lucide/vue'
import QRCodeStyling from 'qr-code-styling'

const props = withDefaults(defineProps<{
  data: string
  image?: string
}>(), {
  image: '',
})
const color = ref('#274C59')
const options = {
  width: 300,
  height: 300,
  data: props.data,
  type: 'canvas' as const,
  margin: 10,
  qrOptions: { typeNumber: 0 as const, mode: 'Byte' as const, errorCorrectionLevel: 'H' as const },
  imageOptions: { hideBackgroundDots: true, imageSize: 0.25, margin: 5 },
  dotsOptions: { type: 'square' as const, color: '#274C59' },
  backgroundOptions: { color: 'transparent' },
  image: props.image || 'data:image/png;base64,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',
  cornersSquareOptions: { type: 'square' as const, color: '#274C59' },
  cornersDotOptions: { type: 'square' as const, color: '#274C59' },
}

const qrCode = new QRCodeStyling(options)
const qrCodeEl = useTemplateRef<HTMLElement>('qrCodeEl')

function updateColor(newColor: string) {
  qrCode.update({
    dotsOptions: { type: 'dots' as const, color: newColor },
    cornersSquareOptions: { type: 'extra-rounded' as const, color: newColor },
    cornersDotOptions: { type: 'dot' as const, color: newColor },
  })
}

watch(color, (newColor) => {
  updateColor(newColor)
})

function downloadQRCode() {
  const slug = props.data.split('/').pop()
  qrCode.download({
    extension: 'png',
    name: `qr_${slug}`,
  })
}

onMounted(() => {
  if (qrCodeEl.value) {
    qrCode.append(qrCodeEl.value as unknown as HTMLElement)
  }
})
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <div
      ref="qrCodeEl"
      :data-text="data"
      role="img"
      :aria-label="$t('links.qr.text_alternative', { url: data })"
      class="rounded-lg border border-border bg-white p-1 shadow-sm"
    />
    <div class="flex items-center gap-4">
      <div class="relative flex items-center">
        <label
          class="
            relative size-11 cursor-pointer overflow-hidden rounded-full border
            border-input ring-offset-background
            focus-within:ring-3 focus-within:ring-ring/50
            lg:size-9
          "
          :style="{ backgroundColor: color }"
          :title="$t('links.change_qr_color')"
        >
          <input
            v-model="color"
            type="color"
            class="absolute inset-0 size-full cursor-pointer opacity-0"
            :aria-label="$t('links.change_qr_color')"
            :title="$t('links.change_qr_color')"
          >
        </label>
      </div>
      <Button
        variant="outline"
        size="sm"
        class="
          min-h-11
          lg:min-h-8
        "
        @click="downloadQRCode"
      >
        <Download aria-hidden="true" class="mr-2 size-4" />
        {{ $t('links.download_qr_code') }}
      </Button>
    </div>
  </div>
</template>
