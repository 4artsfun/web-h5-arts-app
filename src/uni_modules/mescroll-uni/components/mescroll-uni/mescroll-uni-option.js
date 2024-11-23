const GlobalOption = {
	down: {
		offset: 80,
		native: false
	},
	up: {
		offset: 150,
		toTop: {
			src: "https://www.mescroll.com/img/mescroll-totop.png",
			offset: 1000,
			right: 20,
			bottom: 120,
			width: 72
		},
		empty: {
			use: true,
			icon: "/static/images/empty.png"
		}
	},
	i18n: {
		zh: {
			down: {
				textInOffset: 'Drop down refresh',
				textOutOffset: 'Release updates',
				textLoading: 'Loading ...',
				textSuccess: 'Loaded successfully',
				textErr: 'Loading failed'
			},
			up: {
				textLoading: 'Loading ...',
				textNoMore: '-- End --',
				empty: {
					tip: '~ Empty ~'
				}
			}
		},
		en: {
			down: {
				textInOffset: 'Drop down refresh',
				textOutOffset: 'Release updates',
				textLoading: 'Loading ...',
				textSuccess: 'Loaded successfully',
				textErr: 'Loading failed'
			},
			up: {
				textLoading: 'Loading ...',
				textNoMore: '-- End --',
				empty: {
					tip: '~ Empty ~'
				}
			}
		}
	}
}

export default GlobalOption
