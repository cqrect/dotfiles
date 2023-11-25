return {
	"nvim-telescope/telescope.nvim",
	tag = "0.1.4",
	event = "VeryLazy",
	dependencies = { "nvim-lua/plenary.nvim" },
	keys = {
		{ "ff", "<cmd>Telescope find_files<CR>", desc = "Find files" },
		{ "fg", "<cmd>Telescope live_grep<CR>", desc = "Find strings" },
		{ "fd", "<cmd>TodoTelescope<CR>", desc = "Find todos" },
	},
	config = function()
		local actions = require("telescope.actions")

		require("telescope").setup({
			defaults = {
				pickers = {
					find_files = {
						hidden = true,
					},
				},
				mappings = {
					i = {
						["<C-j>"] = actions.move_selection_next,
						["<C-k>"] = actions.move_selection_previous,
					},
					n = {
						["<C-c>"] = actions.close,
					},
				},
			},
		})
	end,
}
