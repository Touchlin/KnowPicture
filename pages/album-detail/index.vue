<template>
	<view class="album-detail">
		<!-- 专辑详情头部 -->
		<view class="detail-title">
			<image :src="albuminfo.cover" mode="widthFix"></image>
			<view class="text-focus">
				<view class="text">{{albuminfo.name}}</view>
				<view class="focus" v-show="albuminfo">关注专辑</view>
			</view>
		</view>
		
		<!-- 专辑作者 -->
		<view class="author">
			<view class="author-intro">
				<image :src="albuminfo.user.avatar" mode="widthFix"></image>
				<text class="name">{{albuminfo.user.name}}</text>
			</view>
			<view class="author-info">
				<!-- text标签会识别特殊字符，如\n -->
				<text>{{albuminfo.desc}}</text>
			</view>
		</view>
		
		<!-- 专辑详情图片区 -->
		<view class="detail-images">
			<view class="image-item" v-for="(item, index) in wallpaper" :key="item.id">
				<get-detail :imgList="wallpaper" :index="index">
					<image :src="item.thumb + item.rule.replace('$<Height>',360)" mode="aspectFill"></image>
				</get-detail>
			</view>
		</view>
	</view>
</template>

<script>
	import getDetail from '@/components/getdetail/getdetail.vue'
	export default {
		components: {getDetail},
		data() {
			return {
				params: {
					limit: 30,
					order: 'new',
					skip: 0,
					// 1表示第一次请求 0表示不是第一次请求
					first: 1
				},
				id: '',
				albuminfo: {},
				wallpaper: [],
				isEnd: false
			}
		},
		methods: {
			getData() {
				this.request({
					url: `http://157.122.54.189:9088/image/v1/wallpaper/album/${this.id}/wallpaper`,
					data: this.params
				})
				.then(result => {
					// console.log(result)
					// console.log(Object.keys(this.albuminfo))
					if (Object.keys(this.albuminfo).length === 0) {
						this.albuminfo = result.res.album
					}

					if(result.res.wallpaper.length === 0) {
						this.isEnd = true
						uni.showToast({
							title: "没有更多数据了",
							icon: "none"
						})
						return
					}
					
					this.wallpaper = [...this.wallpaper,...result.res.wallpaper]
				})
			}
		},
		onReachBottom() {
			if(!this.isEnd) {
				this.params.first = 0
				this.params.skip += this.params.limit
				this.getData()
			}
		},
		onLoad(options) {
			// console.log(options)
			// this.id = "5e59075ae7bce73965512bd6"
			this.id = options.id
			this.getData()
		}
	}
</script>

<style lang="scss" scoped>
.album-detail{
	.detail-title{
		position: relative;
		// height: 420rpx;
		// image{
		// 	position: absolute;
		// 	width: 100%;
		// 	height: 100%;
		// }
		.text-focus{
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 80rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #fff;
			padding: 0 25rpx;
			.text{
				font-size: 36rpx;
			}
			.focus{
				width: 152rpx;
				height: 50rpx;
				line-height: 50rpx;
				font-size: 28rpx;
				background-color: $color;
				text-align: center;
				border-radius: 10rpx;
			}
		}
	}
	.author{
		padding: 20rpx 10rpx;
		.author-intro{
			padding:10rpx 0;
			display: flex;
			align-items: center;
			image{
				width: 52rpx;
			}
			.name{
				margin-left: 15rpx;
			}
		}
		.author-info{
			color: #ccc;
			padding-left: 20rpx;
		}
	}
	.detail-images{
		display: flex;
		flex-wrap: wrap;
		.image-item{
			width: 33%;
			border: 5rpx solid #fff;
			image{
				height: 160rpx;
			}
		}
	}
}
</style>
