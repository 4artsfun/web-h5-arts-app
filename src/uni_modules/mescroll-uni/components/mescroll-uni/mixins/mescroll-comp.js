/**
 */
const MescrollCompMixin = {
	onPageScroll(e) {
		this.handlePageScroll(e)
	},
	onReachBottom() {
		this.handleReachBottom()
	},
	onPullDownRefresh(){
		this.handlePullDownRefresh()
	},
	data() {
		return {
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
	methods:{
		handlePageScroll(e){
			let item = this.$refs["mescrollItem"];
			if(item && item.mescroll) item.mescroll.onPageScroll(e);
		},
		handleReachBottom(){
			let item = this.$refs["mescrollItem"];
			if(item && item.mescroll) item.mescroll.onReachBottom();
		},
		handlePullDownRefresh(){
			let item = this.$refs["mescrollItem"];
			if(item && item.mescroll) item.mescroll.onPullDownRefresh();
		}
	}
}

export default MescrollCompMixin;
