<script setup lang="ts">
import { Download } from '@lucide/vue'
import QRCodeStyling from 'qr-code-styling'

const props = withDefaults(defineProps<{
  data: string
  image?: string
}>(), {
  image: '',
})

// Marea Baja, the Candy's Cats primary brand colour
const color = ref('#2E5464')

// Resolve image path safely
const logoUrl = computed(() => props.image && props.image.trim() !== '' ? props.image : '/logo-paw.png')

const options = {
  width: 300,
  height: 300,
  data: props.data,
  type: 'svg' as const,
  margin: 10,
  qrOptions: { typeNumber: 0 as const, mode: 'Byte' as const, errorCorrectionLevel: 'H' as const },
  imageOptions: { 
    hideBackgroundDots: true, 
    imageSize: 0.25, 
    margin: 5,
    crossOrigin: 'anonymous'
  },
  dotsOptions: { type: 'square' as const, color: color.value },
  backgroundOptions: { color: 'transparent' },
  image: logoUrl.value,
  cornersSquareOptions: { type: 'square' as const, color: color.value },
  cornersDotOptions: { type: 'square' as const, color: color.value },
}

const qrCode = new QRCodeStyling(options)
const qrCodeEl = useTemplateRef<HTMLElement>('qrCodeEl')

function updateColor(newColor: string) {
  qrCode.update({
    dotsOptions: { type: 'square' as const, color: newColor },
    cornersSquareOptions: { type: 'square' as const, color: newColor },
    cornersDotOptions: { type: 'square' as const, color: newColor },
  })
}

// Watch color changes
watch(color, (newColor) => {
  updateColor(newColor)
})

// Watch image prop changes dynamically
watch(logoUrl, (newLogo) => {
  qrCode.update({
    image: newLogo
  })
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
