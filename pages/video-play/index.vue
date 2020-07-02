<template>
	<view class="video-play">
		
		<view class="video-start">
			<!-- 视频 -->
			<video 
				:src="videoData.video" 
				objectFit="fill" 
				:muted="muted" 
				id="myVideo" 
				:show-center-play-btn="false"
				:controls="false"
				@click="cancelPlay"
				>
			</video>
			<!-- 声音 -->
			<cover-view class="icon" :class="muted? 'icon-2': 'icon-3'" @click="toggleMuted"></cover-view>
			<!-- 分享 -->
			<cover-view class="icon-4 icon"></cover-view>
			<button open-type="share" class="btn">123</button>
			<!-- 下载 -->
			<cover-view class="icon-uniE906 icon" @click="handleDown"></cover-view>
			<!-- 暂停按钮图标 -->
			<cover-view class="icon-uniE907" v-show="play" @click="startPlay"></cover-view>
		</view>
		
		
		<!-- <view class="video-down">
			<view class="">下载视频</view>
		</view> -->
	</view>
</template>

<script>
	const app = getApp()
	
	export default {
		data() {
			return {
				videoData: {},
				muted: false,
				play: true
			}
		},
		methods: {
			toggleMuted() {
				this.muted = !this.muted
			},
			handleDown() {

				uni.showLoading({
					title: "加载中"
				})
				
				// console.log(this.videoData.viedo)
				uni.downloadFile({
					url: this.videoData.video,
					success(res) {
						// console.log(res.tempFilePath)
						uni.saveVideoToPhotosAlbum({
							filePath: res.tempFilePath,
							success() {
								uni.showToast({
									title: "下载成功",
									icon: "none"
								})
							},
							fail() {
								uni.showToast({
									title: "取消下载",
									icon: "none"
								})
							}
						})
					},
					complete() {
						uni.hideLoading()
					}
				})
			},
			startPlay() {
					this.videoContext.play()
					this.play = false
			},
			cancelPlay() {
					this.videoContext.pause()
					this.play = true
			}
		},
		onLoad() {
			this.videoData = app.globalData.viedo
		},
		onReady() {
		    this.videoContext = uni.createVideoContext('myVideo')
		}
	}
</script>

<style lang="scss" scoped>
.video-play{
	position: relative;
	.video-operation{
		position: absolute;
		bottom: 20rpx;
		right: 20rpx;
	}
	.video-start{
		position: relative;
		video{
			width: 100vw;
			height: 100vh;
		}
		.icon{
			font-size: 66rpx;
			color: #fff;
			position: absolute;
			right: 60rpx;
		}
		.icon-2,.icon-3{
			bottom: 400rpx;
		}
		.icon-4{
			bottom: 260rpx;
		}
		.btn{
			position: absolute;
			bottom: 260rpx;
			right: 60rpx;
			opacity: 0;
			width: 66rpx;
			height: 66rpx;
		}
		.icon-uniE906{
			bottom: 120rpx;
		}
		.icon-uniE907{
		  position: fixed;
		  top: 50%;
		  left: 50%;
		  transform: translate(-50%,-50%);
		  font-size: 94rpx;
		  color: #fff;
		}
	}
}
</style>
