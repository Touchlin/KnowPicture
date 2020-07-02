<template>
	<view @click="goImgDetail">
		<slot></slot>
	</view>
</template>

<script>
	const app = getApp()
	export default {
		components: {
			
		},
		props: {
			imgList: {
				type: Array,
				default() {
					return []
				}
			},
			index: {
				type: Number
			}
		},
		data() {
			return {}
		},
		methods: {
			goImgDetail() {
				app.globalData.imgList = this.imgList
				app.globalData.index = this.index
				uni.navigateTo({
					url: "/pages/img-detail/index"
				})
			}
		}
	}
</script>

<style>
</style>
