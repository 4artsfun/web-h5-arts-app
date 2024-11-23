/**
 */
const MescrollMoreItemMixin = {
	props:{
		i: Number,
		index: {
			type: Number,
			default(){
				return 0
			}
		}
	},
	// #endif
	data() {
		return {
			downOption:{
				auto:false
			},
			upOption:{
				auto:false
			},
			isInit: false
		}
	},
	watch:{
		index(val){
			if (this.i === val && !this.isInit) this.mescrollTrigger()
		}
	},
	methods: {
		mescrollInit(mescroll) {
			this.mescroll = mescroll;
			if(this.i === this.index){
				this.mescrollTrigger()
			}
		},
		mescrollTrigger(){
			this.isInit = true;
			if (this.mescroll) {
				if (this.mescroll.optDown.use) {
					this.mescroll.triggerDownScroll();
				} else{
					this.mescroll.triggerUpScroll();
				}
			}
		}
	}
}

export default MescrollMoreItemMixin;
