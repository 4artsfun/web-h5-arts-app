<template>
	<view v-if="mOption.use" class="mescroll-downwarp" :style="{'background-color':mOption.bgColor,'color':mOption.textColor}">
		<view class="downwarp-content">
			<view class="downwarp-progress" :class="{'mescroll-rotate': isDownLoading}" :style="{'border-color':mOption.textColor, 'transform':downRotate}"></view>
			<view class="downwarp-tip">{{downText}}</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		option: Object ,
		type: Number,
		rate: Number
	},
	computed: {
		mOption(){
			return this.option || {}
		},
		isDownLoading(){
			return this.type === 3
		},
		downRotate(){
			return 'rotate(' + 360 * this.rate + 'deg)'
		},
		downText(){
			switch (this.type){
				case 1: return this.mOption.textInOffset;
				case 2: return this.mOption.textOutOffset;
				case 3: return this.mOption.textLoading;
				case 4: return this.mOption.textLoading;
				default: return this.mOption.textInOffset;
			}
		}
	}
};
</script>

<style>
@import "./mescroll-down.css";
</style>
