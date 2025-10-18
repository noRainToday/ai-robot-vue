<script setup lang="ts">
defineOptions({ name: 'ResizeDivider' })

interface Props {
    direction: 'horizontal' | 'vertical';
    valIsNagetive?: boolean;
    size: number;
    maxSize: number;
    minSize: number;
}

const emit = defineEmits(['update:size'])
const props = defineProps<Props>()

const isDragging = ref(false)
const size = ref(props.size)
let startSize = 0
let startPoint = { x: 0, y: 0 }

function handleMouseDown(e: MouseEvent) {
    isDragging.value = true

    // 记录起始点和初始尺寸
    startPoint = { x: e.clientX, y: e.clientY }
    startSize = props.size
    console.log('startPoint', startPoint)

    // 设置全局鼠标样式
    document.body.style.cursor =
        props.direction === 'vertical' ? 'ew-resize' : 'ns-resize'

    // 添加事件监听
    document.addEventListener('mousemove', onDragging)
    document.addEventListener('mouseup', stopDrag)
}

function onDragging(e: MouseEvent) {
    if (!isDragging.value) return

    const diffX = e.clientX - startPoint.x
    const diffY = e.clientY - startPoint.y
    console.log('diffY', diffY)

    if (props.direction === 'horizontal') {
        // 🧩 支持从上往下（正）或从下往上（负）拉伸
        const delta = props.valIsNagetive ? -diffY : diffY
        console.log('delta', delta,props.valIsNagetive)
        size.value = Math.max(props.minSize, Math.min(props.maxSize, startSize + delta))
    } else {
        const delta = props.valIsNagetive ? -diffX : diffX
        size.value = Math.max(props.minSize, Math.min(props.maxSize, startSize + delta))
    }

    emit('update:size', size.value)
}

function stopDrag() {
    isDragging.value = false
    document.body.style.cursor = 'default'
    document.removeEventListener('mousemove', onDragging)
    document.removeEventListener('mouseup', stopDrag)
}

onBeforeUnmount(() => {
    document.removeEventListener('mousemove', onDragging)
    document.removeEventListener('mouseup', stopDrag)
})
</script>

<template>
    <div class="bg-transparent z-[999] position-absolute" :class="direction" @mousedown="handleMouseDown" @click.stop>
    </div>
</template>

<style scoped>
.vertical {
    min-width: 5px;
    height: 100%;
    cursor: ew-resize;
}

.horizontal {
    width: 100%;
    min-height: 5px;
    cursor: ns-resize;
}
</style>
