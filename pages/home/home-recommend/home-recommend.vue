<template>
	<scroll-view scroll-y="true" :scroll-top="scrollTop" @scroll="scrolltoupper" class="home-wrapper" v-if="recommend.length > 0" @scrolltolower="handlePage">
		<!-- 推荐 -->
		<view class="home-recommend">
			<view class="recommend" v-for="item in recommend" :key="item.id" @click="goAlbumDetail(item.target)">
				<image :src="item.thumb" mode="widthFix"></image>
			</view>
		</view>
		
		<!-- 月份 -->
		<view class="month-wrapper">
			<view class="title">
				<view class="month-left">
					<text class="number">{{months.stime  | formatDate}}</text>
					<text class="text">{{months.title}}</text>
				</view>
				<view class="month-right">
					更多 >
				</view>
			</view>
			<view class="content">
				<view class="content-item" v-for="(img, index) in months.items" :key="img.id">
					<get-detail :imgList="months.items" :index="index">
						<image :src="img.thumb + img.rule.replace('$<Height>',360)" mode="aspectFill"></image>
					</get-detail>
				</view>
			</view>
		</view>
		
		<!-- 热门 -->
		<view class="hot-wrapper">
			<view class="hot-title">
				<text>热门</text>
			</view>
			<view class="hot-content">
				<view class="hot-item" v-for="(hot, index) in hots" :key="hot.id">
					<get-detail :imgList="hots" :index="index">
						<image :src="hot.thumb" mode="widthFix"></image>
					</get-detail>
				</view>
			</view>
		</view>
		
		<!-- 返回顶部按钮 -->
		<view class="backTop" @click='backTop' v-if="backTopValue">
			<text class='iconfont icon-top li-ico'>Top</text>
		</view>
	</scroll-view>
</template>

<script>
	import { format } from '@/common/js/format.js'
	import getDetail from '@/components/getdetail/getdetail.vue'
	export default {
		name: "home-recommend",
		data(){
			return {
				recommend: [],
				months: [],
				hots: [],
				params: {
					limit: 30,
					order: 'hot',
					skip: 0
				},
				// 监听是否还有图片
				isEnd: false,
				// 监听是否发生滚动并触发返回顶部按钮
				backTopValue:false,
				scrollTop: 0,
				old: {
				    scrollTop: 0
				}
			}
		},
		methods: {
			getData() {
				this.request({
					url: "http://157.122.54.189:9088/image/v3/homepage/vertical",
					data: this.params
				})
				.then(result => {
					if (result.res.vertical.length === 0) {
						this.isEnd = true
						uni.showToast({
							title: "已经没有更多数据了",
							icon: 'none'
						})
						return
					}
					
					if (this.recommend.length === 0) {
						this.recommend = result.res.homepage[1].items
						this.months = result.res.homepage[2]
					}
					// 拼接数据才能保持一个完整的hots
					this.hots = [...this.hots, ...result.res.vertical]
				})
			},
			handlePage() {
				if (!this.isEnd) {
					this.params.skip += this.params.limit
					this.getData()
				}
			},
			scrolltoupper(e) {
				 this.old.scrollTop = e.detail.scrollTop
				 // console.log(scrollTop)
				 if (this.old.scrollTop > 350) {
					 this.backTopValue = true
				 } else {
					 this.backTopValue = false
				 }
			},
			// 控制滚动
			backTop() {
			    //防止抖动
				this.scrollTop = this.old.scrollTop
			    this.$nextTick(function() {
			        this.scrollTop = 0
			    });
			},
			goAlbumDetail(item) {
				uni.navigateTo({
					url: `/pages/album-detail/index?id=${item}`
				})
			}
		},
		filters: {
			formatDate(value) {
			    const date = new Date(value)
			    // console.log(date)
			    return format(date, 'dd日/mm月')
			}
		},
		created() {
			this.getData()
		},
		components: {
			getDetail
		}
	}
</script>

<style lang="scss" scoped>
.home-wrapper{
	height: calc(100vh - 36px);
	.home-recommend{
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		.recommend{
			width: 48%;
			border: 5rpx solid #fff;
		}
	}
	.month-wrapper{
		.title{
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: $color;
			padding: 20rpx;
			font-weight: 600;
			.month-left{
				font-size: 28rpx;
				.number{
					font-size: 30rpx;
				}
				.text{
					font-size: 32rpx;
					color: #666;
					margin-left: 16rpx;
				}
			}
			.month-right{
				font-size: 30rpx;
			}
		}
		.content{
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			.content-item{
				width: 33%;
			}
		}
	}
	.hot-wrapper{
		.hot-title{
			padding: 20rpx;
			text{
				font-size: 30rpx;
				color: #666;
				font-weight: 600;
				border-left: 10rpx solid $color;
				padding-left: 16rpx;
			}
		}
		.hot-content{
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			.hot-item{
				width: 33%;
			}
		}
	}
	.backTop{
		width: 60rpx; 
		height:60rpx;
		background: #fff;
		position: fixed; 
		right: 40rpx ; 
		bottom: 100rpx; 
		border-radius: 30rpx;
		box-shadow: 0px 0px 3px #000; 
		line-height: 60rpx; 
		text-align: center
		text{
			font-size: 45rpx; 
		}
	}
}
</style>
