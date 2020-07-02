<template>
	<scroll-view class="home-category" scroll-y="true">
		<!-- 图片分类 -->
		<view class="category-list">
			<view class="category-item" v-for="item in category" :key="item.id" @click="goCatDetail(item.id)">
				<image :src="item.cover" mode="aspectFill"></image>
				<view class="text">{{item.name}}</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		name: 'home-category',
		data() {
			return {
				category: {}
			}
		},
		methods: {
			getData() {
				this.request({
					url: "http://157.122.54.189:9088/image/v1/vertical/category"
				})
				.then(result => {
					// console.log(result)
					this.category = result.res.category
				})
			},
			goCatDetail(id) {
				uni.navigateTo({
					url: `/pages/category-detail/index?id=${id}`
				})
			}
		},
		created() {
			this.getData()
		}
		// mounted() {
		// 	uni.setNavigationBarTitle({
		// 		title: "分类"
		// 	})
		// }
	}
</script>

<style lang="scss" scoped>
.home-category{
	height: calc(100vh - 36px);
	.category-list{
		display: flex;
		flex-wrap: wrap;
		.category-item{
			width: 33%;
			border: 5rpx solid #fff;
			position: relative;
			image{
				height: 240rpx;
			}
			.text{
				position: absolute;
				bottom: 0;
				left: 10rpx;
				color: #fff;
				font-size: 36rpx;
			}
		}
	}
}
</style>
