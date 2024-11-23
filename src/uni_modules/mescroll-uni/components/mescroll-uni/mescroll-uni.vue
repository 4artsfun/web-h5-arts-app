<template>
	<view class="mescroll-uni-warp">
		<scroll-view :id="viewId" class="mescroll-uni" :class="{'mescroll-uni-fixed':isFixed}" :style="{'height':scrollHeight,'padding-top':padTop,'padding-bottom':padBottom,'top':fixedTop,'bottom':fixedBottom}" :scroll-top="scrollTop" :scroll-with-animation="scrollAnim" @scroll="scroll" :scroll-y='scrollable' :enable-back-to-top="true" :throttle="false">
			<view class="mescroll-uni-content mescroll-render-touch"
			@touchstart="wxsBiz.touchstartEvent"
			@touchmove="wxsBiz.touchmoveEvent"
			@touchend="wxsBiz.touchendEvent"
			@touchcancel="wxsBiz.touchendEvent"
			:change:prop="wxsBiz.propObserver"
			:prop="wxsProp">
				<view v-if="topbar&&statusBarHeight" class="mescroll-topbar" :style="{height: statusBarHeight+'px', background: topbar}"></view>

				<view class="mescroll-wxs-content" :style="{'transform': translateY, 'transition': transition}" :change:prop="wxsBiz.callObserver" :prop="callProp">
					<!-- <mescroll-down :option="mescroll.optDown" :type="downLoadType" :rate="downRate"></mescroll-down> -->
					<view v-if="mescroll.optDown.use" class="mescroll-downwarp" :style="{'background':mescroll.optDown.bgColor,'color':mescroll.optDown.textColor}">
						<view class="downwarp-content">
							<view class="downwarp-progress mescroll-wxs-progress" :class="{'mescroll-rotate': isDownLoading}" :style="{'border-color':mescroll.optDown.textColor, 'transform': downRotate}"></view>
							<view class="downwarp-tip">{{downText}}</view>
						</view>
					</view>

					<slot></slot>

					<mescroll-empty v-if="isShowEmpty" :option="mescroll.optUp.empty" @emptyclick="emptyClick"></mescroll-empty>

					<!-- <mescroll-up v-if="mescroll.optUp.use && !isDownLoading && upLoadType!==3" :option="mescroll.optUp" :type="upLoadType"></mescroll-up> -->
					<view v-if="mescroll.optUp.use && !isDownLoading && upLoadType!==3" class="mescroll-upwarp" :style="{'background':mescroll.optUp.bgColor,'color':mescroll.optUp.textColor}">
						<view v-show="upLoadType===1">
							<view class="upwarp-progress mescroll-rotate" :style="{'border-color':mescroll.optUp.textColor}"></view>
							<view class="upwarp-tip">{{ mescroll.optUp.textLoading }}</view>
						</view>
						<view v-if="upLoadType===2" class="upwarp-nodata">{{ mescroll.optUp.textNoMore }}</view>
					</view>
				</view>

				<!-- #ifdef H5 -->
				<view v-if="bottombar && windowBottom>0" class="mescroll-bottombar" :style="{height: windowBottom+'px'}"></view>
				<!-- #endif -->

				<view v-if="safearea" class="mescroll-safearea"></view>
			</view>
		</scroll-view>

		<mescroll-top v-model="isShowToTop" :option="mescroll.optUp.toTop" @click="toTopClick"></mescroll-top>

		<!-- #ifdef MP-WEIXIN || MP-QQ || APP-PLUS || H5 -->
		<view :change:prop="renderBiz.propObserver" :prop="wxsProp"></view>
		<!-- #endif -->
	</view>
</template>

<!-- #ifdef MP-WEIXIN || MP-QQ || APP-PLUS || H5 -->
<script src="./wxs/wxs.wxs" module="wxsBiz" lang="wxs"></script>
<!-- #endif -->

<!-- #ifdef APP-PLUS || H5 -->
<script module="renderBiz" lang="renderjs">
	import renderBiz from './wxs/renderjs.js';
	export default {
		mixins:[renderBiz]
	}
</script>
<!-- #endif -->

<script>
	import MeScroll from './mescroll-uni.js';
	import GlobalOption from './mescroll-uni-option.js';
	import mescrollI18n from './mescroll-i18n.js';
	import MescrollTop from './components/mescroll-top.vue';
	import WxsMixin from './wxs/mixins.js';


	export default {
		name: 'mescroll-uni',
		mixins: [WxsMixin],
		components: {
			MescrollTop
		},
		props: {
			down: Object,
			up: Object,
			i18n: Object,
			top: [String, Number],
			topbar: [Boolean, String],
			bottom: [String, Number],
			safearea: Boolean,
			fixed: {
				type: Boolean,
				default: true
			},
			height: [String, Number],
			bottombar:{
				type: Boolean,
				default: true
			},
			disableScroll: Boolean
		},
		data() {
			return {
				mescroll: {optDown:{},optUp:{}},
				viewId: 'id_' + Math.random().toString(36).substr(2,16),
				downHight: 0,
				downRate: 0,
				downLoadType: 0,
				upLoadType: 0,
				isShowEmpty: false,
				isShowToTop: false,
				scrollTop: 0,
				scrollAnim: false,
				windowTop: 0,
				windowBottom: 0,
				windowHeight: 0,
				statusBarHeight: 0
			}
		},
		watch: {
			height() {
				this.setClientHeight()
			}
		},
		computed: {
			isFixed(){
				return !this.height && this.fixed
			},
			scrollHeight(){
				if (this.isFixed) {
					return "auto"
				} else if(this.height){
					return this.toPx(this.height) + 'px'
				}else{
					return "100%"
				}
			},
			numTop() {
				return this.toPx(this.top)
			},
			fixedTop() {
				return this.isFixed ? (this.numTop + this.windowTop) + 'px' : 0
			},
			padTop() {
				return !this.isFixed ? this.numTop + 'px' : 0
			},
			numBottom() {
				return this.toPx(this.bottom)
			},
			fixedBottom() {
				return this.isFixed ? (this.numBottom + this.windowBottom) + 'px' : 0
			},
			padBottom() {
				return !this.isFixed ? this.numBottom + 'px' : 0
			},
			isDownReset(){
				return this.downLoadType===3 || this.downLoadType===4
			},
			transition() {
				return this.isDownReset ? 'transform 300ms' : '';
			},
			translateY() {
				return this.downHight > 0 ? 'translateY(' + this.downHight + 'px)' : '';
			},
			scrollable(){
				if(this.disableScroll) return false
				return this.downLoadType===0 || this.isDownReset
			},
			isDownLoading(){
				return this.downLoadType === 3
			},
			downRotate(){
				return 'rotate(' + 360 * this.downRate + 'deg)'
			},
			downText(){
				if(!this.mescroll) return "";
				switch (this.downLoadType){
					case 1: return this.mescroll.optDown.textInOffset;
					case 2: return this.mescroll.optDown.textOutOffset;
					case 3: return this.mescroll.optDown.textLoading;
					case 4: return this.mescroll.isDownEndSuccess ? this.mescroll.optDown.textSuccess : this.mescroll.isDownEndSuccess==false ? this.mescroll.optDown.textErr : this.mescroll.optDown.textInOffset;
					default: return this.mescroll.optDown.textInOffset;
				}
			}
		},
		methods: {
			toPx(num){
				if(typeof num === "string"){
					if (num.indexOf('px') !== -1) {
						if(num.indexOf('rpx') !== -1) { // "10rpx"
							num = num.replace('rpx', '');
						} else if(num.indexOf('upx') !== -1) { // "10upx"
							num = num.replace('upx', '');
						} else { // "10px"
							return Number(num.replace('px', ''))
						}
					}else if (num.indexOf('%') !== -1){
						let rate = Number(num.replace("%","")) / 100
						return this.windowHeight * rate
					}
				}
				return num ? uni.upx2px(Number(num)) : 0
			},
			scroll(e) {
				this.mescroll.scroll(e.detail, () => {
					this.$emit('scroll', this.mescroll)
				})
			},
			emptyClick() {
				this.$emit('emptyclick', this.mescroll)
			},
			toTopClick() {
				this.mescroll.scrollTo(0, this.mescroll.optUp.toTop.duration);
				this.$emit('topclick', this.mescroll);
			},
			setClientHeight() {
				if (!this.isExec) {
					this.isExec = true;
					this.$nextTick(() => {
						this.getClientInfo(data=>{
							this.isExec = false;
							if (data) {
								this.mescroll.setClientHeight(data.height);
							} else if (this.clientNum != 3) {
								this.clientNum = this.clientNum == null ? 1 : this.clientNum + 1;
								setTimeout(() => {
									this.setClientHeight()
								}, this.clientNum * 100)
							}
						})
					})
				}
			},
			getClientInfo(success){
				let query = uni.createSelectorQuery().in(this);
				let view = query.select('#' + this.viewId);
				view.boundingClientRect(data => {
					success(data)
				}).exec();
			}
		},
		created() {
			let vm = this;

			let diyOption = {
				down: {
					inOffset() {
						vm.downLoadType = 1;
					},
					outOffset() {
						vm.downLoadType = 2;
					},
					onMoving(mescroll, rate, downHight) {
						vm.downHight = downHight;
						vm.downRate = rate;
					},
					showLoading(mescroll, downHight) {
						vm.downLoadType = 3;
						vm.downHight = downHight;
					},
					beforeEndDownScroll(mescroll){
						vm.downLoadType = 4;
						return mescroll.optDown.beforeEndDelay
					},
					endDownScroll() {
						vm.downLoadType = 4;
						vm.downHight = 0;
						vm.downResetTimer && clearTimeout(vm.downResetTimer)
						vm.downResetTimer = setTimeout(()=>{
							if(vm.downLoadType===4) vm.downLoadType = 0
						},300)
					},
					callback: function(mescroll) {
						vm.$emit('down', mescroll)
					}
				},
				up: {
					showLoading() {
						vm.upLoadType = 1;
					},
					showNoMore() {
						vm.upLoadType = 2;
					},
					hideUpScroll(mescroll) {
						vm.upLoadType = mescroll.optUp.hasNext ? 0 : 3;
					},
					empty: {
						onShow(isShow) {
							vm.isShowEmpty = isShow;
						}
					},
					toTop: {
						onShow(isShow) {
							vm.isShowToTop = isShow;
						}
					},
					callback: function(mescroll) {
						vm.$emit('up', mescroll);
						vm.setClientHeight()
					}
				}
			}

			let i18nType = mescrollI18n.getType()
			let i18nOption = {type: i18nType}
			MeScroll.extend(i18nOption, vm.i18n)
			MeScroll.extend(i18nOption, GlobalOption.i18n)
			MeScroll.extend(diyOption, i18nOption[i18nType]);
			MeScroll.extend(diyOption, {down:GlobalOption.down, up:GlobalOption.up});
			let myOption = JSON.parse(JSON.stringify({'down': vm.down,'up': vm.up}))
			MeScroll.extend(myOption, diyOption);

			vm.mescroll = new MeScroll(myOption);
			vm.mescroll.viewId = vm.viewId;
			vm.mescroll.i18n = i18nOption;
			vm.$emit('init', vm.mescroll);

			const sys = uni.getSystemInfoSync();
			if(sys.windowTop) vm.windowTop = sys.windowTop;
			if(sys.windowBottom) vm.windowBottom = sys.windowBottom;
			if(sys.windowHeight) vm.windowHeight = sys.windowHeight;
			if(sys.statusBarHeight) vm.statusBarHeight = sys.statusBarHeight;
			vm.mescroll.setBodyHeight(sys.windowHeight);

			vm.mescroll.resetScrollTo((y, t) => {
				vm.scrollAnim = (t !== 0);
				if(typeof y === 'string'){
					vm.getClientInfo(function(rect){
						let mescrollTop = rect.top
						let selector;
						if(y.indexOf('#')==-1 && y.indexOf('.')==-1){
							selector = '#'+y
						}else{
							selector = y
							// #ifdef APP-PLUS || H5 || MP-ALIPAY || MP-DINGTALK
							if(y.indexOf('>>>')!=-1){
								selector = y.split('>>>')[1].trim()
							}
							// #endif
						}
						uni.createSelectorQuery().select(selector).boundingClientRect(function(rect){
							if (rect) {
								let curY = vm.mescroll.getScrollTop()
								let top = rect.top - mescrollTop
								top += curY
								if(!vm.isFixed) top -= vm.numTop
								vm.scrollTop = curY;
								vm.$nextTick(function() {
									vm.scrollTop = top
								})
							} else{
								console.error(selector + ' does not exist');
							}
						}).exec()
					})
					return;
				}
				let curY = vm.mescroll.getScrollTop()
				if (t === 0 || t === 300) {
					vm.scrollTop = curY;
					vm.$nextTick(function() {
						vm.scrollTop = y
					})
				} else {
					vm.mescroll.getStep(curY, y, step => {
						vm.scrollTop = step
					}, t)
				}
			})

			if (vm.up && vm.up.toTop && vm.up.toTop.safearea != null) {} else {
				vm.mescroll.optUp.toTop.safearea = vm.safearea;
			}

			uni.$on("setMescrollGlobalOption", options=>{
				if(!options) return;
				let i18nType = options.i18n ? options.i18n.type : null
				if(i18nType && vm.mescroll.i18n.type != i18nType){
					vm.mescroll.i18n.type = i18nType
					mescrollI18n.setType(i18nType)
					MeScroll.extend(options, vm.mescroll.i18n[i18nType])
				}
				if(options.down){
					let down = MeScroll.extend({}, options.down)
					vm.mescroll.optDown = MeScroll.extend(down, vm.mescroll.optDown)
				}
				if(options.up){
					let up = MeScroll.extend({}, options.up)
					vm.mescroll.optUp = MeScroll.extend(up, vm.mescroll.optUp)
				}
			})
		},
		mounted() {
			this.setClientHeight()
		},
		destroyed() {
			uni.$off("setMescrollGlobalOption")
		}
	}
</script>

<style>
	@import "./mescroll-uni.css";
	@import "./components/mescroll-down.css";
	@import './components/mescroll-up.css';
</style>
