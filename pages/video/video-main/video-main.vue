<template>
	<scroll-view scroll-y="true" enable-flex class="video" @scrolltolower="handleScroll">
		<view class="video-item" v-for="item in videowp" :key="item.id" @click="goVideoPlay(item)">
			<image :src="item.img" mode="widthFix"></image>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		props: {
			objs: {
				type: Object
			}
		},
		data() {
			return {
				videowp: [],
				isEnd: false
			}
		},
		methods: {
			getData() {
				this.request({
					url: this.objs.url,
					data: this.objs.params
				})
				.then(result => {
					// console.log(result)
					
					if (result.res.videowp.length === 0) {
						this.isEnd = true
						uni.showToast({
							title: "没有更多数据了",
							icon: "none"
						})
						return
					}
					
					this.videowp = [...this.videowp, ...result.res.videowp]
				})
			},
			handleScroll() {
				if (!this.isEnd) {
					this.objs.params.skip += this.objs.params.limit
					this.getData()
				}
			},
			goVideoPlay(item) {
				getApp().globalData.viedo = item
				uni.navigateTo({
					url: "/pages/video-play/index"
				})
			}
		},
		watch: {
			objs() {
				this.videowp = []
				this.getData()
			}
		},
		created() {
			this.getData()
		}
	}
</script>

<style lang="scss" scoped>
.video{
	height: calc(100vh - 36px);
	display: flex;
	flex-wrap: wrap;
	.video-item{
		width: 33%;
		border: 5rpx solid #fff;
	}
}
</style>
