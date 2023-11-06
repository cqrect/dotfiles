return {
	"folke/trouble.nvim",
	dependencies = { "nvim-tree/nvim-web-devicons" },
	opts = { use_diagnostic_sign = true },
	keys = {
		{ "<leader>c", "<cmd>TroubleToggle document_diagnostics<CR>", desc = "Document Diagnostics" },
		{ "<leader>x", "<cmd>TroubleToggle workspace_diagnostics<CR>", desc = "Wrokspace Diagnostics" },
		{
			"q[",
			function()
				if require("trouble").is_open() then
					require("trouble").previous({ skip_groups = true, jump = true })
				else
					local ok, err = pcall(vim.cmd.cprev)
					if not ok then
						vim.notify(err, vim.log.levels.ERROR)
					end
				end
			end,
			desc = "Previous trouble item",
		},
		{
			"q]",
			function()
				if require("trouble").is_open() then
					require("trouble").next({ skip_groups = true, jump = true })
				else
					local ok, err = pcall(vim.cmd.cnext)
					if not ok then
						vim.notify(err, vim.log.levels.ERROR)
					end
				end
			end,
			desc = "Next trouble item",
		},
	},
}
