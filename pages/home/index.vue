<template>
	<view class="home">
		<!-- <uni-badge text="1"></uni-badge>
		<uni-badge text="2" type="success" @click="bindClick"></uni-badge>
		<uni-badge text="3" type="primary" :inverted="true"></uni-badge> -->
		<view class="home-tab">
				<view class="title">
					<uni-segmented-control
					 :current="current"
					  :values="items"
					   @clickItem="onClickItem"
						style-type="text"
						 active-color="#d4237a">
					</uni-segmented-control>
				</view>
		        <view class="content">
		            <view v-show="current === 0">
		                <home-recommend></home-recommend>
		            </view>
		            <view v-show="current === 1">
		                <home-category></home-category>
		            </view>
		            <view v-show="current === 2">
		                <home-album></home-album>
		            </view>
		        </view>
		</view>
	</view>
</template>

<script>
	import {uniBadge} from '@dcloudio/uni-ui'
	import homeRecommend from './home-recommend/home-recommend.vue'
	import homeCategory from './home-category/home-category.vue'
	import homeAlbum from './home-album/home-album.vue'
	import {uniSegmentedControl} from '@dcloudio/uni-ui'
	export default {
	    components: {
			uniBadge,
			uniSegmentedControl,
			homeRecommend,
			homeCategory,
			homeAlbum
		},
	    data() {
	        return {
				items: ['推荐','分类','专辑'],
				current: 0
	        }
	    },
	    methods: {
			onClickItem(e) {
			    if (this.current !== e.currentIndex) {
			        this.current = e.currentIndex;
			    }
			}
	    },
		onLoad() {
		}
	}
</script>

<style lang="scss" scoped>
	.home{
		.home-tab{
			.title{
				width: 70%;
				margin: 0 auto;
			}
		}
	}
</style>
