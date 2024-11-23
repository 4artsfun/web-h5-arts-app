import { ref } from 'vue';

// import { onPageScroll, onReachBottom, onPullDownRefresh} from '@dcloudio/uni-app';

function useMescrollComp(onPageScroll, onReachBottom, onPullDownRefresh){
	onPageScroll(e=>{
		handlePageScroll(e)
	})

	onReachBottom(()=>{
		handleReachBottom()
	})

	onPullDownRefresh && onPullDownRefresh(()=>{
		handlePullDownRefresh()
	})

	const mescrollItem = ref(null)

	const handlePageScroll = (e)=>{
		const mescroll = getMescroll()
		mescroll && mescroll.onPageScroll(e);
	}

	const handleReachBottom = ()=>{
		const mescroll = getMescroll()
		mescroll && mescroll.onReachBottom();
	}

	const handlePullDownRefresh = ()=>{
		const mescroll = getMescroll()
		mescroll && mescroll.onPullDownRefresh();
	}

	const getMescroll = ()=>{
		if(mescrollItem.value && mescrollItem.value.getMescroll){
			return mescrollItem.value.getMescroll()
		}
		return null
	}

	return {
		mescrollItem,
		getMescroll
	}
}

export default useMescrollComp
