
function useMescroll(onPageScroll, onReachBottom, onPullDownRefresh){
	let mescroll = null;

	const mescrollInit = (e)=> {
		mescroll = e;
	}

	const getMescroll = ()=>{
		return mescroll
	}

	const downCallback = ()=> {
		if(mescroll.optUp.use){
			mescroll.resetUpScroll()
		}else{
			setTimeout(()=>{
				mescroll.endSuccess();
			}, 500)
		}
	}

	const upCallback = ()=> {
		setTimeout(()=>{
			mescroll.endErr();
		}, 500)
	}

	onPullDownRefresh && onPullDownRefresh(() => {
	  mescroll && mescroll.onPullDownRefresh();
	})

	onPageScroll && onPageScroll(e=>{
		mescroll && mescroll.onPageScroll(e);
	})

	onReachBottom && onReachBottom(()=>{
		mescroll && mescroll.onReachBottom();
	})

	return {
		getMescroll,
		mescrollInit,
		downCallback,
		upCallback
	}
}

export default useMescroll
