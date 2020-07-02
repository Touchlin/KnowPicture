<template>
	<view class="ratings">
		<view class="title">图片评价</view>
		<view class="content">
			<view class="btn" :class="{'active': index === 0}" @click="change(0)">
				全部
				<text class="number">{{all.length}}</text>
			</view>
			<view class="btn" :class="{'active': index === 1}" @click="change(1)">
				最热
				<text class="number">{{hot.length}}</text>
			</view>
			<view class="btn" :class="{'active': index === 2}" @click="change(2)">
				最新
				<text class="number">{{comment.length}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			comment: {
				type: Array,
				default() {
					return []
				}
			},
			hot: {
				type: Array,
				default() {
					return []
				}
			},
			all: {
				type: Array,
				default() {
					return []
				}
			},
			index: {
				type: Number,
				default() {
					return 0
				}
			}
		},
		data() {
			return {
			}
		},
		methods: {
			change(value) {
				this.$emit('change', value)
			}
		}
	}
</script>

<style lang="scss" scoped>
.ratings{
	.title{
		padding: 36rpx 0;
		font-weight: 400;
		font-size: 32rpx;
		color: #000;
		margin-left: 6rpx;
	}
	.content{
		padding-bottom: 36rpx;
		.btn{
			display: inline-block;
			padding: 18rpx 24rpx;
			background-color: rgba(0,160,220,.3);
			border-radius: 12rpx;
			font-size: 24rpx;
			line-height: 32rpx;
			color: rgb(77,85,93);
			margin-right: 16rpx;
			&.active{
				color: #fff;
				background-color: rgb(0,160,220);
			}
			&:last-child{
				margin-right: 0;
			}
			.number{
				margin-left: 8rpx;
			}
		}
	}
}
</style>
