<template>
	<view class="category-detail" scroll-y="true">
		<view class="topbar">
			<uni-segmented-control
			:current="current" 
			:values="items.map(item => item.title)" 
			@clickItem="onClickItem" 
			style-type="text" 
			active-color="#d4237a"
			>
			</uni-segmented-control>
		</view>
		<scroll-view enable-flex scroll-y="true" class="content" @scrolltolower="handleLower">
		    <view class="content-item" v-for="item in vertical" :key="item.id">
		    	<image :src="item.thumb" mode="widthFix"></image>
		    </view>
		</scroll-view>
	</view>
</template>

<script>
	import { uniSegmentedControl } from '@dcloudio/uni-ui'
	export default {
		components: {
			uniSegmentedControl
		},
		data() {
			return {
				id: '',
				params: {
					limit: 30,
					order: 'new',
					skip: 0
				},
				vertical: [],
				items: [
					{title: '最新', order: 'new'},
					{title: '热门', order: 'hot'}
				],
				current: 0,
				isEnd: false
			}
		},
		methods: {
			onClickItem(e) {
				this.params.order = this.items[e.currentIndex].order
				// 解决vertical重复累加的问题
				this.params.skip = 0
				this.vertical = []
				this.getData()
				
			    if (this.current !== e.currentIndex) {
			        this.current = e.currentIndex;
			    } else {
					return
				}
			},
			getData() {
				this.request({
					url: `http://157.122.54.189:9088/image/v1/vertical/category/${this.id}/vertical`,
					data: this.params
				})
				.then( result => {
					// console.log(result)
					
					if (result.res.vertical.length === 0) {
						this.isEnd = true
						uni.showToast({
							title: "没有更多数据了",
							icon: "none"
						})
						return
					}
					
					this.vertical = [...this.vertical,...result.res.vertical]
				})
			},
			handleLower() {
				// 记得添加isEnd属性，不然会一直加载
				if (!this.isEnd) {
					this.params.skip += this.params.limit
					this.getData()
				}
				
			}
		},
		onLoad(options) {
			this.id = options.id
			this.getData()
		}
	}
</script>

<style lang="scss" scoped>
.category-detail{
	.topbar{
		width: 60%;
		margin: 0 auto;
	}
	.content{
		display: flex;
		flex-wrap: wrap;
		// 这里不能像home-album设置scrol-view,因为他们都是有底部导航栏的
		height: calc(100vh - 36px);
		.content-item{
			width: 33%;
			border: 5rpx solid #fff;
		}
	}
}
</style>
