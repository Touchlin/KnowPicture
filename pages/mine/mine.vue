<template>
	<view class="mine">
		<!-- 头部/用户名/用户头像 -->
		<view class="header">
			<view class="userimg">
				<image src="../../static/mine/timg.jpeg" mode=""></image>
			</view>
			<view class="text">
				<view class="login">登录/注册</view>
				<view class="desc">登录后继续更多操作</view>
			</view>
		</view>
		<!-- 播放记录 -->
		<view class="playrecord">
			<thirdcontent :text="'播放记录'">
				<template>
					<image src="../../static/mine/timg.jpeg" mode=""></image>
				</template>
			</thirdcontent>
		</view>
		<!-- 结合 -->
		<view class="all">
			<view class="label">
				<thirdcontent :text="'AI实验室'">
					<template>
						<image src="../../static/mine/timg.jpeg" mode=""></image>
					</template>
				</thirdcontent>
			</view>
			<view class="relation">
				<thirdcontent :text="'联系客服'">
					<template>
						<image src="../../static/mine/timg.jpeg" mode=""></image>
					</template>
				</thirdcontent>
			</view>
		</view>
	</view>
</template>

<script>
	import thirdcontent from '@/components/thirdcontent/thirdcontent.vue'
	export default {
		components: { 
			thirdcontent 
		},
		data() {
			return {}
		},
		methods: {},
		onLoad() {
			
		}
	}
</script>

<style lang="scss" scoped>
.mine{
	height: 100vh;
	background-color: #f3f5f7;
	.header{
		background-color: #fff;
		padding: 40rpx;
		display: flex;
		align-items: center;
		.userimg{
			image{
				width: 180rpx;
				height: 180rpx;
				border-radius: 50%;
			}
		}
		.text{
			margin-left: 30rpx;
			.login{
				font-size: 36rpx;
				color: #000;
			}
			.desc{
				font-size: 28rpx;
				color: #666;
				margin-top: 10rpx;
			}
		}
	}
	.playrecord{
		background-color: #fff;
		margin-top: 20rpx;
		padding: 30rpx;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.all{
		background-color: #fff;
		margin-top: 20rpx;
		image{
			width: 100%;
			height: 100%;
		}
		.label{
			padding: 30rpx;
			border-bottom: 1rpx solid rgba(7,17,27,.1);
		}
		.relation{
			padding: 30rpx;
		}
	}
}
</style>
