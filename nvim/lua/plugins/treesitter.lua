return {
	{
		"nvim-treesitter/nvim-treesitter-context",
		opts = { mode = "cursor", max_lines = 3 },
	},
	{
		"windwp/nvim-ts-autotag",
		opts = {},
	},
	{
		"nvim-treesitter/nvim-treesitter",
		lazy = true,
		version = false,
		build = ":TSUpdate",
		config = function()
			require("nvim-treesitter.configs").setup({
				ensure_installed = { "lua", "bash", "python", "go" },
				ignore_install = { "" },
				sync_install = false,
				highlight = {
					enable = true,
					-- disbale = { "css" },
				},
				autopairs = {
					enable = true,
				},
				indent = { enable = true, disable = { "css" } },
				context_commentstring = {
					enable = true,
					enable_autocmd = false,
				},
				incremental_selection = {
					enable = true,
					keymaps = {
						init_selection = "<C-m>",
						node_incremental = "<C-m>",
						scope_incremental = false,
						node_decremental = "<bs>",
					},
				},
			})
		end,
	},
}
