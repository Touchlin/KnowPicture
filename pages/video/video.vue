<template>
	<view class="video">
		<view class="video-tab">
				<view class="title">
					<uni-segmented-control
					 :current="current"
					  :values="items.map(item => item.title)"
					   @clickItem="onClickItem"
						style-type="text"
						 active-color="#d4237a">
					</uni-segmented-control>
				</view>
		        <view class="content">
		            <video-main :objs="items[current]"></video-main>
		        </view>
				<!-- <view class="content" v-show="current === 4">
				    <video-last :objs="items[current]"></video-last>
				</view> -->
		</view>
	</view>
</template>

<script>
	import {uniSegmentedControl} from '@dcloudio/uni-ui'
	import videoMain from './video-main/video-main.vue'
	import videoLast from './video-last/video-last.vue'
	export default {
		components: {
			uniSegmentedControl,
			videoMain,
			videoLast
		},
		data() {
			return {
				items: [
					{title: '推荐',
						url: 'http://157.122.54.189:9088/videoimg/v1/videowp/featured', params: {limit: 30, skip: 0, order: 'hot'}},
					{title: '娱乐',
						url: 'http://157.122.54.189:9088/videoimg/v1/videowp/category/59b25abbe7bce76bc834198a', params: {limit: 30, skip: 0, order: 'new'}},
					{title: '最新',
						url: 'http://157.122.54.189:9088/videoimg/v1/videowp/videowp', params: {limit: 30, skip: 0, order: 'new'}},
					{title: '热门',
						url: 'http://157.122.54.189:9088/videoimg/v1/videowp/videowp', params: {limit: 30, skip: 0, order: 'hot'}},
					// {title: '分类',
					// 	url: 'http://157.122.54.189:9088/videoimg/v1/videowp/category', params: {}},
				],
				current: 0
			}
		},
		onLoad() {
	
		},
		methods: {
			onClickItem(e) {
			    if (this.current !== e.currentIndex) {
			        this.current = e.currentIndex;
			    }
			}
		}
	}
</script>

<style lang="scss" scoped>
.video{
	.video-tab{
		.title{
			width: 70%;
			margin: 0 auto;
		}
	}
}
</style>
