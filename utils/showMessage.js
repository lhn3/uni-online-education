
let message = {
	toast(title, type = 'text') {
		if (title.length > 15) {
			console.error('toast长度超过15个字符,当前长度为' + title.length)
			return
		}
		var icon = 'none'
		if (type) {
			switch (type) {
				case 'text':
					icon = 'none'
					break
				case 'success':
					icon = 'success'
					break
				case 'error':
					icon = 'error'
					break
			}
		}
		uni.showToast({
			title,
			icon
		})
	},
	confirm(title) {
		return new Promise((res, rej) => {
			uni.showModal({
				title,
				cancelColor: '#b6b6b6',
				confirmColor: '#363636',
				success: (result) => {
					if (result.cancel) {
						rej(result)
					} else if (result.confirm) {
						res(result)
					}
				}

			})
		})
	},
}
export default message

