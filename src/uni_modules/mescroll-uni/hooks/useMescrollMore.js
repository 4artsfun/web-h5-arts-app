import { ref  } from 'vue';

// import { onPageScroll, onReachBottom, onPullDownRefresh} from '@dcloudio/uni-app';

function useMescrollMore(mescrollItems, onPageScroll, onReachBottom, onPullDownRefresh){
	const tabIndex = ref(0)

	onPageScroll && onPageScroll(e=>{
		handlePageScroll(e)
	})

	onReachBottom && onReachBottom(()=>{
		handleReachBottom()
	})

	onPullDownRefresh && onPullDownRefresh(()=>{
		handlePullDownRefresh()
	})

	const handlePageScroll = (e)=>{
		let mescroll = getMescroll(tabIndex.value);
		mescroll && mescroll.onPageScroll(e);
	}
	const handleReachBottom = ()=>{
		let mescroll = getMescroll(tabIndex.value);
		mescroll && mescroll.onReachBottom();
	}

	const handlePullDownRefresh = ()=>{
		let mescroll = getMescroll(tabIndex.value);
		mescroll && mescroll.onPullDownRefresh();
	}

	const getMescroll = (i)=>{
		if (mescrollItems && mescrollItems[i]) {
			return mescrollItems[i].value.getMescroll()
		} else{
			return null
		}
	}

	const scrollToLastY = ()=>{
		let mescroll = getMescroll(tabIndex.value);
		if(mescroll){
			let y = mescroll.getScrollTop()
			mescroll.scrollTo(y, 0)
			setTimeout(()=>{
				mescroll.scrollTo(y, 0)
			},20)
		}
	}

	return {
		tabIndex,
		getMescroll,
		scrollToLastY
	}
}

export default useMescrollMore
