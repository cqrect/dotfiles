return {
	"iamcco/markdown-preview.nvim",
	cmd = { "MarkdownPreviewToggle", "MarkdownPreview", "MarkdownPreviewStop" },
	event = "VeryLazy",
	ft = { "markdown" },
	keys = {
		{ "<leader>e", "<cmd>MarkdownPreviewToggle<CR>", desc = "Markdown Preview" },
	},
	build = function()
		vim.fn["mkdp#util#install"]()
	end,
}
