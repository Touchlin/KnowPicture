<template>
	<view class="thirdcontent">
		<view class="left">
			<view class="icon">
				<slot></slot>
			</view>
			<view class="text">
				{{text}}
			</view>
		</view>
		<view class="right">
			<view class="icon-4"></view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			text: {
				type: String,
				default() {
					return ''
				}
			}
		},
		data() {
			return {}
		},
		methods: {},
		created() {
			
		}
	}
</script>

<style lang="scss" scoped>
.thirdcontent{
	display: flex;
	align-items: center;
	justify-content: space-between;
	.left{
		display: flex;
		align-items: center;
		.icon{
			width: 50rpx;
			height: 50rpx;
		}
		.text{
			font-size: 30rpx;
			margin-left: 20rpx;
		}
	}
	.right{
		font-size: 36rpx;
	}
}
</style>
