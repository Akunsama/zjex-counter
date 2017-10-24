<template>
	<div class="modal-dialog">
	    <div class="modal-content" >
	        <div class="modal-header">
	            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
	            <h4 class="modal-title" id="myModalLabel">温馨提示</h4>
	        </div>
	        <div class="modal-body one-row">
	            {{codeview}}
	        </div>
	        <div class="modal-footer">
	            <button type="button" class="btn-save btn-review"  data-dismiss="modal">确认</button>
	            <!-- <button type="button" class="btn-close" data-dismiss="modal">取消</button> -->
	        </div>
	    </div>
	</div>
</template>

<script>
	export default {
		name: 'tips',
		data() {
			return {
				gqfjygh:1,
			}
		},
		props:{
			codeview: {
                type: String,
                default: '',
            },
    	},
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>