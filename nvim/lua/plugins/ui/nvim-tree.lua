return {
	"nvim-tree/nvim-tree.lua",
	requires = {
		"nvim-tree/nvim-web-devicons",
	},
	lazy = false,
	keys = {
		{ "<C-o>", "<cmd>NvimTreeToggle<CR>", desc = "Open nvim-tree" },
	},
	config = function()
		require("nvim-tree").setup({
			sort = {
				sorter = "case_sensitive",
			},
			view = {
				width = 30,
			},
			renderer = {
				group_empty = true,
			},
			filters = {
				git_ignored = true,
				dotfiles = true,
				custom = {
					"node_modules",
				},
				exclude = {},
			},
		})
	end,
}
