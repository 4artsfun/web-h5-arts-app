const MescrollMixin = {
	data() {
		return {
			mescroll: null
		}
	},
	onPullDownRefresh(){
		this.mescroll && this.mescroll.onPullDownRefresh();
	},
	onPageScroll(e) {
		this.mescroll && this.mescroll.onPageScroll(e);
	},
	onReachBottom() {
		this.mescroll && this.mescroll.onReachBottom();
	},
	methods: {
		mescrollInit(mescroll) {
			this.mescroll = mescroll;
		},
		downCallback() {
			if(this.mescroll.optUp.use){
				this.mescroll.resetUpScroll()
			}else{
				setTimeout(()=>{
					this.mescroll.endSuccess();
				}, 500)
			}
		},
		upCallback() {
			setTimeout(()=>{
				this.mescroll.endErr();
			}, 500)
		}
	}

}

export default MescrollMixin;
