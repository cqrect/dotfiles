return {
	"nvim-treesitter/nvim-treesitter",
	version = false,
	build = ":TSUpdate",
	config = function()
		require("nvim-treesitter.configs").setup({
			ensure_installed = { "lua", "bash", "python", "go" },
			ignore_install = { "" },
			sync_install = false,
			highlight = {
				enable = true,
				disbale = { "css" },
			},
			autopairs = {
				enable = true,
			},
			indent = { enable = true, disable = { "css" } },
			context_commentstring = {
				enable = true,
				enable_autocmd = false,
			},
		})
	end,
}
