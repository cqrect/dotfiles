return {
	"folke/trouble.nvim",
	dependencies = { "nvim-tree/nvim-web-devicons" },
	event = "VeryLazy",
	keys = {
		{ "<leader>x", "<cmd>TroubleToggle workspace_diagnostics<CR>", desc = "Show trouble for workspace wild." },
		{ "<leader>c", "<cmd>TroubleToggle document_diagnostics<CR>", desc = "Show toruble for document wild." },
	},
}
