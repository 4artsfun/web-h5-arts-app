const mescrollI18n = {
	def: "en",
	getType(){
		return uni.getStorageSync("mescroll-i18n") || this.def
	},
	setType(type){
		uni.setStorageSync("mescroll-i18n", type)
	}
}

export default mescrollI18n
