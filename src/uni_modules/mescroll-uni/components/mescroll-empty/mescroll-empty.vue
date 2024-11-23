<template>
	<view class="mescroll-empty" :class="{ 'empty-fixed': option.fixed }" :style="{ 'z-index': option.zIndex, top: option.top }">
		<view> <image v-if="icon" class="empty-icon" :src="icon" mode="widthFix" /> </view>
		<view v-if="tip" class="empty-tip">{{ tip }}</view>
		<view v-if="btnText" class="empty-btn" @click="emptyClick">{{ btnText }}</view>
	</view>
</template>

<script>
import GlobalOption from '../mescroll-uni/mescroll-uni-option.js';
import mescrollI18n from '../mescroll-uni/mescroll-i18n.js';
export default {
	props: {
		option: {
			type: Object,
			default() {
				return {};
			}
		}
	},
	computed: {
		icon() {
			if (this.option.icon != null) {
				return this.option.icon
			} else{
				let i18nType = mescrollI18n.getType()
				if (this.option.i18n) {
					return this.option.i18n[i18nType].icon
				} else{
					return GlobalOption.i18n[i18nType].up.empty.icon || GlobalOption.up.empty.icon
				}
			}
		},
		tip() {
			if (this.option.tip != null) {
				return this.option.tip
			} else{
				let i18nType = mescrollI18n.getType()
				if (this.option.i18n) {
					return this.option.i18n[i18nType].tip
				} else{
					return GlobalOption.i18n[i18nType].up.empty.tip || GlobalOption.up.empty.tip
				}
			}
		},
		btnText() {
			if (this.option.i18n) {
				let i18nType = mescrollI18n.getType()
				return this.option.i18n[i18nType].btnText
			} else{
				return this.option.btnText
			}
		}
	},
	methods: {
		emptyClick() {
			this.$emit('emptyclick');
		}
	}
};
</script>

<style>
.mescroll-empty {
	box-sizing: border-box;
	width: 100%;
	padding: 100rpx 50rpx;
	text-align: center;
}

.mescroll-empty.empty-fixed {
	z-index: 99;
	position: absolute;
	top: 100rpx;
	left: 0;
}

.mescroll-empty .empty-icon {
	width: 300rpx;
}

.mescroll-empty .empty-tip {
	margin-top: 20rpx;
	font-size: 26rpx;
	color: gray;
}

.mescroll-empty .empty-btn {
	display: inline-block;
	margin-top: 40rpx;
	min-width: 200rpx;
	padding: 18rpx;
	font-size: 28rpx;
	border: 1rpx solid #e04b28;
	border-radius: 60rpx;
	color: #e04b28;
}

.mescroll-empty .empty-btn:active {
	opacity: 0.75;
}
</style>
