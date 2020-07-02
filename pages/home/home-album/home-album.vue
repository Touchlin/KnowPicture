<template>
	<scroll-view scroll-y="true" class="album" @scrolltolower="handlePage">
		<!-- 轮播图 -->
		<swiper class="album-banner" indicator-dots autoplay circular>
			<swiper-item class="banner" v-for="img in banner" :key="img.id">
				<image :src="img.thumb" mode="widthFix"></image>
			</swiper-item>
		</swiper>
		
		<!-- 图片区 -->
		<view class="album-list">
			<view class="album-item" v-for="item in album" :key="item.id" @click="goAlbumDetail(item.id)">
				<view class="left">
					<image :src="item.cover" mode="aspectFill"></image>
				</view>
				<view class="right">
					<view class="name">{{item.name}}</view>
					<view class="desc">{{item.desc}}</view>
					<view class="focus">
						<text class="icon-add_circle"></text>
						<text>关注</text>
					</view>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				banner: [],
				album: [],
				params: {
					limit: 30,
					order: 'new',
					skip: 0
				},
				isEnd: false
			}
		},
		methods: {
			getData() {
				this.request({
					url: 'http://157.122.54.189:9088/image/v1/wallpaper/album',
					data: this.params
				})
				.then(result => {
					// console.log(result)
					if (result.res.album.length === 0) {
						this.isEnd = true
						uni.showToast({
							title: "已经没有更多数据了",
							icon: 'none'
						})
						return
					}
					
					if (this.banner.length === 0) {
						this.banner = result.res.banner
					}
					this.album = [...this.album,...result.res.album]
				
				})
			},
			handlePage() {
				if (!this.isEnd) {
					this.params.skip += this.params.limit
					this.getData()
				}
			},
			goAlbumDetail(id) {
				uni.navigateTo({
					url: `/pages/album-detail/index?id=${id}`,
				})
			}
		},
		created() {
			this.getData()
		}
		// mounted() {
		// 	uni.setNavigationBarTitle({
		// 		title: "专辑"
		// 	})
		// }
	}
</script>

<style lang="scss" scoped>

.album{
	height: calc(100vh - 36px);
	.album-banner{
		height: calc(750rpx / (640 / 284));
	}
	.album-list{
		padding: 10rpx;
		.album-item{
			padding:10rpx 0;
			display: flex;
			border-bottom: 1px solid rgba(7,17,27,.1);
			.left{
				padding: 10rpx;
				flex: 1;
				image{
					width: 220rpx;
					height: 220rpx;
				}
			}
			.right{
				flex: 2;
				padding: 0 10rpx;
				position: relative;
				.name{
					font-size: 30rpx;
					color: #000;
					padding: 10rpx 0;
				}
				.desc{
					width: 460rpx;
					font-size: 28rpx;
					padding: 10rpx 0;
					color: #ccc;
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
				}
				.focus{
					display: flex;
					align-items: center;
					position: absolute;
					bottom: 20rpx;
					right: 26rpx;
					font-size: 28rpx;
					color: $color;
					border:1px solid $color;
					padding: 8rpx;
					.icon-add_circle{
						margin-right: 10rpx;
					}
				}
			}
		}
	}
}
</style>
