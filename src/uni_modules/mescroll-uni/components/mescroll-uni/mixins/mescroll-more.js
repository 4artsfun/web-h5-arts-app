/**
 */
const MescrollMoreMixin = {
	data() {
		return {
			tabIndex: 0,
			mescroll: {
				onPageScroll: e=>{
					this.handlePageScroll(e)
				},
				onReachBottom: ()=>{
					this.handleReachBottom()
				},
				onPullDownRefresh: ()=>{
					this.handlePullDownRefresh()
				}
			}
		}
	},
	onPageScroll(e) {
		this.handlePageScroll(e)
	},
	onReachBottom() {
		this.handleReachBottom()
	},
	onPullDownRefresh(){
		this.handlePullDownRefresh()
	},
	methods:{
		handlePageScroll(e){
			let mescroll = this.getMescroll(this.tabIndex);
			mescroll && mescroll.onPageScroll(e);
		},
		handleReachBottom(){
			let mescroll = this.getMescroll(this.tabIndex);
			mescroll && mescroll.onReachBottom();
		},
		handlePullDownRefresh(){
			let mescroll = this.getMescroll(this.tabIndex);
			mescroll && mescroll.onPullDownRefresh();
		},
		getMescroll(i){
			if(!this.mescrollItems) this.mescrollItems = [];
			if(!this.mescrollItems[i]) {
				let vForItem = this.$refs["mescrollItem"];
				if(vForItem){
					this.mescrollItems[i] = vForItem[i]
				}else{
					this.mescrollItems[i] = this.$refs["mescrollItem"+i];
				}
			}
			let item = this.mescrollItems[i]
			return item ? item.mescroll : null
		},
		tabChange(i){
			let mescroll = this.getMescroll(i);
			if(mescroll){
				let y = mescroll.getScrollTop()
				mescroll.scrollTo(y, 0)
				setTimeout(()=>{
					mescroll.scrollTo(y, 0)
				},30)
			}
		}
	}
}

export default MescrollMoreMixin;
