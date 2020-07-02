<template>
	<view class="img-detail">
		<!-- 用户头像和昵称 -->
		<view class="user-info">
			<image class="user-photo" :src="imgList.user.avatar" mode="" v-if="imgList.user.avatar"></image>
			<!-- 默认设置 -->
			<image class="user-photo" :src="imgList.thumb" mode="" v-else></image>
			<view class="name-apply">
				<view class="user-name" v-if="imgList.user.name">{{imgList.user.name}}</view>
				<!-- 默认设置 -->
				<view class="user-name" v-else>{{imgList.store}}</view>
				<view class="user-apply">{{time}}</view>
			</view>
		</view>
		
		<!-- 大图 -->
		<view class="bigImg">
			<swiper-action @swiper="handleSwiper">
				<image :src="imgList.thumb" mode="widthFix"></image>
			</swiper-action>
		</view>
		
		<!-- 点赞和收藏 -->
		<view class="operation">
			<view class="approve">
				<text class="icon-5 icon"></text>
				<text class="text">{{imgList.rank}}</text>
			</view>
			<view class="focus">
				<text class="icon-1 icon"></text>
				<text>收藏</text>
			</view>
		</view>
		
		<!-- 评价 -->
		<view class="img-ratings">
			<ratings :all="all" :comment="comment" :hot="hot" :index="selectindex" @change="changeList"></ratings>
		</view>
		
		<!-- 评价列表 --><!-- 全部评价 -->
		<view class="ratings-list"  v-if="selectindex === 0 && comment.length > 0">
			<view class="ratings-item" v-for="item in all" :key="item.id">
				<view class="left">
					<image :src="item.user.avatar" mode="aspectFill"></image>
				</view>
				<view class="right">
					<view class="name-time">
						<view class="name">{{item.user.name}}</view>
						<view class="time">{{item.atime | formatDate}}</view>
					</view>
					<view class="bottom">
						<view class="content">{{item.content}}</view>
						<view class="icon-num">
							<text class="icon-5"></text>
							<text class="number">{{item.size}}</text>
						</view>
					</view>
				</view>
			</view>
			
		</view>
		
		<!-- 评价列表 --><!-- 最新评价 -->
		<view class="ratings-list"  v-if="selectindex === 2 && comment.length > 0">
			<view class="ratings-item" v-for="item in comment" :key="item.id">
				<view class="left">
					<image :src="item.user.avatar" mode="aspectFill"></image>
				</view>
				<view class="right">
					<view class="name-time">
						<view class="name">{{item.user.name}}</view>
						<view class="time">{{item.atime | formatDate}}</view>
					</view>
					<view class="bottom">
						<view class="content">{{item.content}}</view>
						<view class="icon-num">
							<text class="icon-5"></text>
							<text class="number">{{item.size}}</text>
						</view>
					</view>
				</view>
			</view>
			
		</view>
		
		<view class="no-ratings" v-if="all.length === 0">暂无评价</view>
		
		<!-- 下载图片 -->
		<view class="download" @click="handleDown">
			<view class="down-btn">下载图片</view>
		</view>
	</view>
</template>

<script>
	import moment from 'moment'
	import { format } from '@/common/js/format.js'
	import ratings from '@/components/ratings/ratings.vue'
	import swiperAction from '@/components/swiper/swiper.vue'
	moment.locale("zh-cn")
	const app = getApp()
	const all = 0
	const hot = 1
	const newe = 2
	
	export default {
		data() {
			return {
				imgList: {},
				imgindex: 0,
				newLoad: '',
				time: '',
				album: [],
				comment: [],
				hot: [],
				selectindex: all,
				all: []
			}
		},
		methods: {
			getData() {
				const { imgList} = app.globalData
				this.imgList = imgList[this.imgindex]
				this.time = moment(this.imgList.atime*1000).fromNow()
				this.getComments(this.imgList.id)
			},
			getComments(id) {
				this.request({
					url: `http://157.122.54.189:9088/image/v2/wallpaper/wallpaper/${id}/comment`
				})
				.then(result => {
					this.album = result.res.album
					this.comment = result.res.comment
					this.hot = result.res.hot
					this.all = [...this.hot, ...this.comment]
					// console.log(this.all)
					// console.log(JSON.stringify(result.res.comment))
					// console.log(result)
				})
			},
			changeList(value) {
				this.selectindex = value
			},
			handleSwiper(value) {
				
				const { imgList } = app.globalData
				if (value === 'right' && this.imgindex > 0) {
					this.imgindex--
					this.getData()
				} else if (value === 'left' && this.imgindex < imgList.length - 1) {
					this.imgindex++
					this.getData()
				} else {
					uni.showToast({
						title: "没有数据了",
						icon: "none"
					})
				}
			},
			async handleDown() {
				await uni.showLoading({
					title: "下载中"
				})
				
				let tempFilePath = ''
				const result = await uni.downloadFile({ 
					url: this.imgList.img,
					success(res) {
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success() {
								uni.showToast({
									title: "下载完成"
								})
							},
							fail() {
								uni.showToast({
									title: "下载失败",
								})
							}
						})
					}
				})
				
				uni.hideLoading()
			}
		},
		onLoad() {
			const { index } = app.globalData
			this.imgindex = index
			this.getData()
			// this.newLoad = this.imgList.thumb + this.imgList.rule.replace('$<Height>',360)
		},
		components: {
			ratings,
			swiperAction
		},
		filters: {
			formatDate(value) {
				const date = new Date(value * 1000)
				return format(date, 'yyyy-mm-dd HH:MM:SS')
			}
		}
	}
</script>

<style lang="scss" scoped>
.img-detail{
	.user-info{
		display: flex;
		align-items: center;
		padding: 40rpx;
		.user-photo{
			width: 88rpx;
			height: 88rpx;
			border-radius: 50%;
		}
		.name-apply{
			margin-left: 20rpx;
			.user-name{
				font-weight: 600;
				color: #000;
			}
			.user-apply{
				font-size: 24rpx;
				color: #ccc;
				margin-top: 5rpx;
			}
		}
	}
	// .bigImg{
	// 	height: ;
	// }
	.operation{
		display: flex;
		text-align: center;
		align-items: center;
		padding:20rpx 0;
		line-height: 60rpx;
		border-bottom: 1px solid rgba(7,17,27,.1);
		.icon{
			font-size: 32rpx;
			vertical-align: -2rpx;
			color: #ccc;
			margin-right: 10rpx;
		}
		.approve{
			flex: 1;
		}
		.focus{
			flex: 1;
		}
	}
	.img-ratings{
		padding: 0 24rpx;
		border-bottom: 1px solid rgba(7,17,27,.1);
	}
	.ratings-list{
		padding: 20rpx 30rpx;
		.ratings-item{
			padding:20rpx 0;
			display: flex;
			border-bottom: 1rpx solid rgba(7,17,27,.1);
			.left{
				flex: 0 0 80rpx;
				margin-right: 24rpx;
				image{
					width: 70rpx;
					height: 70rpx;
					border-radius: 50%;
				}
			}
			.right{
				flex: 1;
				.name-time{
					display: flex;
					justify-content: space-between;
					align-items: center;
					.name{
						font-size: 24rpx;	
						line-height: 24rpx;
						color: rgb(7,17,27);
					}
					.time{
						font-size: 24rpx;
						color: rgb(147,153,159);
					}
				}
				.bottom{
					color: rgb(7,17,27);
					line-height: 36rpx;
					margin-top: 36rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.icon-num{
						.number{
							margin: 0 10rpx;
							font-size: 30rpx;
						}
					}
				}
			}
		}
	}
	.no-ratings{
		padding: 20rpx 30rpx;
	}
	.download{
		// position: fixed;
		// bottom: 0;
		// left: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100rpx;
		.down-btn{
			width: 95%;
			height: 80rpx;
			line-height: 80rpx;
			background-color: $color;
			color: #fff;
			font-size: 36rpx;
			font-weight: 600;
			text-align: center;
		}
	}
}
</style>
