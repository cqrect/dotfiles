return {
	"folke/persistence.nvim",
	event = "BufReadPre", -- this will only start session saving when an actual file was opened
	keys = {
		{
			"<leader>u",
			"<cmd>lua require('persistence').load()<CR>",
			desc = "restore the session for the current directory",
		},
	},
	opts = {
		-- add any custom options here
		options = { "buffers", "curdir", "tabpages", "winsize", "help", "globals", "skiprtp", "folds" },
	},
}
