<template>
	<image
		v-if="option.src"
		class="mescroll-totop"
		:class="[isShow ? 'mescroll-totop-in' : 'mescroll-totop-out', {'mescroll-totop-safearea': option.safearea}]"
		:style="{'z-index':option.zIndex, 'left': left, 'right': right, 'bottom':addUnit(option.bottom), 'width':addUnit(option.width), 'border-radius':addUnit(option.radius)}"
		:src="option.src"
		mode="widthFix"
		@click="toTopClick"
	/>
</template>

<script>
export default {
	props: {
		option: {
			type: Object,
			default(){
				return {}
			}
		},
		value: false, // vue2
		modelValue: false // vue3
	},
	computed: {
		left(){
			return this.option.left ? this.addUnit(this.option.left) : 'auto';
		},
		right() {
			return this.option.left ? 'auto' : this.addUnit(this.option.right);
		},
		isShow(){
			// #ifdef VUE3
			return this.modelValue
			// #endif
			// #ifdef VUE2
			return this.value
			// #endif
		}
	},
	methods: {
		addUnit(num){
			if(!num) return 0;
			if(typeof num === 'number') return num + 'rpx';
			return num
		},
		toTopClick() {
			// #ifdef VUE3
			this.$emit("update:modelValue", false);
			// #endif
			// #ifdef VUE2
			this.$emit('input', false);
			// #endif
			this.$emit('click');
		}
	}
};
</script>

<style>
.mescroll-totop {
	z-index: 9990;
	position: fixed !important;
	right: 20rpx;
	bottom: 120rpx;
	width: 72rpx;
	height: auto;
	border-radius: 50%;
	opacity: 0;
	transition: opacity 0.5s;
	margin-bottom: var(--window-bottom);
}

@supports (bottom: constant(safe-area-inset-bottom)) or (bottom: env(safe-area-inset-bottom)) {
	.mescroll-totop-safearea {
		margin-bottom: calc(var(--window-bottom) + constant(safe-area-inset-bottom));
		margin-bottom: calc(var(--window-bottom) + env(safe-area-inset-bottom));
	}
}

.mescroll-totop-in {
	opacity: 1;
}

.mescroll-totop-out {
	opacity: 0;
	pointer-events: none;
}
</style>
