<template>
	<view class="mescroll-upwarp" :style="{'background-color':mOption.bgColor,'color':mOption.textColor}">
		<view v-show="isUpLoading">
			<view class="upwarp-progress mescroll-rotate" :style="{'border-color':mOption.textColor}"></view>
			<view class="upwarp-tip">{{ mOption.textLoading }}</view>
		</view>
		<view v-if="isUpNoMore" class="upwarp-nodata">{{ mOption.textNoMore }}</view>
	</view>
</template>

<script>
export default {
	props: {
		option: Object,
		type: Number
	},
	computed: {
		mOption() {
			return this.option || {};
		},
		isUpLoading() {
			return this.type === 1;
		},
		isUpNoMore() {
			return this.type === 2;
		}
	}
};
</script>

<style>
@import './mescroll-up.css';
</style>
