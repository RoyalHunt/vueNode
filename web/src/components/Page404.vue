<template>
	<div class="wrapper">
		<div class="container">
			<h1>404</h1>
			<blockquote>Looks like we've got some broken links.</blockquote>
			<router-link class="link" to="/foo">Take me home.</router-link>
		</div>
	</div>
</template>

<style lang="sass" scoped>
	.wrapper
		display: flex
		justify-content: center

	.container
		display: flex
		flex-direction: column
		max-width: 740px
		padding: 2rem 2.5rem

	h1
		margin-top: 5rem
		font-size: 2.2rem
		color: #2c3e50

	blockquote
		font-size: 1.2rem
		color: #999
		border-left: .25rem solid #dfe2e5
		margin: 1rem 0
		padding-left: 1rem

	.link
		font-size: 1.2rem
		color: #3eaf7c
		text-decoration: none
		font-weight: bold

</style>
